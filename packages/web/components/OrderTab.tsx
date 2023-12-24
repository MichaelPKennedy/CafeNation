import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeaturedScreen from "./FeaturedScreen";
import MenuScreen from "./MenuScreen";
import { StyleSheet, FlatList, Text, View } from "react-native";
import feathersClient from "../feathersClient";

const Tab = createMaterialTopTabNavigator();

const OrderTab = () => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  return (
    <Tab.Navigator>
      {isLoading ? (
        <Tab.Screen name="Featured">{() => <Text>Loading...</Text>}</Tab.Screen>
      ) : (
        <>
          <Tab.Screen
            name="Featured"
            children={() => <FeaturedScreen data={menuData} />}
          />
          <Tab.Screen
            name="Menu"
            children={() => <MenuScreen data={menuData} />}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default OrderTab;
