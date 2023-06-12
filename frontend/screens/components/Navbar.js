import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home.js';
import Settings from '../Settings.js';
import ScanQr from '../ScanQr.js';
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import qr from '../../public/icons/qr.png'
import settingsgris from '../../public/icons/settingsgris.png'
import settingsverde from '../../public/icons/settingsverde.png'
import walletgris from '../../public/icons/walletgris.png'
import walletverde from '../../public/icons/walletverde.png'
const Tab = createBottomTabNavigator();


export default function Navbar() {

  const [homeSeleccionada, setIconoHome] = useState(true);
  const [settingsSeleccionada, setIconoSettings] = useState(false);

  function setIcons(){
    if (homeSeleccionada) {
      setIconoHome(false)
      setIconoSettings(true)
      console.log("home" + homeSeleccionada)
      
      console.log("sett" + settingsSeleccionada)
    }else{
      setIconoHome(true)
      setIconoSettings(false)
      console.log("home" + homeSeleccionada)
      
      console.log("sett" + settingsSeleccionada)
    }
  }

  if (homeSeleccionada) {
    var iconoW = walletverde
    var iconoSetting = settingsgris
  }else{
    var iconoW = walletgris
    var iconoSetting = settingsverde
  }

 

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false, tabBarStyle: {
        backgroundColor: '#fff',
        height: 80,
      }
    }}>
      <Tab.Screen name="Home" component={Home} style={styles.back}
        options={{
          tabBarIcon: () => (
            <Image source={{ uri: iconoW}} style={{ width: 50, height: 50 }} />
          ),
          onPress:() => setIcons()
        }}
      />
      <Tab.Screen name="ScanQr" component={ScanQr} style={styles.back} options={{
        tabBarIcon: () => (
          <Image source={{ uri: qr }} style={{ width: 50, height: 50 }} />
        )
      }} />
      <Tab.Screen name="Settings" component={Settings} style={styles.back} options={{
        tabBarIcon: () => (
          <Image source={{ uri: iconoSetting}} style={{ width: 50, height: 50 }} />
        ),
        
          onPress:() => setIcons()
      }} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: 'red',
    borderTopColor: 'transparent',
    fontSize: 40
  },

});
