import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import FeaturedScreen from "./FeaturedScreen";
import MenuScreen from "./MenuScreen";
import feathersClient from "../feathersClient";
import { MenuData } from "./types";

type RootStackParamList = {
  CategoryScreen: { selectedCategory: string };
};

type OrderTabNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CategoryScreen"
>;

const Tab = createMaterialTopTabNavigator();

const OrderTab = () => {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<OrderTabNavigationProp>();

  const handleSelectCategory = (category: string) => {
    navigation.navigate("CategoryScreen", { selectedCategory: category });
  };

  useEffect(() => {
    feathersClient
      .service("menu")
      .find()
      .then((response: MenuData) => {
        console.log("Menu data:", response);
        setMenuData(response);
      })
      .catch((error: Error) => {
        console.error("Error fetching menu items:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !menuData) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text>Loading menu data...</Text>
      </View>
    );
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Featured">
        {() => (
          <FeaturedScreen
            data={menuData}
            onSelectCategory={handleSelectCategory}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Menu">
        {() => (
          <MenuScreen
            data={menuData.data || []}
            onSelectCategory={handleSelectCategory}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrderTab;
