import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Text, View } from "react-native";
import feathersClient from "../feathersClient";

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
  categories: Categories;
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

const MenuItemsScreen = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    feathersClient
      .service("menu")
      .find()
      .then((response: { data: MenuItem[] }) => {
        setMenuItems(response.data);
      })
      .catch((error: Error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  const renderMenuItem = ({ item }: { item: MenuItem }) => {
    const data = item.categoryData || item.itemData || item.itemOptionData;
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{data?.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
  },
});

export default MenuItemsScreen;
