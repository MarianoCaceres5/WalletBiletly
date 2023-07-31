import React from "react";
import Navbar from "./components/Navbar";

const Rutas = ({ navigation, route }) => {
  return (
    <Navbar navigation={navigation} route={route}/>
  );
};

export default Rutas;
