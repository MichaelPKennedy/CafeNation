import React from "react";
import { StyleSheet, FlatList, Text, View, Image } from "react-native";

const ItemComponent: React.FC<{ item: MenuItem }> = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      {item.imageUrl && (
        <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      )}
      <Text style={styles.itemName}>{item.itemData?.name}</Text>
    </View>
  );
};

const CategoryScreen = ({ data, selectedCategory }) => {
  const categoryObject = data.find(
    (item) => item.categoryData?.name === selectedCategory
  );

  const categoryItems = categoryObject ? categoryObject.categoryItems : [];

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{selectedCategory}</Text>
      <FlatList
        data={categoryItems}
        renderItem={({ item }) => <ItemComponent item={item} />}
        keyExtractor={(item) => item.id}
        horizontal={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... other styles ...
  itemContainer: {
    // Style for the container of each item
    alignItems: "center",
    justifyContent: "center",
    margin: 10, // Adjust spacing as needed
  },
  itemImage: {
    width: 145,
    height: 145,
    borderRadius: 72.5, // Makes the image circular
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5, // Add space between image and text
  },
  container: {},
  categoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 5,
  },
  // ... other styles ...
});

export default CategoryScreen;
