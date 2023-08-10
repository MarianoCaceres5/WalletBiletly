import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView
} from "react-native";
import axios from "axios";
import Encabezado from "./components/Encabezado";
import FiltersSection from "./components/FiltersSection";

const subdomain = "https://ipfs.io";

const Home = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [nfts, setNFTs] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    loadHome();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const loadContract = async () => {
    axios
      .get(
        "http://192.168.0.12:912/api/Tickets/TicketxUsuario/" +
          route.params?.account
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
                  .post("http://192.168.0.12:912/api/IPFS/", body)
                  .then((result) => {
                    let foto = `${subdomain}/ipfs/${result.data.path}`;
                    axios
                      .get(
                        "http://192.168.0.12:912/api/Tickets/EventoxEntrada/" +
                          ticket.idEntrada
                      )
                      .then((result) => {
                        let evento = result.data;
                        let fecha = new Date(evento.fecha);
                        fecha = fecha.toISOString().substring(0, 10);
                        evento.fecha = fecha;
                        let nftTicket = {
                          id: ticket.idEntrada,
                          address: route.params?.account,
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

        axios
          .post("http://192.168.0.12:912/api/IPFS/", body)
          .then((result) => {
            console.log(result.data.path);
            return result.data.path;
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
        .post("http://192.168.0.12:912/api/IPFS/", body)
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
    try {
      console.log("Minteando");
      await route.params.nft.mint(
        route.params?.account,
        uri,
        nftTicket.description,
        evento
      );

      console.log("Actualizando tieneNFT");
      axios
        .put("http://192.168.0.12:912/api/Tickets/" + nftTicket.id)
        .then((result) => {
          //console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log("Error man:");
      console.log(error);
    }
  };

  const loadHome = async () => {
    console.log("Loading Home");
    const ticketCount = await route.params?.nft.tokenCount();
    let tickets = [];
    for (let i = 1; i <= ticketCount; i++) {
      const ticket = await route.params?.nft.entradas(i);
      const evento = await route.params?.nft.entradasEventos(i);
      let fecha = evento.fecha;
      const uri = await route.params?.nft.tokenURI(i);
      const response = await fetch(uri);
      const metadata = await response.json();

      console.log("ipfs: " + metadata);

      // let img = await ObtenerImagenNFT(metadata.nftTicket.image);

      tickets.push({
        id: ticket.idEntrada,
        name: metadata.nftTicket.name,
        number: metadata.nftTicket.number,
        description: metadata.nftTicket.description,
        image: metadata.nftTicket.image,
        date: fecha,
        event: evento,
      });
    }

    setNFTs(tickets);
  };

  useEffect(() => {
    loadContract();
  }, []);

  useEffect(() => {
    if (nfts !== []) {
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
      <SafeAreaView>
        <Encabezado />
        <FiltersSection />

        <View style={styles.container2}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            vertical={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {nfts.map((ticket, i) => (
              <TouchableOpacity
                key={i}
                style={styles.NFTContainer}
                onPress={() =>
                  navigation.navigate("NFTDetail", {
                    nft: { ticket },
                    navigation: { navigation },
                  })
                }
              >
                <View style={styles.NFTContainerGreen}></View>
                <Image source={ticket.image} style={styles.ImageNFT}></Image>
                <Text style={[styles.NFTName]}>{ticket.name}</Text>
                <Text style={[styles.NFTDate]}>{ticket.date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
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
  arrow: {
    width: 35,
    height: 35,
  },
  white: {
    color: "white",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  textCenter: {
    textAlign: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
  },
  green: {
    color: "#0EDB88",
  },
  subtitle: {
    fontSize: 17,
    textAlign: "center",
    marginVertical: 10,
    color: "#FFFFFF99",
  },
  nextButton: {
    backgroundColor: "#0EDB88",
    width: 75,
    height: 75,
    borderRadius: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mt: {
    marginTop: 20,
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  container2: {
    height: "100%",
    width: "100%",
    backgroundColor: "#181818",
  },
  NFTContainer: {
    marginBottom: 20,
    backgroundColor: "white",
    height: 417,
    borderRadius: 20,
    alignContent: "center",
    width: "80%",
    alignItems: "center",
  },
  NFTContainerGreen: {
    backgroundColor: "#0EDB88",
    height: "45%",
    width: "100%",
    position: "absolute",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  scrollContainer: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    padding: 40,
  },
  ImageNFT: {
    objectFit: "contain",
    width: "85%",
    height: "70%",
    marginTop: 20,
    borderRadius: 8,
  },
  NFTName: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "bold",
  },
  NFTDate: {
    marginTop: 5,
    fontSize: 15,
    fontWeight: "normal",
  },
});

export default Home;
