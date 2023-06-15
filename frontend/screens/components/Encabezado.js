import React from 'react'
import { View, Text, StyleSheet, Image, Pressable, Header } from "react-native";
import logo from "../../public/logo.png";

export default function Encabezado() {
  return (
        <>
        <View style={styles.container}>
        <Image source={{ uri: logo }}  style={{ width: 75, height: 75 }}/>
        <Text style={styles.titulo}>Biletly</Text>
        
        </View>
        </>
  )
}



const styles = StyleSheet.create({
    titulo: {
      color: "white",
      borderTopColor: "transparent",
      fontSize: 30,
    },
    container:{
        height:150,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#282828',
        borderBottom: 2
    }
  });
  