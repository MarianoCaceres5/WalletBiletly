import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable,ScrollView } from "react-native";
import Logo from "../public/logo.png";
import { ethers } from "ethers";
import Encabezado from "./components/Encabezado";
import FiltersSection from "./components/FiltersSection";
import 'typeface-inter';


const Home = ({ navigation, route }) => {

  const [ticketCount, setTicketCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);

  const loadContract = async () => {
    setTicketCount(ethers.utils.formatEther(await route.params.nft.tokenCount()))
  
    let items = []
    for (let i = 1; i <= ticketCount; i++) {
        const ticket = await nft.entradas(i);                
        // if (!(await nft.ticketSold(i))) {
            const uri = await nft.tokenURI(i);
            const response = await fetch(uri);
            const metadata = await response.json()
            items.push({
                itemId: ticket.idEntrada,
                owner: nft.getOwner(ticket.idEntrada),
                name: metadata.name,
                description: metadata.description,
                image: metadata.image
            }); 
        // }
    }
    setLoading(false);
    setTickets(items);

    ////

    items.push({
      itemId: 1,
      owner: "0x1b6CDbBdc13C607416cE3C535D4A04e6C0a5be7b",
      name: "Ticket Prueba",
      description: "Descripcion de ticket de prueba",
      image: Logo
    }); 
    setTickets(items);

  }

  useEffect(() => {
    console.log(route.params?.nft)
    loadContract()
  }, [])

  if (loading) return (
    <View style={styles.container}>
        <Text style={styles.title }>Loading...</Text>
    </View>
  )

  return (
    <>
    <Encabezado />
    <FiltersSection />
   

    <View style={styles.container2}>
      <ScrollView contentContainerStyle = {styles.scrollContainer} vertical={true}>

         {/* <View style={styles.NFTContainer}>
        {tickets.map(ticket => (
          <Text style={styles.title}>{ticket.name}</Text>
          <Text style={[styles.NFTText, styles.fuente]}>{ticket.fecha}</Text>
        ))}
    </View>  */}

        <View style={styles.NFTContainer}>
         <Image source = {{uri:"https://viapais.com.ar/resizer/8Y5cvKSM5upWUNZalRBN2DN09mo=/1023x1377/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/WBXAJ37TV5HDDFH3DCKJ6TW5CQ.jpg"}} style={styles.ImageNFT}></Image>
        <Text style={[styles.NFTName, styles.fuente]}>Emilia</Text>
        <Text style={[styles.NFTDate, styles.fuente]}>7/6/2023</Text>
       
        </View> 

        <View style={styles.NFTContainer}>
         <Image source = {{uri:"https://viapais.com.ar/resizer/8Y5cvKSM5upWUNZalRBN2DN09mo=/1023x1377/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/WBXAJ37TV5HDDFH3DCKJ6TW5CQ.jpg"}} style={styles.ImageNFT}></Image>
        <Text style={[styles.NFTName, styles.fuente]}>Emilia</Text>
        <Text style={[styles.NFTDate, styles.fuente]}>7/6/2023</Text>
        </View> 

        <View style={styles.NFTContainer}>
         <Image source = {{uri:"https://viapais.com.ar/resizer/8Y5cvKSM5upWUNZalRBN2DN09mo=/1023x1377/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/WBXAJ37TV5HDDFH3DCKJ6TW5CQ.jpg"}} style={styles.ImageNFT}></Image>
        <Text style={[styles.NFTName, styles.fuente]}>Emilia</Text>
        <Text style={[styles.NFTDate, styles.fuente]}>7/6/2023</Text>
        </View> 


      </ScrollView>
      
      </View>

     
  

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor:'#181818'
  },
  arrow: {
    width: 35,
    height: 35,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },  
  textCenter: {
    textAlign: 'center'
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white'
  },
  green: {
    color: '#0EDB88'
  },    
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 10,
    color: '#FFFFFF99'
  },
  nextButton: {
    backgroundColor: '#0EDB88',
    width:75,
    height:75,
    borderRadius:100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mt:{
    marginTop:20
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  container2:{
    height:'100%',
    width:'100%',
    backgroundColor:'#181818',
  },
  NFTContainer:{
    marginBottom:20,
    backgroundColor:'#0EDB88',
    height:355,
    borderRadius:20,
    alignContent:'center',
    width:'75%',
    alignItems:'center',
  },
  scrollContainer:{
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    padding:40
  },
  ImageNFT:{
    objectFit: 'contain',
    width:'85%',
    height:'70%',
    marginTop:20,
    borderRadius:10
  },
  NFTName:{
    marginTop:10,
    fontSize:20
  }, 
  NFTDate:{
    marginTop:10,
    fontSize:15
  },
  fuente:{
    fontFamily:"Inter"
  },  
});
export default Home;
