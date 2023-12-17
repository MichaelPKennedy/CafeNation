import { OAuthStrategy } from '@feathersjs/authentication-oauth'
import { Application, Params } from '@feathersjs/feathers'
import axios from 'axios'

interface SquareProfile {
  id: string
  email: string
  name: string
  // Add other profile fields as needed
}

class SquareStrategy extends OAuthStrategy {
  app: Application
  sequelize: any // Define the specific Sequelize type if available

  constructor(app: Application, sequelizeClient: any) {
    super()
    this.app = app
    this.sequelize = sequelizeClient
  }

  async getEntityQuery(profile: SquareProfile, params: Params) {
    return {
      ...super.getEntityQuery(profile, params),
      squareId: profile.id
    }
  }

  async getEntityData(profile: SquareProfile, existingEntity: any, params: Params) {
    return {
      ...super.getEntityData(profile, existingEntity, params),
      squareId: profile.id,
      email: profile.email,
      name: profile.name
      // Add more fields as needed
    }
  }

  async getProfile(data: any, params: Params) {
    const accessToken = data.access_token

    // Use Square's API to fetch the user profile
    const profileResponse = await axios.get('https://connect.squareup.com/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (profileResponse.status !== 200) {
      throw new Error('Could not retrieve user profile from Square')
    }

    return profileResponse.data
  }

  async findEntity(profile: SquareProfile, params: Params) {
    const query = await this.getEntityQuery(profile, params)
    const result = await this.app.service('users').find({
      ...params,
      query
    })

    const [entity = null] = result.data ? result.data : result
    return entity
  }

  async createEntity(profile: SquareProfile, params: Params) {
    const data = await this.getEntityData(profile, null, params)
    return this.app.service('users').create(data, params)
  }

  async updateEntity(entity: any, profile: SquareProfile, params: Params) {
    const id = entity.id
    const data = await this.getEntityData(profile, entity, params)

    return this.app.service('users').patch(id, data, params)
  }

  // Additional methods as needed...
}

export default SquareStrategy
