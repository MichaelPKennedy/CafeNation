// CategoryDetailsScreen.tsx
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const CategoryItemsScreen = ({ route }) => {
  // Assume the category data (including items) is passed via route params
  const { category } = route.params;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        {/* Render additional item details */}
      </View>
    );
  };

  return (
    <FlatList
      data={category.items}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    // Styles for your item container
  },
  itemName: {
    // Styles for your item name text
  },
  // Additional styles as needed
});

export default CategoryItemsScreen;
