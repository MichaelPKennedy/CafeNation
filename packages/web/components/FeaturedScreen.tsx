import React from "react";
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import type { MenuItem, MenuData } from "./types";

interface CategoryRowProps {
  category: MenuItem;
  onSelectCategory: (category: string) => void;
  itemOptions: any[];
}

export interface FeaturedScreenProps {
  data: MenuData;
  onSelectCategory: (category: string) => void;
}

type RootStackParamList = {
  ChooseItemScreen: { item: MenuItem; itemOptions: any };
  // Add other screen names and their params here if needed
};

type CategoryRowNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ChooseItemScreen"
>;

const CategoryRow: React.FC<CategoryRowProps> = ({
  category,
  onSelectCategory,
  itemOptions,
}) => {
  const navigation = useNavigation<CategoryRowNavigationProp>();

  const viewAll = () => {
    onSelectCategory(category.categoryData?.name || "");
  };

  const selectItem = (selectedItem: MenuItem) => {
    navigation.navigate("ChooseItemScreen", {
      item: selectedItem,
      itemOptions,
    });
  };

  const categoryItems = category.categoryItems?.filter((item) => item.featured);

  return (
    <View style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{category.categoryData?.name}</Text>
        <TouchableOpacity onPress={viewAll}>
          <Text style={styles.viewAllText}>
            See all {categoryItems?.length} items
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoryItems?.map((item) => (
          <TouchableOpacity
            style={styles.itemContainer}
            key={item.id}
            onPress={() => selectItem(item)}
          >
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
            )}
            <Text style={styles.itemName}>{item.itemData?.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const FeaturedScreen: React.FC<FeaturedScreenProps> = ({
  data,
  onSelectCategory,
}) => {
  const categories =
    data.data?.filter(
      (item): item is MenuItem => item.parentType === "Featured"
    ) ?? [];

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <CategoryRow
          category={item}
          onSelectCategory={onSelectCategory}
          itemOptions={data.itemOptions}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    borderBottomWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 10,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
  },
  viewAllText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "green",
  },
  itemContainer: {
    width: 145,
    marginHorizontal: 8,
  },
  itemImage: {
    width: 145,
    height: 145,
    borderRadius: 72.5,
    marginBottom: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default FeaturedScreen;
