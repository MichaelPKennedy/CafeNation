import React, { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CartContext } from "./CartContext";

const CartIcon = ({ onPress }: { onPress: () => void }) => {
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.length;

  return (
    <Pressable onPress={onPress}>
      <FontAwesome name="shopping-cart" size={25} color="black" />
      {itemCount > 0 && (
        <View
          style={{
            position: "absolute",
            right: -6,
            top: -3,
            backgroundColor: "red",
            borderRadius: 10,
            width: 20,
            height: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 12 }}>{itemCount}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default CartIcon;
