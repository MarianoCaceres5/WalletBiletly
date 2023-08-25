import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable
} from "react-native";
import back from "../public/icons/arrow-back.png"
import Encabezado from './components/Encabezado';

export default function NFTDetail({ route }) {  
  let nft = route.params.nft.ticket;
  let navigation = route.params.navigation.navigation;
  console.log(nft)

  return (
    <>
      <Encabezado navigation={navigation} />
      <View style={[styles.headerBack]}>          
        <Pressable
          onPress={() => navigation.goBack()}>
          <Image 
            source={back}
            style={styles.arrowBack}            
          ></Image>
        </Pressable>        
        <Text style={[styles.textBack]}>Ticket Details</Text>          
      </View>
      <View style={[styles.ticketContainer]}>   
        <Text style={[styles.date]}>{nft.date}</Text>
        <Image
          source={{ uri: 'https://viapais.com.ar/resizer/CevULQoo00q2BuB3chl1ttm9_ss=/1023x1023/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/W6XYZSM2QVBIVKNYXPRI6AYGRI.jpg' }}
          style={styles.ImageNFT}
        ></Image>
        <Text style={[styles.NFTName]}>{nft.name}</Text>
        <Text style={[styles.description]}>{nft.event.descripcion}</Text>
        <Text style={[styles.numero]}>Entrada N°: {nft.number}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#181818",
  },
  scrollContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 40,
  },
  ImageNFT: {
    objectFit: "contain",
    width: 220,
    height: 300,
    marginTop: 20,
    borderRadius: 8,
  },
  NFTName: {
    width: '100%',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  },
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
    borderColor: 'red'
  },
  arrowBack: {
    width: 40,
    height: 40
  },
  ticketContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  date: {
    width: '100%',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0EDB88',
    textAlign: 'center',
    marginBottom: 0
  },
  description: {
    marginTop: 10,
    width: '100%',
    fontSize: 13,
    fontWeight: 'normal',
    color: 'gray',
    textAlign: 'center',
  },
  numero: {
    marginTop: 20,
    width: '100%',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  }
});
