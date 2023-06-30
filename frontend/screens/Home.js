import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Encabezado from "./components/Encabezado";
import FiltersSection from "./components/FiltersSection";
import axios from "axios";
import client, { subdomain } from "../config/Infura.js";


const Home = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [nfts, setNFTs] = useState([]);

  const loadContract = async () => {
    axios
      .get(
        "http://localhost:912/api/Tickets/TicketxUsuario/" +
          route.params?.account
      )
      .then((result) => {
        let tickets = result.data;
        tickets.map(async (ticket) => {
          if (!ticket.tieneNFT) {
            let foto = await uploadToIPFS(ticket);
            console.log(foto);
            axios
              .get(
                "http://localhost:912/api/Tickets/EventoxEntrada/" +
                  ticket.idEntrada
              )
              .then((result) => {
                let evento = result.data;
                let nftTicket = {
                  id: ticket.idEntrada,
                  address: route.params?.account,
                  name: evento.nombre,
                  date: evento.fecha,
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
                createNFT(nftTicket, evento);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });

    loadHome()
  };

  const uploadToIPFS = async (ticket) => {
    let file = ticket.imagen;
    if (typeof file != undefined && typeof file != null) {
      try {
        const result = await client.add(file);
        console.log(result)
        return `${subdomain}/ipfs/${result.path}`;
      } catch (error) {
        console.log("ipfs image upload error: ", error);
      }
    }
  };

  const createNFT = async (nftTicket, evento) => {
    try {
      const result = await client.add(JSON.stringify({ nftTicket }));
      mintThenList(result, nftTicket, evento);
    } catch (error) {
      console.log("ipfs uri upload error: ", error);
    }
  };

  const mintThenList = async (result, nftTicket, evento) => {
    const uri = `${subdomain}/ipfs/${result.path}`;    
    try{
      await route.params?.nft.mint(
        route.params?.account,
        uri,
        nftTicket.description,
        evento
      );
    }catch{

    }    

    axios
      .put("http://localhost:912/api/Tickets/" + nftTicket.id)
      .then((result) => {
        //console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  
    // let body = {
    //   "tokenCount": (tokenCount.toNumber()),
    //   "idEntrada": nftTicket.id,
    // }
    // axios    
    // .post("http://localhost:912/api/Tickets/NFT/", body)
    // .then((result) => {    
    //     // console.log(result);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });
    
  };

  const loadHome = async () => {
    const ticketCount = await route.params?.nft.tokenCount();
    let tickets = [];
    for (let i = 1; i <= ticketCount; i++) {
      const ticket = await route.params?.nft.entradas(i);
      const uri = await route.params?.nft.tokenURI(i);
      const response = await fetch(uri);
      const metadata = await response.json();
      console.log(await fetch(metadata.nftTicket.image))
      tickets.push({
        id: ticket.idEntrada,
        name: metadata.nftTicket.name,
        number: metadata.nftTicket.number,
        description: metadata.nftTicket.description,
        image: metadata.nftTicket.image,
      });
    }
    setNFTs(tickets);
  }

  useEffect(() => {
    loadContract();
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [nfts]);

  if (loading)
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading...</Text>
      </View>
    );
  return (
    <>
      <Encabezado />
      <FiltersSection />

      <View style={styles.container2}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          vertical={true}
        >
          {nfts.map((ticket, i) => (
            <TouchableOpacity
              key={i}
              style={styles.NFTContainer}
              onPress={() => navigation.navigate("NFTDetail", "Emilia")}
            >
              <Image
                source={{ uri: ticket.image }}
                style={styles.ImageNFT}
              ></Image>
              <Text style={[styles.NFTName, styles.fuente]}>{ticket.name}</Text>
              <Text style={[styles.NFTDate, styles.fuente]}>
                {ticket.description}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  arrow: {
    width: 35,
    height: 35,
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
    backgroundColor: "#0EDB88",
    height: 355,
    borderRadius: 20,
    alignContent: "center",
    width: "75%",
    alignItems: "center",
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
    borderRadius: 10,
  },
  NFTName: {
    marginTop: 10,
    fontSize: 20,
  },
  NFTDate: {
    marginTop: 10,
    fontSize: 15,
  },
  fuente: {
    fontFamily: "Inter",
  },
});
export default Home;
