import React, { useState }  from 'react'
import { Image,View,StyleSheet,TextInput,Text,TouchableHighlight,Modal,Button,ScrollView,SafeAreaView } from 'react-native-web'
//import { TouchableHighlight } from 'react-native/types';
// import 'typeface-inter';

import filterIcon from "../../public/icons/filter.png";
export default function FiltersSection() {

  const [modalVisible, setModalVisible] = useState(false);


  function DisplayFilters(){

    setModalVisible(true)

  }
  return (
    <>
    <View style= {styles.container}>

    <TouchableHighlight onPress={() => DisplayFilters()} activeOpacity={1}>
    <Image source={{ uri: filterIcon }}  style={{ width: 50, height: 50 }}/>
    </TouchableHighlight>
    
    <TextInput
        style={styles.searchBar}
        
        placeholder="Search"
      />
      
   <Modal
     animationType="slide"
     transparent={false}
     visible={modalVisible}
     onRequestClose={() => setModalVisible(false)}
    style={styles.modalContainer}
    
     >
     <View style={styles.modalContainer}>
    <Text style={styles.titulo}>Este es el contenido del modal.</Text>
    <Button title="Cerrar Modal" onPress={() => setModalVisible(false)} />
    </View>
    </Modal>
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
    borderRadius:6,
    height:40,
    width:250,
  },
  fuente:{
    fontFamily:"Inter"
  },  
  modalContainer: {
    backgroundColor: 'white',
    height:'20%'
    
  },
  
 
});
