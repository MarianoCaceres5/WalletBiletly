import { View, Text, Pressable, StyleSheet, Image} from "react-native";
import React from "react";
import logo from '../../public/logo.png'

export default function QrModal({handleCloseScan, ticket}) {
  return (
      <View style={styles.container}>
        <View style={styles.modal}>
          {ticket.name != undefined ? (
            <>                     
              <Image source={logo} style={styles.ImageNFT}></Image>
              <Text>Ticket: {ticket.name}</Text>
              <Pressable style={styles.button} onPress={() => handleCloseScan()}><Text>Oki</Text></Pressable>   
            </>
          ):(
            <Text>Loading...</Text>
          )}          
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {    
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  ImageNFT: {
    objectFit: "contain",
    width: "85%",
    height: "70%",
    marginTop: 20,
    borderRadius: 8,
  },
  modal: {
    backgroundColor: 'white',
    width: '75%',
    height: '40%',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    width: '75%',
    height: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
