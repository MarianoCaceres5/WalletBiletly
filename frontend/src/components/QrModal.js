import { View, Text, Pressable, StyleSheet, Image, ActivityIndicator, SafeAreaView, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import logo from '../../public/logo.png'
import successIcon from '../../public/icons/successIcon.png';
import { NFTContext, AddressContext } from "../../App";
import axios from "axios";
import { VirtualizedList } from "react-native-web";
import erroIcon from "../../public/icons/error.png"

export default function QrModal({ handleCloseScan, data, handleReturnHome }) {

  const nft = useContext(NFTContext);
  const account = useContext(AddressContext);

  const [loading, setLoading] = useState(true);
  const [canAccess, setCanAccess] = useState(false);
  const [ticketScanned, setTicketScanned] = useState({});

  const checkData = async () => {
    console.log('DATA:', data);
    let ticketExist = false, evento = {};
    const ticketCount = await nft.tokenCount();
    let i = 1;
    for (let i = 1; i <= ticketCount; i++) {
      const ticket = await nft.entradas(i);
      if (((await nft.getOwner(ticket.idEntrada))).toLowerCase() === account.toLowerCase()) {
        evento = await nft.entradasEventos(i);
        if (evento.idEvento.toString() == 2 && !(await nft.ticketUsed(ticket.idEntrada))) {
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
                date: evento.fecha,
                event: evento,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }      
    }
    checkTicket(evento, ticketExist);
  }

  const checkTicket = async (evento, ticketExist) => {
    if (ticketExist) {
      try {
        // await nft.useTicket(ticket.id, evento.idEvento);
        setCanAccess(true);
        setLoading(false);

      } catch (e) {
        console.log(e);
      }
    } else {
      setLoading(false);
      setCanAccess(false);
    }
  }

  useEffect(() => {
    checkData();
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modal}>
        {(!loading) ? (
          canAccess ? (
            <>
              <View style={styles.boxGreen}>
                <Image source={successIcon} style={styles.successIcon} />
                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: 10 }}>Ticket succesfully scanned</Text>
              </View>
              <View style={styles.boxWhite}>
                <View style={styles.dateContainer}>
                  <Text style={{ fontSize: 19, color: 'black', fontWeight: 'normal' }}>{ticketScanned.date}</Text>
                </View>
                <View style={styles.ticketContainer}>
                  <Image source={{ uri: ticketScanned.image }} style={[styles.ImageNFT, styles.shadow]} />
                  <Text style={{ fontSize: 19, color: 'black', fontWeight: 'normal', width: '100%', textAlign: 'center', marginTop: 10 }}>Event</Text>
                  <Text style={{ fontSize: 19, color: 'black', fontWeight: 900, width: '100%', textAlign: 'center' }}>{ticketScanned.name}</Text>
                </View>
                <View style={[styles.buttonsContainer]}>
                  <TouchableOpacity style={[styles.buttonGreen, styles.shadow]} onPress={() => handleReturnHome()}>
                    <Text style={[styles.whiteConnect]}>Return home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.buttonWhite, styles.shadow]} onPress={() => handleCloseScan()}>
                    <Text style={[styles.textGreen]}>Close</Text>
                  </TouchableOpacity>
                </View>                
              </View>
            </>
          ) : (
            <>
              <View style={styles.boxRed}>
                <View style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Image source={erroIcon} style={styles.qrRed} />
                </View>
                <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold', marginTop: 10 }}>Ticket succesfully scanned</Text>
              </View>
              <View style={styles.boxWhite}>
                <View style={styles.ticketContainer}>
                  <Image source={logo} style={[styles.ImageNFT, styles.shadow]} />
                </View>
                <View style={[styles.buttonsContainer]}>
                  <TouchableOpacity style={[styles.buttonGreen, styles.shadow]} onPress={() => handleReturnHome()}>
                    <Text style={[styles.whiteConnect]}>Return home</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.buttonWhite, styles.shadow]} onPress={() => handleCloseScan()}>
                    <Text style={[styles.textGreen]}>Close</Text>
                  </TouchableOpacity>
                </View>                
              </View>
            </>
          )

        ) : (
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
  modal: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageNFT: {
    objectFit: "contain",
    width: "60%",
    height: "70%",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.21,
    shadowRadius: 7.68,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  boxGreen: {
    width: '100%',
    height: '20%',
    backgroundColor: '#0EDB88',
    position: 'absolute',
    top: 0,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
  boxWhite: {
    position: 'absolute',
    top: '20%',
    width: '100%',
  },
  successIcon: {
    objectFit: "contain",
    height: '45%',
    width: '100%',
  },
  dateContainer: {
    height: 75,
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  ticketContainer: {
    height: 475,
    borderBottomColor: '#DEDEDE',
    borderBottomWidth: 1,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  buttonsContainer: {
    width: '100%'
  },
  whiteConnect: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  buttonGreen: {
    backgroundColor: "#0EDB88",
    width: 160,
    height: 50,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
    position: 'absolute',
    right: 30
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonWhite: {
    backgroundColor: "white",
    width: 100,
    height: 50,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    
    position: 'absolute',
    right: 190
  },
  textGreen: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0EDB88",
  },
  qrRed: {
    objectFit: "contain",
    height: 60,
    width: 60,
    borderWidth:3,
    borderColor: 'white',
    borderRadius: 200,
  },
  boxRed: {
    width: '100%',
    height: '50%',
    backgroundColor: '#F33E52',
    position: 'absolute',
    top: 0,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50
  },
});
