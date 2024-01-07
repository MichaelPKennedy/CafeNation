// UserContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the type for your user data
type UserType = {
  id: string;
  name: string;
  // add other user fields as needed
} | null;

// Define the type for the context
type UserContextType = {
  user: UserType;
  signIn: (userData: UserType) => Promise<void>;
  signOut: () => Promise<void>;
};

// Create the context with a default value
export const UserContext = createContext<UserContextType>({
  user: null,
  signIn: async () => {},
  signOut: async () => {},
});

// Define the type for the provider props
type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const checkUserSignIn = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser) as UserType);
        }
      } catch (error) {
        console.error("Failed to fetch user from AsyncStorage", error);
      }
    };

    checkUserSignIn();
  }, []);

  const signIn = async (userData: UserType) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Failed to sign in and save user data", error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Failed to sign out and remove user data", error);
    }
  };

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};
