import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Pressable } from "react-native";
import logo from "../../public/logo.png";

export default function Encabezado({navigation}) {
  return (
    <>
      <Pressable style={styles.container} onPress={() => navigation.navigate('Home')}>
        <Image source={logo} style={{ width: 60, height: 60 }} />
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: "white",
    borderTopColor: "transparent",
    fontSize: 23,
    fontWeight: 'bold'
  },
  container: {
    height: 130,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#282828",
    borderBottom: 2,
    paddingTop: 33
  },
  fuente: {
    fontFamily: "Inter",
  },
});
