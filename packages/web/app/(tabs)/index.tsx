import React from "react";
import { StyleSheet } from "react-native";
import OrderStackNavigator from "../../components/OrderStackNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function TabOneScreen() {
  return (
    <NavigationContainer independent={true}>
      <OrderStackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
