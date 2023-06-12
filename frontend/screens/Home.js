import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import Logo from "../public/logo.png";

const Home = ({ navigation }) => {

  return (
    <View>
        <Text style={{backgroundColor:'red'}}>Hello man, this is home</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'red',
  }
});

export default Home;
