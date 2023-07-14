import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import arrowBack from "../public/icons/arrow-back.png";

export default function ScanQr({route}) {

  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={arrowBack} style={styles.arrowBackIcon} />
        </Pressable>
      </View>

      <View style={styles.bottomRectangle}> 
        <View style={styles.dragRectangle}></View>
        <Text style={styles.text}> Scan the QR </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282828"
  },
  white: {
    color: "white",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  arrowBackIcon: {
    width: 56,
    height: 56,
  },
  bottomRectangle: {
    width: "100%",
    height: 90,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    display: "flex",
    alignItems: "center",
  },
  text:{
    fontSize: 20,
    textAlign: "center",
    color: "black",
    fontWeight: "Medium",
    marginTop: 15
  },
  dragRectangle: {
    width: 37,
    height: 4,
    backgroundColor: "#0EDB88",
    borderRadius: 20,
    marginTop: 15
  },
});