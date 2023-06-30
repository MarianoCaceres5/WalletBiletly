import React from 'react'
import Encabezado from './components/Encabezado'
import { View, Text, StyleSheet, Image } from "react-native";
import copy from "../public/icons/copy.png"
import home from "../public/icons/home.png"
import help from "../public/icons/help.png"
import about from "../public/icons/about.png"
import signout from "../public/icons/signout.png"


export default function Settings({route}) {
  return (
    <>
      <Encabezado />
      <View style={styles.container}>
        <Text style={styles.title}> Configuration </Text>

        <View style={styles.line} />

        <View>
          <Text style={styles.subtitle}>Address</Text>
          <View style={styles.addressContainer}>          
            <Text style={[styles.address, styles.w75]}> {route.params.account} </Text>
            <Image source={{ uri: copy }} style={{ width: 29, height: 29, marginLeft:20 }} />
          </View>
        </View>
        

        <View style={styles.line} />

        <View style={styles.flexColumnContainer}>

          <View style={styles.flexContainer}>
            <Image source={{ uri: home }} style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> Home </Text>
          </View>

          <View style={styles.flexContainer}>
            <Image source={{ uri: help }} style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> Looking for help </Text>
          </View>

          <View style={styles.flexContainer}>
            <Image source={{ uri: about }} style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> About Biletly </Text>
          </View>

        </View>

        <View style={styles.line} />

        <View style={styles.flexColumnContainer}>
          <View style={styles.flexContainer}>
            <Image source={{ uri: signout }} style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> Sign Out </Text>
          </View>
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
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 70,
    marginTop: 30,
  },
  address: {
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
    backgroundColor: 'yelllow',
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: "center",
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
    fontSize: 20,
    fontWeight: "semibold",
    color: "white",
    alignSelf: "flex-start",
    paddingHorizontal: 15,
  },
  addressContainer: {
    width: '100%',
    display: "flex",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingTop: 0,
    marginBottom: 25

    
  },
  w75: {
    width: '75%'
  }
})
