import React from 'react'
import { Image,View,StyleSheet,TextInput,Text,TouchableHighlight } from 'react-native-web'
//import { TouchableHighlight } from 'react-native/types';

import filterIcon from "../../public/icons/filter.png";
export default function FiltersSection() {

  function DisplayFilters(){

    alert("aaa")
    return


  }



  return (
    <>
    <View style= {styles.container}>

    <TouchableHighlight onPress={() => DisplayFilters()}>
    <Image source={{ uri: filterIcon }}  style={{ width: 50, height: 50 }}/>
    </TouchableHighlight>

    <TextInput
        style={styles.searchBar}
        
        placeholder="Search"
      />
    </View>
    </>
  )
}


const styles = StyleSheet.create({
  titulo: {
    color: "white",
    borderTopColor: "transparent",
    fontSize: 30,
  },
  container:{
      height:100,
      flexDirection:'row',
      alignContent:'center',
      justifyContent:'space-evenly',
      alignItems:'center',
      backgroundColor:'#181818',
      borderBottom: 2
  },
  searchBar:{
    backgroundColor:'#FFFFFF',
    borderRadius:8,
    height:40,
    width:210,
  }
});
