import React, { createContext, useContext } from "react";

export const MenuDataContext = createContext<MenuData>({
  data: [],
  itemOptions: [],
});

export const useMenuData = () => useContext(MenuDataContext);

export const MenuDataProvider = ({ children, menuData }) => {
  return (
    <MenuDataContext.Provider value={menuData}>
      {children}
    </MenuDataContext.Provider>
  );
};
