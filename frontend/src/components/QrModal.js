import { View, Text, StyleSheet, Image, ActivityIndicator, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { NFTContext, AddressContext } from "../../App";
import axios from "axios";
import erroIcon from "../../public/icons/error.png"

export default function QrModal({ handleCloseScan, data, handleReturnHome }) {

  const nft = useContext(NFTContext);
  const account = useContext(AddressContext);

  const [loading, setLoading] = useState(true);
  const [canAccess, setCanAccess] = useState(false);
  const [ticketScanned, setTicketScanned] = useState({});

  const checkData = async () => {
    let ticketExist = false, evento = {};
    const ticketCount = await nft.tokenCount();
    let i = 1;
    for (let i = 1; i <= ticketCount; i++) {
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
              <View style={styles.backgroundWhite}>
                <View style={styles.boxGreen}>
                </View>
                <View style={styles.ticketContainer}>
                  <Image source={{ uri: ticketScanned.image }} style={[styles.ImageNFT, styles.shadow]} />
                  <Text style={{ fontSize: 19, color: 'black', fontWeight: 'normal', width: '100%', textAlign: 'center', marginTop: 10 }}>Ticket scanned</Text>
                  <Text style={{ fontSize: 19, color: 'black', fontWeight: 900, width: '100%', textAlign: 'center' }}>{ticketScanned.name}</Text>
                </View>
                <View style={[styles.buttonsContainer]}>
                  <TouchableOpacity style={[styles.buttonWhite, styles.shadow]} onPress={() => handleCloseScan()}>
                    <Text style={[styles.textGreen]}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.buttonGreen, styles.shadow]} onPress={() => handleReturnHome()}>
                    <Text style={[styles.whiteText]}>Return home</Text>
                  </TouchableOpacity>                  
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.backgroundGray}>
                <View style={styles.boxRed}>
                  <Image source={erroIcon} style={styles.errorIcon} />
                  <Text style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', fontWeight: 'normal', width: '100%', textAlign: 'center', marginTop: 25 }}>Something went wrong</Text>
                  <Text style={{ fontSize: 23, color: 'white', fontWeight: 'normal', width: '100%', textAlign: 'center'}}>We couldn't scan your ticket</Text>
                </View>
                <View style={styles.modalWhite}>
                  <Text style={{ fontSize: 14, color: 'black', fontWeight: 'normal',  width: '100%', }}>Either you don’t have an NFT for this event, or your ticket have already been used</Text>
                  <TouchableOpacity style={[styles.buttonGreen, styles.shadow, {width: '100%', marginTop: 20}]} onPress={() => handleReturnHome()}>
                    <Text style={[styles.whiteText]}>Return home</Text>
                  </TouchableOpacity>  
                </View>
                <TouchableOpacity style={[styles.buttonGray, styles.shadow]} onPress={() => handleCloseScan()}>
                    <Text style={[styles.textGreen]}>Scan QR again</Text>
                  </TouchableOpacity>
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
  backgroundWhite: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  backgroundGray: {
    width: '100%',
    height: '100%',
    backgroundColor: '#DEDEDE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageNFT: {
    objectFit: "contain",
    width: "60%",
    height: "70%",
    borderRadius: 8,
    shadowColor: "black",
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
    height: '50%',
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
  ticketContainer: {
    height: 475,
    marginBottom: 20,
    marginTop: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  buttonsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  whiteText: {
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
    marginRight: 10
  },
  textGreen: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#0EDB88",
  },
  errorIcon: {
    objectFit: "contain",
    height: 110,
    width: 110,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 200
  },
  boxRed: {
    width: '100%',
    height: '50%',
    backgroundColor: '#F33E52',
    position: 'absolute',
    top: 0,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50
  },
  modalWhite: {
    backgroundColor: 'white',
    width: '80%',
    marginTop: 150,
    borderRadius: 7.5,
    paddingHorizontal: 30,
    paddingVertical: 35,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGray: {
    backgroundColor: "#DEDEDE",
    width: 200,
    height: 50,
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
});
