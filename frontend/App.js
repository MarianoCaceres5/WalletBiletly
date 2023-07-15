import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {WALLET_CONNECT_PROJECT_ID} from "@env"
import NFTAbi from "./src/contracts/NFT.json";
import NFTAddress from "./src/contracts/NFT-address.json";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "@ethersproject/shims";
import { ethers } from "ethers";
import Onboarding from "./screens/Onboarding.js";
import Connection from "./screens/Connection.js";
import Rutas from "./screens/Rutas";
// import NFTDetail from './screens/NFTDetail';
import "./expo-crypto-shim";
import {
  WalletConnectModal,
  useWalletConnectModal,
} from "@walletconnect/modal-react-native";

const Stack = createNativeStackNavigator();

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
        chains: ["eip155:1"],
        events: ["chainChanged", "accountsChanged"],
        rpcMap: {},
      },
    },
  };

  const { isConnected, provider, open, address } = useWalletConnectModal();
  const [loading, setLoading] = useState(true);
  const [nft, setNFT] = useState({});

  let options = {
    route: ''
  }

  const handleConnection = async (route = 'ConnectWallet') => {
    console.log(isConnected)
    if (!isConnected) {
      options.route = route;
      return open(options);
    }else{
      return provider?.disconnect();
    }
    
  };

  // useEffect(() => {
  //   if (isConnected) {
  //     return provider?.disconnect();
  //   }
  // }, []);

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

  if (!isConnected || address === null) {
    return (
      <>
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
              initialParams={{ onWeb3Handler: handleConnection }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <WalletConnectModal
          projectId={projectId}
          providerMetadata={providerMetadata}
          sessionParams={sessionParams}
          themeMode="dark"
        />
      </>
    );
  }
  
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
          initialParams={{ nft: nft, account: address, handleConnection: handleConnection }}
        />
        {/* <Stack.Screen name="NFTDetail" component={NFTDetail} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 100,
    backgroundColor: "blue",
    textAlign: "center",
    marginTop: 500,
    marginLeft: 200,
  },
  white: {
    color: "white",
  },
  black: {
    color: "black",
  },
});

export default App;
