import React, { useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  TextInput,
} from "react-native";

export default function FiltersSection(handleInput) {
  return (
    <>
      <View style={styles.container}>
        <View>
          <Image source={{uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/768px-Search_Icon.svg.png'}} style={styles.searchIcon} />
          <TextInput style={styles.searchBar} onChangeText={newText => handleInput.handleInput(newText)} placeholder="Search Tickets" clearButtonMode='always'/>
        </View>       
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  titulo: {
    color: "white",
    borderTopColor: "transparent",
    fontSize: 30,
  },
  container: {
    height: 100,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#181818",
    borderBottom: 2,
  },
  searchBar: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    height: 40,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    width: 25,
    height: 25,
    position: 'absolute',
    borderWidth: 1,
    top: 8,
    left: 250,
    zIndex: 1000
  },
  fuente: {
    fontFamily: "Inter",
  },
  modalContainer: {
    backgroundColor: "white",
    height: "20%",
  },
});
