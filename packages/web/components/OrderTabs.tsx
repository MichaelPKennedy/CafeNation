import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeaturedScreen from "./FeaturedScreen";
import MenuScreen from "./MenuScreen";
import { useMenuData } from "./MenuDataContext";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { MenuItem } from "./types"; // Import MenuItem type

const OrderTabNavigator = createMaterialTopTabNavigator();

type RootStackParamList = {
  CategoryScreen: { selectedCategory: string };
  ChooseItemScreen: { item: MenuItem; itemOptions: any };
};

type OrderTabsNavigationProp = StackNavigationProp<RootStackParamList>;

const OrderTabs: React.FC = () => {
  const menuData = useMenuData();
  const navigation = useNavigation<OrderTabsNavigationProp>();

  if (!menuData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading menu data...</Text>
      </View>
    );
  }

  const handleSelectCategory = (category: string) => {
    navigation.navigate("CategoryScreen", { selectedCategory: category });
  };

  return (
    <OrderTabNavigator.Navigator>
      <OrderTabNavigator.Screen name="Featured">
        {() => (
          <FeaturedScreen
            data={menuData}
            onSelectCategory={handleSelectCategory}
          />
        )}
      </OrderTabNavigator.Screen>
      <OrderTabNavigator.Screen name="Menu">
        {() => (
          <MenuScreen
            data={menuData.data || []}
            onSelectCategory={handleSelectCategory}
          />
        )}
      </OrderTabNavigator.Screen>
    </OrderTabNavigator.Navigator>
  );
};

export default OrderTabs;
