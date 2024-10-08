import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme, Modal, View } from "react-native";
import { CartProvider } from "../../components/CartContext";
import CartIcon from "../../components/CartIcon";
import CartModal from "../../components/CartModal";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  return (
    <CartProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Order",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="coffee" color="black" />
            ),
            headerRight: () => (
              <View style={{ marginRight: 15 }}>
                <CartIcon onPress={toggleModal} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
      </Tabs>
      <CartModal isVisible={isModalVisible} onClose={toggleModal}></CartModal>
    </CartProvider>
  );
}
