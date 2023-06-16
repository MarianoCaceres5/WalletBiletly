import React from "react";
import { StyleSheet } from "react-native";
import NFTAbi from "./src/contracts/NFT.json";
import NFTAddress from "./src/contracts/NFT-address.json";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ethers } from "ethers";
import ScanQr from "./screens/ScanQr";
import Onboarding from "./screens/Onboarding.js";
import Connection from "./screens/Connection.js";
import Home from "./screens/Home";
import Rutas from "./screens/Rutas";

const Stack = createNativeStackNavigator();

function App() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState("");
  const [nft, setNFT] = useState({});

  async function web3Handler() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
    console.log(account);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async function (accounts) {
      setAccount(accounts[0]);
      await web3Handler();
    });

    loadContracts(signer);
  }

  const loadContracts = async (signer) => {
    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    setNFT(nft);
    setLoading(false);
  };

  useEffect(() => {
    // console.log(account);
  }, [loading]);

  if (loading === true) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false,
            header: () => null,
            contentStyle: { backgroundColor: "black" },
          }}
        >
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen
            name="Connection"
            component={Connection}
            initialParams={{ onWeb3Handler: web3Handler }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            header: () => null,
            contentStyle: { backgroundColor: "black" },
          }}
        >
          <Stack.Screen
            name="Home"
            component={Rutas}
            initialParams={{ nft: nft, account: account }}
          />
          {/* <Stack.Screen
            name="Settings"
            component={Rutas}
            initialParams={{ nft: nft, account: account }}
          />
          <Stack.Screen
            name="ScanQr"
            component={ScanQr}
            initialParams={{ nft: nft, account: account }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    borderRadius: 20,
    paddingTop: 15,
  },
});

export default App;
