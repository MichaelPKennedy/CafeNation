import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FeaturedScreen from "./FeaturedScreen";
import MenuScreen from "./MenuScreen";

const OrderTabNavigator = createMaterialTopTabNavigator();

const OrderTabs: React.FC<OrderTabsProps> = ({ data, onSelectCategory }) => {
  return (
    <OrderTabNavigator.Navigator>
      <OrderTabNavigator.Screen name="Featured">
        {() => (
          <FeaturedScreen
            data={data || []}
            onSelectCategory={onSelectCategory}
          />
        )}
      </OrderTabNavigator.Screen>
      <OrderTabNavigator.Screen name="Menu">
        {() => (
          <MenuScreen data={data || []} onSelectCategory={onSelectCategory} />
        )}
      </OrderTabNavigator.Screen>
    </OrderTabNavigator.Navigator>
  );
};

export default OrderTabs;
