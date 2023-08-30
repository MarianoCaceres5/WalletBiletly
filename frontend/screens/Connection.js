import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable, Touchable, TouchableOpacity } from "react-native";
import Logo from "../public/logo.png";
import { ConnectionContext } from "../App";

const Connection = () => {
  
  const handleConnection = useContext(ConnectionContext);

  return (
    <View style={styles.container}>
      <View style={[styles.greenRectangle]}>
        <View style={[styles.logoContainer]}>
          <Image source={Logo} style={[styles.image]} />
        </View>  
      </View>          
      <Text style={[styles.title]}>Connect your Wallet to access all your NFTs</Text>
      <TouchableOpacity
        style={[styles.button, styles.shadow]}
        onPress={() => handleConnection('WalletExplorer')}
      >
        <Text style={[styles.whiteConnect]}>Connect wallet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[]}
        onPress={() => handleConnection('Qrcode')}
      >
        <Text style={[styles.greenConnect]}>Scan QR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    borderRadius: 100,
    backgroundColor: '#000000',
    width: 110,
    height: 110,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
    top: '85%',
    borderWidth: 7,
    borderColor: '#282828',
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  greenRectangle: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '38%',
    backgroundColor: '#219068',
    display: "flex",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#282828",
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: "contain",
  },
  title: {
    marginTop: '105%',
    fontSize: 19,
    fontWeight: "bold",
    color: "white",
    width: '75%',
    textAlign: 'center'
  },
  greenConnect: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0EDB88",
  },
  whiteConnect: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    marginTop: 50,
    marginBottom: 25,
    backgroundColor: "#0EDB88",
    width: "85%",
    height: 55,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default Connection;
