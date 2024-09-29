import React from "react";
import { View, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryScreen from "./CategoryScreen";
import ChooseItemScreen from "./ChooseItemScreen";
import OrderSubTabs from "./OrderSubTabs";
import { MenuDataProvider } from "./MenuDataContext";

const OrderStack = createStackNavigator();

const OrderStackNavigator = () => {
  return (
    <View style={styles.container}>
      <MenuDataProvider>
        <OrderStack.Navigator>
          <OrderStack.Screen
            name="OrderSubTabs"
            options={{ headerShown: false }}
            component={OrderSubTabs}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default OrderStackNavigator;
