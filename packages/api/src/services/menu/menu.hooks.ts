const { disallow } = require('feathers-hooks-common')
export const menuHooks = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [disallow('external')],
    patch: [disallow('external')],
    remove: [disallow('external')]
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
}
