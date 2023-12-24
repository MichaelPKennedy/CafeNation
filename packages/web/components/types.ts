//props types for components
interface FeaturedScreenProps {
  data?: MenuItem[];
  onSelectCategory: any;
}

interface MenuScreenProps {
  data: MenuItem[];
  onSelectCategory: any;
}

interface OrderTabProps {
  data?: MenuItem[];
}

interface OrderTabsProps {
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

interface CategoryRowProps {
  category: MenuItem;
  onSelectCategory: any;
}

//types for square menu items
interface MenuItem {
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
}

interface CategoryData {
  name: string;
  categoryType: string;
  parentCategory: {
    ordinal: string;
  };
  isTopLevel: boolean;
  onlineVisibility: boolean;
}

interface ItemOptionData {
  name: string;
  displayName: string;
  showColors: boolean;
  values: ItemOptionValue[];
}

interface ItemOptionValue {
  type: string;
  id: string;
  version: string;
  itemOptionValueData: {
    itemOptionId: string;
    name: string;
    ordinal: number;
  };
}

interface ItemData {
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

interface modifierListInfo {
  modifierListId: string;
  minSelectedModifiers: number;
  maxSelectedModifiers: number;
  enabled: boolean;
}

interface ReportingCategory {
  id: string;
  ordinal: string;
}

interface Categories {
  id: string;
  ordinal: string;
}

interface ItemOptions {
  itemOptionId: string;
}

interface ItemVariation {
  type: string;
  id: string;
  updatedAt: string;
  version: string;
  isDeleted: boolean;
  presentAtAllLocations: boolean;
  itemVariationData: ItemVariationData;
}

interface ItemVariationData {
  itemId: string;
  name: string;
  ordinal: number;
  pricingType: string;
  trackInventory: boolean;
  itemOptionValues: ItemOptionValue[];
  sellable: boolean;
  stockable: boolean;
}

interface ItemOptionValue {
  itemOptionId: string;
  itemOptionValueId: string;
}
