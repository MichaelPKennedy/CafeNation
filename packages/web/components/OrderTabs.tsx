import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeaturedScreen from "./FeaturedScreen";
import MenuScreen from "./MenuScreen";
import { useMenuData } from "./MenuDataContext";

const OrderTabNavigator = createMaterialTopTabNavigator();

const OrderTabs: React.FC<OrderTabProps> = ({ data, navigation }) => {
  const menuData = useMenuData();

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
            data={menuData || []}
            onSelectCategory={handleSelectCategory}
            navigation={navigation}
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

export default OrderTabs;
