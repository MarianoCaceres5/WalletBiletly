import React, {useContext, useState} from "react";
import Header from "../components/Header";
import { View, Text, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Pressable } from "react-native";
import * as Clipboard from 'expo-clipboard';
import copy from "../../public/icons/copy.png";
import home from "../../public/icons/home.png";
import help from "../../public/icons/help.png";
import about from "../../public/icons/about.png";
import signout from "../../public/icons/signout.png";
import { NFTContext } from "../../App";
import { AddressContext } from "../../App";
import { ConnectionContext } from "../../App";
import SignOutModal from "../components/SignOutModal";

export default function Settings({ navigation }) {

  const account = useContext(AddressContext);
  const handleConnection = useContext(ConnectionContext);
  const [showModal, setShowModal] = useState(false);

  const copyToClipboard = (text) => {
    Clipboard.setStringAsync(text);
  };  

  return (
    <>
      <Header navigation={navigation}/>
      
      <View style={styles.container}>
        <Text style={styles.title}> Configuration </Text>

        <View style={styles.line} />

        <View>
          <Text style={styles.subtitle}>Address</Text>
          <View style={styles.addressContainer}>
            <Text style={[styles.address, styles.w75]}>
              {account}
            </Text>
            <TouchableOpacity onPress={() => copyToClipboard(account)}>
              <Image
                source={copy}
                style={{ width: 29, height: 29, marginLeft: 20 }}
              />
            </TouchableOpacity>            
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.flexColumnContainer}>
          <TouchableOpacity style={styles.flexContainer} onPress={() => navigation.navigate('Home')}>
            <Image source={home } style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> Home </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.flexContainer}>
            <Image source={help} style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> Looking for help </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.flexContainer}>
            <Image source={about} style={{ width: 30, height: 30 }} />
            <Text style={styles.text}> About Biletly </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />

        <Pressable onPress={() => setShowModal(true)} style={styles.flexColumnContainer}>
          <View style={styles.flexContainer}>
            <Image
              source={signout}
              style={{ width: 30, height: 30 }}
            />
            <Text style={styles.text}> Sign Out </Text>
          </View>
        </Pressable>

        {((showModal) ? (
          <SignOutModal handleConnection={handleConnection} setShowModal={setShowModal}/>
        ) : (
          <></>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    alignItems: "center",
  },
  white: {
    color: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    margin: 30,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginLeft: 40,
    marginTop: 30,
    marginBottom: 5
  },
  address: {
    fontSize: 16,
    fontWeight: "medium",
    color: "gray",
  },
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#282828",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 30,

  },
  flexColumnContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 40,
    display: "flex",
    marginTop: 30,
    marginBottom: 15,
    width: '80%',
    flexDirection: "column",
  },
  text: {
    fontSize: 19,
    fontWeight: "semibold",
    color: "white",
    paddingHorizontal: 15,
  },
  addressContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingTop: 0,
    marginBottom: 25,
  },
  w75: {
    width: "75%",
  },
});
