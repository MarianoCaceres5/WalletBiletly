import React from 'react'
import { StyleSheet } from "react-native";
import GoBack from './components/GoBack';
import Header from './components/Header';
import TicketDetail from './components/TicketDetail';

export default function NFTDetail({ route }) {  
  let nft = route.params.nft.ticket;
  let navigation = route.params.navigation.navigation;

  return (
    <>
      <Header navigation={navigation} />
      <GoBack navigation={navigation}/>
      <TicketDetail nft={nft}/>
    </>
  )
}
