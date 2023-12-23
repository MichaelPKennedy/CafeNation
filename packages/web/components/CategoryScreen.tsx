import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const CategoryItemsScreen = ({ route }) => {
  const { category } = route.params;

  const renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
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
  itemContainer: {},
  itemName: {},
});

export default CategoryItemsScreen;
