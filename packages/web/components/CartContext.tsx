import React, { createContext, useState, ReactNode, useEffect } from "react";

import { CartItemType } from "./types";

// Define the type for the context
type CartContextType = {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (itemId: string) => void;
};

// Create the context with an initial value
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const addToCart = (newItem: CartItemType) => {
    setCartItems((currentItems) => {
      const index = currentItems.findIndex((item) => item.id === newItem.id);

      if (index !== -1) {
        return currentItems.map((item, i) =>
          i === index ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...currentItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((currentItems) => {
      const updatedItems = currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      );
      return updatedItems.filter((item) => item.quantity > 0);
    });
  };

  useEffect(() => {
    console.log("Cart Items from context", cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
