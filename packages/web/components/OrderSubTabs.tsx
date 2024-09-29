import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeaturedScreen from "./FeaturedScreen";
import MenuScreen from "./MenuScreen";
import { useMenuData } from "./MenuDataContext";

import { OrderTabProps } from "./types";

const OrderTabNavigator = createMaterialTopTabNavigator();

const OrderSubTabs: React.FC<OrderTabProps> = ({ data, navigation }) => {
  const { menuData, isLoading } = useMenuData();

  const handleSelectCategory = (category: string) => {
    navigation.navigate("CategoryScreen", {
      selectedCategory: category,
      data: data,
    });
  };
  return (
    <OrderTabNavigator.Navigator>
      <OrderTabNavigator.Screen name="Featured">
        {() => (
          <FeaturedScreen
            data={menuData!}
            onSelectCategory={handleSelectCategory}
          />
        )}
      </OrderTabNavigator.Screen>
      <OrderTabNavigator.Screen name="Menu">
        {() => (
          <MenuScreen
            data={menuData?.data || []}
            onSelectCategory={handleSelectCategory}
          />
        )}
      </OrderTabNavigator.Screen>
    </OrderTabNavigator.Navigator>
  );
};

export default OrderSubTabs;
