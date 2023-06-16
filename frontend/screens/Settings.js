import React from 'react'
import Encabezado from './components/Encabezado'
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

import copy from "../public/icons/copy.png"
import home from "../public/icons/home.png"
import help from "../public/icons/help.png"
import about from "../public/icons/about.png"
import signout from "../public/icons/signout.png"


export default function Settings({nft, account}) {
  console.log(account)
  return (
    <>
      <Encabezado />
      <View style={styles.container}>
        <Text style={styles.title}> Configuration </Text>

        <View style={styles.line} />

        <Text style={styles.subtitle}> Address </Text>
        <div style={styles.flexContainer}>
          <Text style={styles.address}> 0012212233 </Text>
          <Image source={{ uri: copy }} style={{ width: 29, height: 29 }} />
        </div>

        <View style={styles.line} />

        <View style={styles.flexColumnContainer}>

          <div style={styles.flexContainer}>
            <Image source={{ uri: home }} style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> Home </Text>
          </div>

          <div style={styles.flexContainer}>
            <Image source={{ uri: help }} style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> Looking for help </Text>
          </div>

          <div style={styles.flexContainer}>
            <Image source={{ uri: about }} style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> About Biletly </Text>
          </div>

        </View>

        <View style={styles.line} />

        <View style={styles.flexColumnContainer}>
          <div style={styles.flexContainer}>
            <Image source={{ uri: signout }} style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> Sign Out </Text>
          </div>
        </View>

      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    margin: 30,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "semibold",
    color: "white",
    alignSelf: "baseline",
    paddingHorizontal: 40,
    marginTop: 30,
  },
  address: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "medium",
    color: "white",
    opacity: "80%",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#282828"
  },
  flexContainer: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  flexColumnContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 40,
    display: "flex",
    marginTop: 30,
    marginBottom: 15,
    flexDirection: "column",
  },
  text: {
    fontSize: 18,
    fontWeight: "semibold",
    color: "white",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
  }
})
