import React from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text  } from "react-native";

export default function Ticket({navigation, ticket }) {
  return (
    <>
      <TouchableOpacity
        style={styles.NFTContainer}
        onPress={() =>
          navigation.navigate("NFTDetail", {
            nft: { ticket },
            navigation: { navigation },
          })
        }
      >
        <View style={styles.NFTContainerGreen}></View>
        <Image source={ticket.image} style={styles.ImageNFT}></Image>
        <Text style={[styles.NFTName]}>{ticket.name}</Text>
        <Text style={[styles.NFTDate]}>{ticket.date}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  NFTContainer: {
    marginBottom: 20,
    backgroundColor: "white",
    height: 417,
    borderRadius: 20,
    alignContent: "center",
    width: "80%",
    alignItems: "center",
  },
  NFTContainerGreen: {
    backgroundColor: "#0EDB88",
    height: "45%",
    width: "100%",
    position: "absolute",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  ImageNFT: {
    objectFit: "contain",
    width: "85%",
    height: "70%",
    marginTop: 20,
    borderRadius: 8,
  },
  NFTName: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  NFTDate: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "normal",
  },
});