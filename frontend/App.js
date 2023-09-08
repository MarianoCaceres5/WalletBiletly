import React, { useState, useEffect, createContext } from "react";
import { StyleSheet } from "react-native";
import { WALLET_CONNECT_PROJECT_ID } from "@env";
import NFTAbi from "./src/contracts/NFT.json";
import NFTAddress from "./src/contracts/NFT-address.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "@ethersproject/shims";
import { ethers } from "ethers";
import Onboarding from "./screens/Onboarding.js";
import Connection from "./screens/Connection.js";
// import NFTDetail from './screens/NFTDetail';
import "./expo-crypto-shim";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";
import Navbar from "./screens/components/Navbar";
import NFTDetail from "./screens/NFTDetail";
import axios from "axios";

const Stack = createNativeStackNavigator();

export const NFTContext = createContext();
export const AddressContext = createContext();
export const ConnectionContext = createContext();

function App() {
  const projectId = WALLET_CONNECT_PROJECT_ID;
  const providerMetadata = {
    name: "test",
    description: "test",
    url: "https://walletconnect.com/",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
    redirect: {
      native: "test://",
    },
  };

  const sessionParams = {
    namespaces: {
      eip155: {
        methods: [
          "eth_sendTransaction",
          "eth_signTransaction",
          "eth_sign",
          "personal_sign",
          "eth_signTypedData",
        ],
        chains: ["eip155:80001"],
        events: ["chainChanged", "accountsChanged"],
        rpcMap: {},
      },
    },
  };

  const { isConnected, provider, open, address } = useWalletConnectModal();
  const [loading, setLoading] = useState(true);
  const [nft, setNFT] = useState({});

  const handleConnection = async (route = "ConnectWallet") => {
    if (!isConnected) {
      let options = {
        route: "",
      };
      options.route = route;
      return open(options);
    } else {
      return provider?.disconnect();
    }
  };

  useEffect(() => {
    if (address !== null && address !== undefined && provider !== undefined) {
      const newProvider = new ethers.providers.Web3Provider(provider);
      const signer = newProvider.getSigner();
      const nftContract = new ethers.Contract(
        NFTAddress.address,
        NFTAbi.abi,
        signer
      );
      setNFT(nftContract);
      setLoading(false);
    }
  }, [isConnected]);

  if (!isConnected || provider === null || provider === undefined || loading) {
    // if(false){
    return (
      <>
        <ConnectionContext.Provider value={handleConnection}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Onboarding"
              screenOptions={{
                orientation: "portrait",
                headerShown: false,
                header: () => null,
                contentStyle: { backgroundColor: "black" },
              }}
            >
              <Stack.Screen name="Onboarding" component={Onboarding} />
              <Stack.Screen name="Connection" component={Connection} />
            </Stack.Navigator>
          </NavigationContainer>
          <WalletConnectModal
            projectId={projectId}
            providerMetadata={providerMetadata}
            sessionParams={sessionParams}
            themeMode="dark"
          />
        </ConnectionContext.Provider>
      </>
    );
  }

  return (
    <ConnectionContext.Provider value={handleConnection}>
      <NFTContext.Provider value={nft}>
        <AddressContext.Provider value={address}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Navbar"
              screenOptions={{
                orientation: "portrait",
                headerShown: false,
                header: () => null,
                contentStyle: { backgroundColor: "black" },
                animation: "none",
              }}
            >
              <Stack.Screen name="Navbar" component={Navbar} />
              <Stack.Screen name="NFTDetail" component={NFTDetail} />
            </Stack.Navigator>
          </NavigationContainer>
        </AddressContext.Provider>
      </NFTContext.Provider>
    </ConnectionContext.Provider>
  );
}

export default App;
