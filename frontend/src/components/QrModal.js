import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

export default function QrModal({handleCloseScan}) {
  return (
      <View style={styles.container}>
        <View style={styles.modal}>
          <Pressable style={styles.button} onPress={() => handleCloseScan()}><Text>Oki</Text></Pressable>
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
