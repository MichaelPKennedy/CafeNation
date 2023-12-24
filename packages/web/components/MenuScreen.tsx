import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Props for the main screen component
interface MenuScreenProps {
  data: MenuItem[];
}

// Component to render each category row
const CategoryRow: React.FC<CategoryRowProps> = ({ category }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const onPressCategory = () => {
    // Navigate to the category's item listing screen
    navigation.navigate("CategoryScreen", {
      categoryId: category.id,
      categoryName: category?.categoryData?.name,
      categoryItems: category.categoryItems,
    });
  };

  // Retrieve the category's image from the items
  const categoryImage = category.categoryItems?.find(
    (item) =>
      item.itemData?.categories.some((cat) => cat.id === category.id) &&
      item.categoryImage
  )?.imageUrl;

  return (
    <TouchableOpacity style={styles.categoryRow} onPress={onPressCategory}>
      {categoryImage && (
        <Image source={{ uri: categoryImage }} style={styles.categoryImage} />
      )}
      <Text style={styles.categoryName}>{category.categoryData?.name}</Text>
    </TouchableOpacity>
  );
};

const MenuScreen: React.FC<MenuScreenProps> = ({ data }) => {
  const parentTypes = Array.from(
    new Set(
      data
        .filter((item) => {
          return item.parentType && item.parentType !== "Featured";
        })
        .map((item) => item.parentType)
    )
  );

  const parentCategories = parentTypes.map((parentType) => ({
    parentType,
    categories: data.filter((item) => item.parentType === parentType),
  }));

  return (
    <FlatList
      data={parentCategories}
      renderItem={({ item }) => (
        <View style={styles.parentCategoryContainer}>
          <Text style={styles.parentCategoryTitle}>{item.parentType}</Text>
          {item.categories.map((category) => (
            <React.Fragment key={category.id}>
              <CategoryRow category={category} />
              <View style={styles.separator} />
            </React.Fragment>
          ))}
        </View>
      )}
      keyExtractor={(item, index) => item.parentType || String(index)}
    />
  );
};

// Styles
const styles = StyleSheet.create({
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#d6d7da",
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
    flex: 1, // Take up all available space
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  parentCategoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f4f4f4",
    color: "#333",
  },
  parentCategoryContainer: {
    backgroundColor: "#f9f9f9",
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#d6d7da",
    marginHorizontal: 15,
  },
});

export default MenuScreen;
