import { View, Text, Pressable, StyleSheet, Image, ActivityIndicator, SafeAreaView, Button} from "react-native";
import React, {useEffect, useState, useContext} from "react";
import logo from '../../public/logo.png'
import { NFTContext, AddressContext } from "../../App";
import axios from "axios";
import e from "cors";

export default function QrModal({handleCloseScan, data}) {
  
  const nft = useContext(NFTContext);
  const account = useContext(AddressContext);

  const [loading, setLoading] = useState(true);
  const [canAccess, setCanAccess] = useState(false);
  const [ticketScanned, setTicketScanned] = useState({});
  const [modalColor, setModalColor] = useState('white');

  const checkData = async () => {
    console.log('DATA:', data);
    let ticketExist = false, ticket = {}, evento = {};
    const ticketCount = await nft.tokenCount();
    let i = 1;
    while (!ticketExist || i <= ticketCount) {
      const ticket = await nft.entradas(i);
      if (((await nft.getOwner(ticket.idEntrada))).toLowerCase() === account.toLowerCase()) {
        evento = await nft.entradasEventos(i);
        if (evento.idEvento.toString() == 3 && !(await nft.ticketUsed(ticket.idEntrada))) {
          const uri = await nft.tokenURI(i);
          await axios
            .get(uri)
            .then((result) => {              
              ticketExist = true;
              let metadata = result.data;
              setTicketScanned({
                id: ticket.idEntrada,
                name: metadata.name,
                number: metadata.number,
                description: metadata.description,
                image: metadata.image,
                event: evento,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
      i++;
    }
    checkTicket(evento, ticketExist);
  }

  const checkTicket = async (evento, ticketExist) => {
    if(ticketExist){
      try{
        // await nft.useTicket(ticket.id, evento.idEvento);
        setModalColor('#0EDB88');
        setCanAccess(true);
        setLoading(false);

      }catch(e){
        console.log(e);
      }
    }else{
      setLoading(false);
      setModalColor('red');
      setCanAccess(false);
    }    
  }

  let modal = {
    backgroundColor: modalColor,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  useEffect(() => {
    checkData();
  }, [data]);

  return (
      <SafeAreaView style={styles.container}>
        <View style={modal}>      
          {(!loading) ? (
            canAccess? (
              <>
                <Image source={{uri: ticketScanned.image}} style={styles.ImageNFT}/>  
                <Text style={{fontSize:25}}>Ticket succesfully used!</Text>
                <Text>You can access the event</Text>
                <Button title="SetData" onPress={() => handleCloseScan()}></Button>
              </>
            ): (
              <>
                <Image source={logo} style={styles.ImageNFT}/>  
                <Button title="SetData" onPress={() => handleCloseScan()}></Button>
              </>
            )
            
          ):(
              <ActivityIndicator size="large" color="#0EDB88" />            
          )}
        </View>
      </SafeAreaView>
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
    width: "70%",
    height: "50%",
    marginTop: 20,
    borderRadius: 8,
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
