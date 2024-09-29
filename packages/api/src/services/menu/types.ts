//props types for components
export interface FeaturedScreenProps {
  data?: MenuItem[]
  onSelectCategory: any
  navigation: any
  itemOptions: any[]
}
export interface ChooseItemRouteProps {
  item: MenuItem
}

export interface MenuScreenProps {
  data: MenuItem[]
  onSelectCategory: any
}

export interface OrderTabProps {
  data?: MenuItem[]
  navigation: any
}

export interface OrderTabsProps {
  data?: MenuItem[]
  onSelectCategory: any
}

type RootStackParamList = {
  HomeScreen: undefined
  CategoryScreen: {
    categoryId: string
    categoryName: string | undefined
    categoryItems: MenuItem[] | undefined
  }
}

type CategoryScreenParamList = {
  CategoryScreen: {
    categoryId: string
    categoryName: string
    categoryItems: MenuItem[]
  }
}

export interface CategoryRowProps {
  category: MenuItem
  onSelectCategory: any
}

//types for square menu items
export interface MenuItem {
  type?: string
  id?: string
  updatedAt?: string
  version?: string
  isDeleted?: boolean
  presentAtAllLocations?: boolean
  categoryData?: CategoryData
  itemOptionData?: ItemOptionData
  itemData?: ItemData
  categoryItems?: MenuItem[]
  parentType?: string
  imageUrl?: string
  categoryImage?: boolean
  featured?: boolean
  customAttributeValues?: any
}

export interface MenuItems {
  data: MenuItem[]
  itemOptions: ItemOption[]
}

export interface ItemOption {
  id?: string
  name: string
  values: ItemOptionValue[]
}

export interface CategoryData {
  name: string
  categoryType: string
  parentCategory: {
    ordinal: string
  }
  isTopLevel: boolean
  onlineVisibility: boolean
}

export interface ItemOptionData {
  name: string
  displayName: string
  showColors: boolean
  values: ItemOptionValue[]
}

export interface ItemOptionValue {
  type: string
  id: string
  version: string
  itemOptionValueData: {
    itemOptionId: string
    name: string
    ordinal: number
  }
}

export interface ItemData {
  name: string
  description: string
  variations: ItemVariation[]
  productType: string
  skipModifierScreen: boolean
  itemOptionIds: ItemOptions
  categories: Categories[]
  descriptionHtml: string
  descriptionPlaintext: string
  isArchived: boolean
  reportingCategory: ReportingCategory
  modifierListInfo: modifierListInfo[]
  imageIds: string[]
}

export interface modifierListInfo {
  modifierListId: string
  minSelectedModifiers: number
  maxSelectedModifiers: number
  enabled: boolean
}

export interface ReportingCategory {
  id: string
  ordinal: string
}

export interface Categories {
  id: string
  ordinal: string
}

export interface ItemOptions {
  itemOptionId: string
}

export interface ItemVariation {
  type: string
  id: string
  updatedAt: string
  version: string
  isDeleted: boolean
  presentAtAllLocations: boolean
  itemVariationData: ItemVariationData
}

export interface ItemVariationData {
  itemId: string
  name: string
  ordinal: number
  pricingType: string
  trackInventory: boolean
  itemOptionValues: ItemOptionValue[]
  sellable: boolean
  stockable: boolean
}

export interface ItemOptionValue {
  itemOptionId: string
  itemOptionValueId: string
}
