import React from 'react'
import { ScrollView, StyleSheet, View } from "react-native";
import GoBack from '../components/GoBack';
import Header from '../components/Header';
import TicketDetail from '../components/TicketDetail';
import TicketSlider from '../components/TicketSlider';

export default function NFTDetail({ route }) {  
  let nft = route.params.nft.ticket;
  let navigation = route.params.navigation.navigation;
  let tickets = route.params.tickets.tickets;

  return (
    <>
        <Header navigation={navigation} />
        <ScrollView vertical={true}>
          <GoBack navigation={navigation}/>
          <TicketDetail nft={nft}/>
          <TicketSlider navigation={navigation} tickets={tickets}/>
        </ScrollView>
    </>
  )
}

