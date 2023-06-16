import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import Home from "../Home.js";
import Settings from "../Settings.js";
import ScanQr from "../ScanQr.js";

import qr from "../../public/icons/qr.png";
import settingsgris from "../../public/icons/settingsgris.png";
import settingsverde from "../../public/icons/settingsverde.png";
import walletgris from "../../public/icons/walletgris.png";
import walletverde from "../../public/icons/walletverde.png";

const Tab = createBottomTabNavigator();

export default function Navbar() {
  const [homeSeleccionada, setIconoHome] = useState(true);
  const [settingsSeleccionada, setIconoSettings] = useState(false);

  if (homeSeleccionada) {
    var iconoW = walletverde;
    var iconoSetting = settingsgris;
  } else {
    var iconoW = walletgris;
    var iconoSetting = settingsverde;
  }

  let options = {
    showLabel: false,
    headerShown: false,
    tabBarStyle: {
      backgroundColor: "#282828",
      height: 80,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      border: "none",
      display: "flex",
      justifyContent: "center"
    },
    tabBarInactiveTintColor: "#282828",
    tabBarActiveTintColor: "#282828",
  };

  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          // tabBarBadge: 2
          tabBarIcon: () => (
            <Image source={{ uri: iconoW }} style={{ width: 50, height: 50, marginLeft: 30 }} />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (!homeSeleccionada) {
              setIconoHome(!homeSeleccionada);
              setIconoSettings(!settingsSeleccionada);
            }
          },
        }}
      />

      <Tab.Screen
        name="ScanQR"
        component={ScanQr}
        options={{
          tabBarIcon: () => (
            <Image
              source={{ uri: qr }}
              style={[{ width: 70, height: 70, marginBottom: 23, border: 10, borderColor: 'black' }, styles.shadow]}
            />
          ),
          tabBarStyle: {
            display: "none", 
          }, 
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        style={styles.back}
        options={{
          tabBarIcon: () => (
            <Image
              source={{ uri: iconoSetting }}
              style={{ width: 50, height: 50, marginRight: 30 }}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            if (!settingsSeleccionada) {
              setIconoHome(!homeSeleccionada);
              setIconoSettings(!settingsSeleccionada);
            }
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  scanQR: {
    width: 68,
    height: 68,
    marginBottom: 30,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});