import React, { createContext, useState, ReactNode, useEffect } from "react";

// Define the type for cart items
type CartItemType = {
  id: string;
  name: string;
  size?: string;
  flavor?: string;
  // Add other properties as needed
};

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

  const addToCart = (item: CartItemType) => {
    setCartItems((currentItems) => [...currentItems, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
