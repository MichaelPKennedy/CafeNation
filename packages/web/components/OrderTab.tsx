import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import OrderTabs from "./OrderTabs";
import CategoryScreen from "./CategoryScreen";
import feathersClient from "../feathersClient";

const OrderTab = () => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    feathersClient
      .service("menu")
      .find()
      .then((response: MenuItem[]) => {
        setMenuData(response);
      })
      .catch((error: Error) => {
        console.error("Error fetching menu items:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setShowCategory(true);
    } else {
      setShowCategory(false);
    }
  }, [selectedCategory]);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      {!showCategory ? (
        <OrderTabs data={menuData} onSelectCategory={handleSelectCategory} />
      ) : (
        <CategoryScreen data={menuData} selectedCategory={selectedCategory} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // Add any other styles you need
});

export default OrderTab;
