//props types for components

export interface ChooseItemRouteProps {
  item: MenuItem;
}

export interface MenuScreenProps {
  data: MenuItem[];
  onSelectCategory: any;
}

export interface OrderTabProps {
  data?: MenuItem[];
  navigation: any;
}

export interface OrderTabsProps {
  data?: MenuItem[];
  onSelectCategory: any;
}

type RootStackParamList = {
  HomeScreen: undefined;
  CategoryScreen: {
    categoryId: string;
    categoryName: string | undefined;
    categoryItems: MenuItem[] | undefined;
  };
};

type CategoryScreenParamList = {
  CategoryScreen: {
    categoryId: string;
    categoryName: string;
    categoryItems: MenuItem[];
  };
};

export interface CategoryRowProps {
  category: MenuItem;
  onSelectCategory: any;
}

//types for square menu items
export interface MenuItem {
  type: string;
  id: string;
  updatedAt: string;
  version: string;
  isDeleted: boolean;
  presentAtAllLocations: boolean;
  categoryData?: CategoryData;
  itemOptionData?: ItemOptionData;
  itemData?: ItemData;
  categoryItems?: MenuItem[];
  parentType?: string;
  imageUrl?: string;
  categoryImage?: boolean;
  featured?: boolean;
  customAttributeValues?: object;
  itemOptions?: any;
}

export interface MenuData {
  data: MenuItem[];
  itemOptions: any[];
}

export interface CategoryData {
  name: string;
  categoryType: string;
  parentCategory: {
    ordinal: string;
  };
  isTopLevel: boolean;
  onlineVisibility: boolean;
}

export interface ItemOptionData {
  name: string;
  id: string;
  displayName: string;
  showColors: boolean;
  values: ItemOptionValue[];
}

export interface ItemOptionValue {
  type: string;
  id: string;
  version: string;
  itemOptionValueData: ItemOptionValueData;
}

export interface ItemOptionValueData {
  itemOptionId: string;
  name: string;
  ordinal: number;
}

export interface ItemData {
  name: string;
  description: string;
  variations: ItemVariation[];
  productType: string;
  skipModifierScreen: boolean;
  itemOptionIds: ItemOptions;
  categories: Categories[];
  descriptionHtml: string;
  descriptionPlaintext: string;
  isArchived: boolean;
  reportingCategory: ReportingCategory;
  modifierListInfo: modifierListInfo[];
}

export interface modifierListInfo {
  modifierListId: string;
  minSelectedModifiers: number;
  maxSelectedModifiers: number;
  enabled: boolean;
}

export interface ReportingCategory {
  id: string;
  ordinal: string;
}

export interface Categories {
  id: string;
  ordinal: string;
}

export interface ItemOptions {
  itemOptionId: string;
}

export interface ItemVariation {
  type: string;
  id: string;
  updatedAt: string;
  version: string;
  isDeleted: boolean;
  presentAtAllLocations: boolean;
  itemVariationData: ItemVariationData;
}

export interface ItemVariationData {
  itemId: string;
  name: string;
  ordinal: number;
  pricingType: string;
  trackInventory: boolean;
  itemOptionValues: ItemOptionValue[];
  sellable: boolean;
  stockable: boolean;
  priceMoney: {
    amount: string;
    currency: string;
  };
}

export interface ItemOptionValue {
  itemOptionId: string;
  itemOptionValueId: string;
}

export interface TransformedItemOptionValue extends ItemOptionValue {
  name: string;
}

export interface CartItemType {
  cart_id?: number;
  id: string;
  name: string;
  size: string;
  flavor: string;
  description?: string;
  item_variation_id?: string;
  variation_name?: string;
  price: number;
  currency: string;
  additional_notes?: string;
  quantity: number;
  imageUrl?: string;
}
