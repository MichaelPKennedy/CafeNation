import React, { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { CartContext } from "./CartContext";

const CartIcon = ({ onPress }: { onPress: () => void }) => {
  const { cartItems } = useContext(CartContext);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Pressable onPress={onPress}>
      <FontAwesome name="shopping-cart" size={25} color="black" />
      {totalQuantity > 0 && (
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
          <Text style={{ color: "white", fontSize: 12 }}>{totalQuantity}</Text>
        </View>
      )}
    </Pressable>
  );
};

export default CartIcon;
