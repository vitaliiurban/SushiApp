import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Favorites from "./Favorites";
const Drawer = createDrawerNavigator();
const SideBar = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={SideBar}></Drawer.Screen>
      <Drawer.Screen name="Favorites" component={Favorites}></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default SideBar;
