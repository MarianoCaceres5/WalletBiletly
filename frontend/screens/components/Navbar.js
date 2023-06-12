import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Home.js';
import Settings from '../Settings.js';
import ScanQr from '../ScanQr.js';
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

const Tab = createBottomTabNavigator();


export default function Navbar() {
  return (
    <Tab.Navigator style={styles.back}>
      <Tab.Screen style={styles.secondary} name="Home" component={Home} />
      <Tab.Screen style={styles.primary} name="ScanQr" component={ScanQr} />
      <Tab.Screen style={styles.secondary} name="Settings" component={Settings} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create( {
  back: {
    backgroundColor: 'red'
  },
  secondary: {

  }
});