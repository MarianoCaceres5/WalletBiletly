import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import back from "../../public/icons/arrow-back.png"
import { StyleSheet } from "react-native";

export default function GoBack({navigation}) {
  return (
    <View style={[styles.headerBack]}>          
        <Pressable
          onPress={() => navigation.goBack()}>
          <Image 
            source={back}
            style={styles.arrowBack}
          />
        </Pressable>        
        <Text style={[styles.textBack]}>Ticket Details</Text>          
      </View>
  )
}

const styles = StyleSheet.create({
    headerBack: {
      width: '100%',
      height: '10%',
      display: 'flex',
      flexDirection: 'row',
      alignItems: "center",
      paddingHorizontal: 20,
    },
    textBack: {
      fontWeight: 'semibold',
      fontSize: 20,
      color: 'white',
      border: 5,
      borderColor: 'red',
      marginLeft: 15
    },
    arrowBack: {
      width: 40,
      height: 40
    },
  });
  