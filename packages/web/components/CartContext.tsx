import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { UserContext } from "./UserContext";
import feathersClient from "../feathersClient";
import { CartItemType } from "./types";

type CartContextType = {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (itemId: string) => void;
  checkout: (totalAmount: number) => Promise<void>;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  checkout: async () => {},
});

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const { user } = useContext(UserContext);

  const fetchCartItems = useCallback(async () => {
    if (user) {
      try {
        const items = await feathersClient
          .service("cart")
          .find({ query: { user_id: user.id } });
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    } else {
      try {
        const localCart =
          typeof window !== "undefined" &&
          window.localStorage?.getItem("guestCart");
        if (localCart) {
          setCartItems(JSON.parse(localCart));
        }
      } catch (error) {
        console.error("Error accessing localStorage:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const addToCart = async (newItem: CartItemType) => {
    console.log("Adding item to cart:", newItem);
    if (user) {
      try {
        await feathersClient.service("cart").create({
          user_id: user.id,
          product_id: newItem.id,
          item_name: newItem.name,
          description: newItem.description,
          item_variation_id: newItem.item_variation_id,
          variation_name: newItem.variation_name,
          price: Number(newItem.price),
          currency: newItem.currency,
          additional_notes: newItem.additional_notes,
          quantity: newItem.quantity,
        });
        await fetchCartItems();
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      const updatedCart = [...cartItems, newItem];
      setCartItems(updatedCart);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (user) {
      try {
        await feathersClient.service("cart").remove(null, {
          query: { user_id: user.id, product_id: itemId },
        });
        await fetchCartItems();
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      const updatedCart = cartItems.filter((item) => item.id !== itemId);
      setCartItems(updatedCart);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  };

  const checkout = async (totalAmount: number) => {
    const locationId = process.env.EXPO_PUBLIC_LOCATION_ID;
    console.log("Location ID:", locationId);
    try {
      const order = await feathersClient.service("order").create({
        user_id: user?.id || null,
        cart_items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          item_name: item.name,
          variation_name: item.variation_name,
          additional_notes: item.additional_notes,
        })),
        total_price: totalAmount,
        location_id: locationId,
      });

      console.log("Order created:", order);

      if (user) {
        await feathersClient.service("cart").remove(null, {
          query: { user_id: user.id },
        });
      } else {
        localStorage.removeItem("guestCart");
      }

      setCartItems([]);
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};
