// Main OrderScreen component that is part of your bottom tab navigator
import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MenuScreen from "./MenuScreen"; // Component for Menu tab
import FeaturedScreen from "./FeaturedScreen"; // Component for Featured tab
import { StyleSheet, FlatList, Text, View } from "react-native";
import feathersClient from "../feathersClient";

const Tab = createMaterialTopTabNavigator();

const OrderScreen = () => {
  const [menuData, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    feathersClient
      .service("menu")
      .find()
      .then((response: MenuItem[]) => {
        setMenuItems(response);
        console.log("response", response);
        console.log("Menu items:", menuData);
      })
      .catch((error: Error) => {
        console.error("Error fetching menu items:", error);
      });
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Menu">
        {() => <MenuScreen data={menuData} />}
      </Tab.Screen>
      <Tab.Screen name="Featured">
        {() => <FeaturedScreen data={menuData} />}
      </Tab.Screen>
      {/* ... other tab screens for Previous and Favorites */}
    </Tab.Navigator>
  );
};

export default OrderScreen;
