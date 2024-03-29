import { View, Text, Image, ScrollView, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet } from "react-native";

export default function TicketSlider({ navigation, tickets, nft }) {
  return (
    <>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        horizontal={true}
      >
        {tickets.map((ticket, i) => (
          <TouchableOpacity activeOpacity={0.7} key={i} onPress={() =>
            navigation.navigate("NFTDetail", {
              nft: { ticket },
              navigation: { navigation },
              tickets: { tickets }
            })
          } style={styles.nftButton}>
            <Image
              source={{
                uri: ticket.image
              }}
              style={styles.ImageNFT}
            ></Image>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  ImageNFT: {
    objectFit: "contain",
    width: 150,
    height: 200,
    marginTop: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white'
  },
  scrollContainer: {
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 40,
  },
  NFTName: {
    width: "100%",
    textAlign: "center",
    marginTop: 15,
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
  },
  ticketContainer: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  date: {
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    color: "#0EDB88",
    textAlign: "center",
    marginBottom: 0,
  },
  description: {
    marginTop: 10,
    width: "100%",
    fontSize: 13,
    fontWeight: "normal",
    color: "gray",
    textAlign: "center",
  },
  numero: {
    marginTop: 20,
    width: "100%",
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  nftButton: {
    marginHorizontal: 10,
    marginBottom: 50
  }
});
