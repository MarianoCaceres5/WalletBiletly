import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home.js";
import Settings from "../Settings.js";
import ScanQr from "../ScanQr.js";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import qr from "../../public/icons/qr.png";
import settingsgris from "../../public/icons/settingsgris.png";
import settingsverde from "../../public/icons/settingsverde.png";
import walletgris from "../../public/icons/walletgris.png";
import walletverde from "../../public/icons/walletverde.png";

const Tab = createBottomTabNavigator();

export default function Navbar({navigation}) {
  const [homeSeleccionada, setIconoHome] = useState(true);
  const [settingsSeleccionada, setIconoSettings] = useState(false);

  function setIcons() {
    if (homeSeleccionada) {
      setIconoHome(false);
      setIconoSettings(true);
      console.log("home" + homeSeleccionada);

      console.log("sett" + settingsSeleccionada);
    } else {
      setIconoHome(true);
      setIconoSettings(false);
      console.log("home" + homeSeleccionada);

      console.log("sett" + settingsSeleccionada);
    }
  }

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
      border: "none",
      borderRadius: 15,
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
          tabBarIcon: () => (
            <Image source={{ uri: iconoW }} style={{ width: 50, height: 50 }} />
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
              style={{ width: 70, height: 70, marginBottom: 23 }}
            />
          ),
        }}
        listeners={{
          tabPress: (e) => {
            setIconoHome(false);
            setIconoSettings(false);
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
              style={{ width: 50, height: 50 }}
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
  back: {
    color: "red",
    borderTopColor: "transparent",
    fontSize: 40,
  },
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
