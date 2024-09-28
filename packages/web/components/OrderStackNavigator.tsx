import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryScreen from "./CategoryScreen";
import ChooseItemScreen from "./ChooseItemScreen";
import OrderTabs from "./OrderTabs";

const OrderStack = createStackNavigator();

const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator>
      <OrderStack.Screen
        name="OrderTabs"
        options={{ headerShown: false }}
        component={OrderTabs}
      />
      <OrderStack.Screen
        name="CategoryScreen"
        options={{ headerShown: false }}
        component={CategoryScreen}
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
