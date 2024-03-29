import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator
} from "react-native";
import axios from "axios";
import Header from "../components/Header";
import FiltersSection from "../components/FiltersSection";
import { NFTContext } from "../../App";
import { AddressContext } from "../../App";
import Ticket from "../components/Ticket";
import MintNftModal from "../components/MintNftModal";

const subdomain = "https://ipfs.io";

const Home = ({ navigation }) => {
  const nft = useContext(NFTContext);
  const account = useContext(AddressContext);

  const [loading, setLoading] = useState(false);
  const [showMintModal, setShowMintModal] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [nfts, setNFTs] = useState([]);
  const [mintObj, setMintObj] = useState({});

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setLoading(true);
    loadContract();
  }, []);

  const handleInput = (text) => {
    setBusqueda(text);
  };

  const loadContract = async () => {
    axios
      .get(
        "https://api-biletly.onrender.com/tickets/TicketxUsuario/" +
        account
      )
      .then((result) => {
        let tickets = result.data;
        tickets.map(async (ticket) => {
          if (!ticket.tieneNFT) {
            if (
              typeof ticket.imagen
            ) {
              console.log('Ticket sin NFT:', ticket)

              let body = {
                "file": ticket.imagen,
                "type": "image"
              };

              axios
                .post("https://api-biletly.onrender.com/ipfs/", body)
                .then((result) => {
                  let foto = `${subdomain}/ipfs/${result.data.cid["/"]}`;
                  axios
                    .get(
                      "https://api-biletly.onrender.com/tickets/EventoxEntrada/" +
                      ticket.idEntrada
                    )
                    .then((result) => {
                      let evento = result.data;
                      let fecha = new Date(evento.fecha);
                      fecha = fecha.toISOString().substring(0, 10);
                      evento.fecha = fecha;
                      let nftTicket = {
                        id: ticket.idEntrada,
                        address: account,
                        name: evento.nombre,
                        date: fecha,
                        image: foto,
                        number: ticket.numAsiento,
                        description:
                          "EVENT: " +
                          evento.nombre +
                          " - NUMBER: " +
                          ticket.numAsiento +
                          " - DATE: " +
                          evento.fecha,
                      };
                      console.log("FOTO:", nftTicket.image);
                      createNFT(nftTicket, evento);
                    })
                    .catch((error) => {
                      console.log('error tomando eventoxentrada:', error);
                    });
                })
                .catch((error) => {
                  console.log('error creando imagen:', error);
                });
            }
          }
        });
      })
      .catch((error) => {
        console.log("error buscando tickets bdd" + error);
      });

    loadHome();
  };

  const createNFT = async (nftTicket, evento) => {
    console.log('Creando datos de NFT')
    try {
      let body = {
        "file": JSON.stringify(nftTicket),
        "type": "metadata"
      };
      axios
        .post("https://api-biletly.onrender.com/ipfs/", body)
        .then((result) => {
          setMintObj({
            result: result,
            nftTicket: nftTicket,
            evento: evento
          });
          setShowMintModal(true);
          // mintThenList(result, nftTicket, evento);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };

  const mintThenList = async (result, nftTicket, evento) => {
    console.log("Actualizando tieneNFT");
    axios
      .put("https://api-biletly.onrender.com/tickets/" + nftTicket.id)
      .then((result) => {
        //console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    setShowMintModal(false);
    const uri = `${subdomain}/ipfs/${result.data.path}`;
    console.log("Minteando NFT");
    const mint = await nft.mint(account, uri, nftTicket.description, evento);
    let resultadoTransaccion = await nft.signer.signTransaction(mint);
    console.log(resultadoTransaccion);

  };

  const loadHome = async () => {
    console.log("Loading Home");
    const ticketCount = await nft.tokenCount();
    console.log("TicketCount:", ticketCount.toString());
    let tickets = [];
    for (let i = 1; i <= ticketCount; i++) {
      const ticket = await nft.entradas(i);
      if (((await nft.getOwner(ticket.idEntrada))).toLowerCase() === account.toLowerCase()) {
        const evento = await nft.entradasEventos(i);
        let fecha = evento.fecha;
        let ticketUsed = await nft.ticketUsed(i);
        const uri = await nft.tokenURI(i);
        await axios
          .get(uri)
          .then((result) => {
            let metadata = result.data;
            tickets.push({
              id: ticket.idEntrada,
              name: metadata.name,
              number: metadata.number,
              description: metadata.description,
              image: metadata.image,
              date: fecha,
              ticketUsed: ticketUsed,
              event: evento,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    setNFTs(tickets);
    setLoading(false);
  };

  useEffect(() => {
    loadContract();
  }, []);

  if (loading || !nfts) {
    // if(true)
    return (
      <>
        <View>
          <View style={styles.container2}>
            <Header navigation={navigation} />
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              vertical={true}
            >
              <FiltersSection handleInput={handleInput} />
              <ActivityIndicator style={styles.loading} size="large" color="#0EDB88" />
            </ScrollView>
          </View>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View>
          <Header navigation={navigation} />
          <View style={styles.container2}>
            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              vertical={true}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <FiltersSection handleInput={handleInput} />
              {nfts.map((ticket, i) =>
                ticket.name.toLowerCase().includes(busqueda) ? (
                  <Ticket key={i} navigation={navigation} ticket={ticket} tickets={nfts} />
                ) : (
                  <View key={i}></View>
                )
              )}
            </ScrollView>
          </View>
          {showMintModal ? (
            <MintNftModal setShowMintModal={setShowMintModal} mintThenList={mintThenList} mintObj={mintObj} />
          ) : (
            <></>
          )}
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#181818",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
  },
  container2: {
    height: "100%",
    width: "100%",
    backgroundColor: "#181818",
    paddingBottom: 310,
  },
  scrollContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loading: {
    marginTop: 50
  }
});

export default Home;
