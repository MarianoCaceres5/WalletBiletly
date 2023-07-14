import React from "react";
import Encabezado from "./components/Encabezado";
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import Clipboard from '@react-native-community/clipboard';
import copy from "../public/icons/copy.png";
import home from "../public/icons/home.png";
import help from "../public/icons/help.png";
import about from "../public/icons/about.png";
import signout from "../public/icons/signout.png";

export default function Settings({ route }) {

  return (
    <>
      <Encabezado />
      <View style={styles.container}>
        <Text style={styles.title}> Configuration </Text>

        <View style={styles.line} />

        <View>
          <Text style={styles.subtitle}>Address</Text>
          <View style={styles.addressContainer}>
            <Text style={[styles.address, styles.w75]}>
              {route.params.account}
            </Text>
            <TouchableOpacity onPress={() => {
              console.log(typeof Clipboard.setString)              
            }}>
              <Image
                source={copy}
                style={{ width: 29, height: 29, marginLeft: 20 }}
              />
            </TouchableOpacity>            
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.flexColumnContainer}>
          <View style={styles.flexContainer}>
            <Image source={home } style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> Home </Text>
          </View>

          <View style={styles.flexContainer}>
            <Image source={help} style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> Looking for help </Text>
          </View>

          <View style={styles.flexContainer}>
            <Image source={about} style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> About Biletly </Text>
          </View>
        </View>

        <View style={styles.line} />

        <TouchableOpacity onPress={() => route.params.handleConnection()} style={styles.flexColumnContainer}>
          <View style={styles.flexContainer}>
            <Image
              source={signout}
              style={{ width: 30, height: 30 }}
            />
            <Text style={styles.text}> Sign Out </Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    alignItems: "center",
  },
  white: {
    color: "white",
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
    marginLeft: 40,
    marginTop: 30,
    marginBottom: 5
  },
  address: {
    fontSize: 16,
    fontWeight: "medium",
    color: "gray",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#282828",
  },
  flexContainer: {
    backgroundColor: "yelllow",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 0,
    marginBottom: 25,
  },
  w75: {
    width: "75%",
  },
});
