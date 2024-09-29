import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryScreen from "./CategoryScreen";
import ChooseItemScreen from "./ChooseItemScreen";
import OrderTab from "./OrderTab";
import { MenuDataProvider } from "./MenuDataContext";

const OrderStack = createStackNavigator();

const OrderStackNavigator = () => {
  return (
    <MenuDataProvider>
      <OrderStack.Navigator>
        <OrderStack.Screen
          name="OrderTab"
          options={{ headerShown: false }}
          component={OrderTab}
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
    </MenuDataProvider>
  );
};

export default OrderStackNavigator;
