import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Logo from "../public/logo.png";

const Connection = ({ navigation, route }) => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={[styles.image, styles.shadow]} />
      <Pressable
        style={[styles.button, styles.mt, styles.shadow]}
        onPress={() => route.params.onWeb3Handler()}
      >
        <Text style={[styles.title]}>Connect wallet</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    backgroundColor: "#282828",
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: "contain",
  },
  textCenter: {
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    backgroundColor: "#0EDB88",
    width: "100%",
    height: 55,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mt: {
    marginTop: 20,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default Connection;
