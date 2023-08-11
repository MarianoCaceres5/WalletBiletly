import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "../Home.js";
import Settings from "../Settings.js";
import ScanQr from "../ScanQr.js";

import qrIcon from "../../public/icons/qrIcon.png";
import settingsgris from "../../public/icons/settingsgris.png";
import settingsverde from "../../public/icons/settingsverde.png";
import walletgris from "../../public/icons/walletgris.png";
import walletverde from "../../public/icons/walletverde.png";

const Tab = createBottomTabNavigator();

export default function Navbar({navigation, route}) {
  // console.log(route.params.address)

  let options = {
    showLabel: false,
    headerShown: false,
    tabBarStyle: {
      backgroundColor: "#282828",
      height: 75,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderTopWidth: 1,
      borderTopColor: "#282828",
      display: "flex",
      position: "absolute",
      justifyContent: "center"
    },
    tabBarInactiveTintColor: "#282828",
    tabBarActiveTintColor: "#282828",
    tabBarHideOnKeyboard: true
  };

  return (
    <Tab.Navigator screenOptions={options}>
      <Tab.Screen
        name="Home"
        children={()=><Home navigation={navigation} route={route}/>}
        options={{
          tabBarIcon: ({focused}) => (
            <Image source={focused ? walletverde : walletgris} style={{ width: 50, height: 50, marginLeft: 30, marginTop: 10 }} />          
          ),
        }}
      />

      <Tab.Screen
        name="ScanQR"
        children={()=><ScanQr route={route}/>}
        options={{
          tabBarIcon: () => (
            <TouchableOpacity style={[styles.scanQR]} onPress={() => navigation.navigate("ScanQR")}>                                        
              <Image source={qrIcon} style={[styles.imageQr]} />
            </TouchableOpacity>   
          ),
          tabBarStyle: {
            display: "none", 
          }, 
        }}        
      />

      <Tab.Screen
        name="Settings"
        children={()=><Settings navigation={navigation} route={route}/>}
        style={styles.back}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={focused ? settingsverde : settingsgris}
              style={{ width: 50, height: 50, marginRight: 30, marginTop: 10}}
            />
          ),
        }}        
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  scanQR: {
    backgroundColor: "#0EDB88",
    width: 68,
    height: 68,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 45,    
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    
    shadowColor: "#0EDB88",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,    
    elevation: 6,

  },
  imageQr: {
    width: '40%',
    height: '40%',
  }
});