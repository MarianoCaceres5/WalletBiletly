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
} from "react-native";
import axios from "axios";
import Header from "./components/Header";
import FiltersSection from "./components/FiltersSection";
import logo from "../public/logo.png";
import { NFTContext } from "../App";
import { AddressContext } from "../App";
import Ticket from "./components/Ticket";

const subdomain = "https://ipfs.io";

const Home = ({ navigation }) => {
  const nft = useContext(NFTContext);
  const account = useContext(AddressContext);

  const [loading, setLoading] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [nfts, setNFTs] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    loadHome();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleInput = (text) => {
    setBusqueda(text);
  };

  const loadContract = async () => {
    axios
      .get(
        "https://bl6tkxcz-3000.brs.devtunnels.ms/tickets/TicketxUsuario/" +
          account
      )
      .then((result) => {
        let tickets = result.data;
        tickets.map(async (ticket) => {
          if (!ticket.tieneNFT) {
            if (
              typeof ticket.imagen !== undefined &&
              typeof ticket.imagen !== null
            ) {
              try {
                let body = {
                  file: ticket.imagen,
                };

                axios
                  .post("https://bl6tkxcz-3000.brs.devtunnels.ms/ipfs/", body)
                  .then((result) => {
                    let foto = `${subdomain}/ipfs/${result.data.path}`;
                    axios
                      .get(
                        "https://bl6tkxcz-3000.brs.devtunnels.ms/tickets/EventoxEntrada/" +
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
                        console.log(error);
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              } catch (error) {
                console.log("ipfs image upload error: ", error);
              }
            }
          }
        });
      })
      .catch((error) => {
        console.log("HUBO UN ERROR" + error);
      });

    loadHome();
  };


  const uploadToIPFS = async (ticket) => {
    console.log("link del drive: " + ticket.imagen);
    let url = ticket.imagen;

    // let url = "https://viapais.com.ar/resizer/CevULQoo00q2BuB3chl1ttm9_ss=/1023x1023/smart/cloudfront-us-east-1.images.arcpublishing.com/grupoclarin/W6XYZSM2QVBIVKNYXPRI6AYGRI.jpg";
    if (typeof url !== undefined && typeof url !== null) {
      try {
        let body = {
          file: url,
        };

        await axios
          .post("https://bl6tkxcz-3000.brs.devtunnels.ms/ipfs/", body)
          .then((result) => {
            console.log(result.data.path);
            return `${subdomain}/ipfs/${result.data.path}`;
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };

  const createNFT = async (nftTicket, evento) => {
    try {
      let body = {
        file: JSON.stringify(nftTicket),
      };
      axios
        .post("https://bl6tkxcz-3000.brs.devtunnels.ms/ipfs/", body)
        .then((result) => {
          console.log(result.data.path);
          mintThenList(result, nftTicket, evento);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };

  const mintThenList = async (result, nftTicket, evento) => {
    const uri = `${subdomain}/ipfs/${result.data.path}`;
    console.log("Minteando");
    const mint = await nft.mint(account, uri, nftTicket.description, evento);
    await nft.signer.signTransaction(mint);

    console.log("Actualizando tieneNFT");
    axios
      .put("https://bl6tkxcz-3000.brs.devtunnels.ms/tickets/" + nftTicket.id)
      .then((result) => {
        //console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadHome = async () => {
    console.log("Loading Home");
    const ticketCount = await nft.tokenCount();
    console.log("TicketCount:", ticketCount.toString());
    let tickets = [];
    for (let i = 1; i <= ticketCount; i++) {
      const ticket = await nft.entradas(i);
      const evento = await nft.entradasEventos(i);
      let fecha = evento.fecha;
      const uri = await nft.tokenURI(i);
      await axios
        .get(uri)
        .then((result) => {
          let metadata = result.data;
          console.log("Metadata: ", metadata);
          tickets.push({
            id: ticket.idEntrada,
            name: metadata.name,
            number: metadata.number,
            description: metadata.description,
            image: metadata.image,
            date: fecha,
            event: evento,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log("Tickets:", tickets);
    setNFTs(tickets);
  };

  useEffect(() => {
    loadContract();
  }, []);

  useEffect(() => {
    if (!nfts) {
      setLoading(false);
    }
  }, [nfts]);

  if (loading)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
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
                <Ticket key={i} navigation={navigation} ticket={ticket} />
              ) : (
                <View key={i}></View>
              )
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
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
});

export default Home;
