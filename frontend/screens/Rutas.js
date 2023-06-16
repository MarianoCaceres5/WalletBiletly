import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Logo from "../public/logo.png";
import { ethers } from "ethers";
import Navbar from "./components/Navbar";

const Rutas = ({ navigation, route }) => {
  return (
    <Navbar navigation={navigation}  />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor:'#282828'
  }
});
export default Rutas;
