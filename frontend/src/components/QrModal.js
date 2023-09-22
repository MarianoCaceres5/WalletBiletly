import { View, Text, Pressable, StyleSheet, Image, ActivityIndicator} from "react-native";
import React from "react";
import logo from '../../public/logo.png'
import close from '../../public/icons/close.png'

export default function QrModal({handleCloseScan, ticket}) {

  return (
      <View style={styles.container}>
        <View style={styles.modal}>      
          {ticket.name != undefined ? (
            <>                  
              <Image source={logo} style={styles.ImageNFT}/>
              <Text>Ticket: {ticket.name}</Text>              
            </>
          ):(
            <ActivityIndicator size="large" color="#0EDB88" />
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
    width: '100%',
    height: '100%',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  closeIcon: {
    width: 25,
    height: 25,
  }
});
