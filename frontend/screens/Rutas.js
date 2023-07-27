import React from "react";
import { StyleSheet, Text} from "react-native";
import Navbar from "./components/Navbar";

const Rutas = ({ navigation, route }) => {
  return (
    <Navbar navigation={navigation} route={route}/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor:'#282828'
  }
});

export default Rutas;
