//props types for components
interface FeaturedScreenProps {
  data: MenuItem[];
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
