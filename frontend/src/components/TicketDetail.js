import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet } from "react-native";

export default function TicketDetail({ nft }) {
  return (
      <View style={[styles.ticketContainer]}>
        <Text style={[styles.date]}>{nft.date}</Text>
        <Image
          source={{
            uri: "https://viapais.com.ar/resizer/CevULQoo00q2BuB3chl1ttm9_ss=/1023x1023/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/W6XYZSM2QVBIVKNYXPRI6AYGRI.jpg",
          }}
          style={styles.ImageNFT}
        ></Image>
        <Text style={[styles.NFTName]}>{nft.name}</Text>
        <Text style={[styles.description]}>{nft.event.descripcion}</Text>
        <Text style={[styles.numero]}>Entrada N°: {nft.number}</Text>
      </View>
      
  );
}

const styles = StyleSheet.create({
  ImageNFT: {
    objectFit: "contain",
    width: 220,
    height: 300,
    marginTop: 20,
    borderRadius: 8,
  },
  scrollContainer: {
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
    marginTop: 30,
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
    marginHorizontal: 10
  }
});
