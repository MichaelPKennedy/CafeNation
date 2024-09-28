import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CategoryScreen from "./CategoryScreen";
import ChooseItemScreen from "./ChooseItemScreen";
import OrderTabs from "./OrderTabs";

const OrderStack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="OrderTabs"
        options={{ headerShown: false }}
        component={OrderTabs}
      />
      <OrderStack.Screen
        name="ChooseItemScreen"
        options={{ presentation: "modal", headerShown: false }}
        component={ChooseItemScreen}
      />
    </OrderStack.Navigator>
  );
};

export default OrderStackNavigator;
