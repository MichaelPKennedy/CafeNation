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
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartContextType = {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  checkout: (totalAmount: number, sourceId: string) => Promise<void>;
  orderStatus: string;
  setOrderStatus: (status: string) => void;
  showSuccessModal: boolean;
  setShowSuccessModal: (show: boolean) => void;
};

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  checkout: async () => {},
  orderStatus: "",
  setOrderStatus: () => {},
  showSuccessModal: false,
  setShowSuccessModal: () => {},
});

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [orderStatus, setOrderStatus] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
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
        const localCart = await AsyncStorage.getItem("guestCart");
        if (localCart) {
          setCartItems(JSON.parse(localCart));
        }
      } catch (error) {
        console.error("Error accessing AsyncStorage:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const addToCart = async (newItem: CartItemType) => {
    if (user) {
      try {
        const existingItem = await feathersClient.service("cart").find({
          query: {
            user_id: user.id,
            product_id: newItem.id,
            item_variation_id: newItem.item_variation_id,
          },
        });

        if (existingItem.length > 0) {
          await feathersClient.service("cart").patch(existingItem[0].id, {
            quantity: existingItem[0].quantity + 1,
          });
        } else {
          await feathersClient.service("cart").create({
            ...newItem,
            user_id: user.id,
            quantity: 1,
          });
        }
        await fetchCartItems();
      } catch (error) {
        console.error("Error adding item to cart:", error);
      }
    } else {
      const existingItemIndex = cartItems.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.item_variation_id === newItem.item_variation_id
      );
      if (existingItemIndex !== -1) {
        const updatedCart = [...cartItems];
        updatedCart[existingItemIndex].quantity += 1;
        setCartItems(updatedCart);
        await AsyncStorage.setItem("guestCart", JSON.stringify(updatedCart));
      } else {
        const updatedCart = [...cartItems, { ...newItem, quantity: 1 }];
        setCartItems(updatedCart);
        await AsyncStorage.setItem("guestCart", JSON.stringify(updatedCart));
      }
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (user) {
      try {
        const existingItem = await feathersClient.service("cart").find({
          query: {
            user_id: user.id,
            product_id: itemId,
          },
        });

        if (existingItem.length > 0) {
          if (existingItem[0].quantity > 1) {
            await feathersClient.service("cart").patch(existingItem[0].id, {
              quantity: existingItem[0].quantity - 1,
            });
          } else {
            await feathersClient.service("cart").remove(existingItem[0].id);
          }
        }
        await fetchCartItems();
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    } else {
      const updatedCart = cartItems
        .map((item) =>
          item.id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.id !== itemId || item.quantity > 0);
      setCartItems(updatedCart);
      await AsyncStorage.setItem("guestCart", JSON.stringify(updatedCart));
    }
  };

  const checkout = async (totalAmount: number, sourceId: string) => {
    const locationId = process.env.EXPO_PUBLIC_LOCATION_ID;
    console.log("Location ID:", locationId);
    try {
      setOrderStatus("processing");
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
        source_id: sourceId,
      });

      console.log("Order created:", order);

      if (user) {
        await feathersClient.service("cart").remove(null, {
          query: { user_id: user.id },
        });
      } else {
        await AsyncStorage.removeItem("guestCart");
      }

      setCartItems([]);
      setOrderStatus("completed");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Checkout failed:", error);
      setOrderStatus("failed");
    }
  };

  const clearCart = async () => {
    if (user) {
      try {
        await feathersClient.service("cart").remove(null, {
          query: { user_id: user.id },
        });
        await fetchCartItems();
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    } else {
      setCartItems([]);
      await AsyncStorage.removeItem("guestCart");
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        orderStatus,
        setOrderStatus,
        showSuccessModal,
        setShowSuccessModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
