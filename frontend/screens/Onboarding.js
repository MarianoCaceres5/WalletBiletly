import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Logo from "../public/logo.png";
import Ticket from "../public/ticket.png";
import Arrow from "../public/arrow-icon.png";
import Navbar from "./components/Navbar";
import { NavigationContainer } from "@react-navigation/native";
const Onboarding = ({ navigation }) => {
  const [showFirstPage, setShowFirstPage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstPage(false);
      // navigation.navigate('SecondScreen'); // Cambia 'SecondScreen' por el nombre de la segunda pantalla en tu aplicación
    }, 1);

    return () => clearTimeout(timer);
  }, []);

  if (showFirstPage) {
    return (
      <View style={styles.container}>
        <Image source={Logo} style={[styles.image, styles.shadow]} />
      </View>
    );
  } else {
    return (
      <>
        <View style={styles.container}>
          <Image source={Ticket} style={[styles.image, styles.shadow]} />
          <Text style={[styles.title, styles.textCenter, styles.mt]}>
            The easiest way to access your{" "}
            <Text style={[styles.title, styles.green]}>NFT Tickets</Text>
          </Text>
          <Text style={[styles.subtitle, styles.textCenter, styles.mt]}>
            Connect your favorite wallet and make use of your NFTs
          </Text>
          <Pressable
            style={[styles.nextButton, styles.mt, styles.shadow]}
            onPress={() => navigation.navigate("Connection")}
          >
            <Image style={[styles.arrow]} source={Arrow} />
          </Pressable>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#282828",
  },
  arrow: {
    width: 35,
    height: 35,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  textCenter: {
    textAlign: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
  },
  green: {
    color: "#0EDB88",
  },
  subtitle: {
    fontSize: 17,
    textAlign: "center",
    marginVertical: 10,
    color: "#FFFFFF99",
  },
  nextButton: {
    backgroundColor: "#0EDB88",
    width: 75,
    height: 75,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mt: {
    marginTop: 20,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Onboarding;
