import React, { createContext, useContext, useState, useEffect } from "react";
import feathersClient from "../feathersClient"; // Your feathers service client
import { MenuData } from "./types";

const MenuDataContext = createContext<{
  menuData: MenuData | null;
  isLoading: boolean;
} | null>(null);

export const MenuDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    feathersClient
      .service("menu")
      .find()
      .then((response: MenuData) => {
        setMenuData(response);
      })
      .catch((error: Error) => {
        console.error("Error fetching menu items:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <MenuDataContext.Provider value={{ menuData, isLoading }}>
      {children}
    </MenuDataContext.Provider>
  );
};

export const useMenuData = () => {
  const context = useContext(MenuDataContext);

  if (!context) {
    throw new Error("useMenuData must be used within a MenuDataProvider");
  }

  return context;
};
