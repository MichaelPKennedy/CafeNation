import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import OrderStackNavigator from "./OrderStackNavigator";
import feathersClient from "../feathersClient";
import { MenuDataProvider } from "./MenuDataContext";

const OrderTab = () => {
  const [menuData, setMenuData] = useState<MenuData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    feathersClient
      .service("menu")
      .find()
      .then((response: MenuData) => {
        setMenuData(response);
      })
      .catch((error: Error) => {
        console.error("Error fetching menu items:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <MenuDataProvider menuData={menuData}>
      <View style={styles.container}>
        <OrderStackNavigator />
      </View>
    </MenuDataProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OrderTab;
