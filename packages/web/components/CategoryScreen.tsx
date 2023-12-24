import React from "react";
import { StyleSheet, FlatList, Text, View, Image } from "react-native";

// Props type for the CategoryScreen component
interface CategoryScreenProps {
  route: {
    params: {
      categoryId: string;
      categoryName: string;
      categoryItems: MenuItem[];
    };
  };
}

// Item component to render each item
const ItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      )}
      <Text style={styles.itemName}>{item.itemData?.name}</Text>
      {/* Add more item details here */}
    </View>
  );
};

// CategoryScreen component
const CategoryScreen: React.FC<CategoryScreenProps> = ({ route }) => {
  const { categoryName, categoryItems } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{categoryName}</Text>
      <FlatList
        data={categoryItems}
        renderItem={({ item }) => <ItemComponent item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff", // Adjust the background color as needed
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0", // Adjust the border color as needed
    alignItems: "center",
  },
  itemImage: {
    width: 60, // Adjust the width as needed
    height: 60, // Adjust the height as needed
    borderRadius: 30, // Adjust for rounded corners if desired
    marginRight: 10,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1, // Ensure text takes up the remaining space
  },
  // Add any other styles you need
});

export default CategoryScreen;
