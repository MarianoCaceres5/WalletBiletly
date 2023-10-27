import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import arrowBack from "../../public/icons/arrow-back.png";
import { BarCodeScanner } from "expo-barcode-scanner";
import SwipeUpDown from 'react-native-swipe-up-down';
import qrScan from "../../public/icons/qrScan.png";
import { NFTContext } from "../../App";
import { AddressContext } from "../../App";
import QrModal from "../components/QrModal";
import axios from "axios";

export default function ScanQr() {

  const nft = useContext(NFTContext);
  const account = useContext(AddressContext);

  const [hasPermission, setHasPermission] = useState(false);
  const [scanData, setScanData] = useState();
  const [scanned, setScanned] = useState(false);
  const [modalTop, setModalTop] = useState('0%');
  const navigation = useNavigation();

  const mini = () => {
    return (
      <>
        <View style={styles.bottomRectangle}>
          <View style={styles.dragRectangleGreen}></View>
          <Text style={styles.text}> Scan the QR </Text>
        </View>
      </>
    )
  }

  const full = () => {
    return (
      <>
        <View style={styles.bottomRectangle}>
          <View style={styles.dragRectangleGrey}></View>
          <Text style={styles.text}> Scan the QR </Text>
          <Image source={qrScan} style={[styles.qr]} />
          <Text style={styles.textDetail}> Bring your camera closer and scan the code to access event </Text>
        </View>
      </>
    )
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log('ESCANEO')
    setScanned(true);
    setScanData(data); 
  }

  const handleCloseScan = async () => {
    setScanned(false);
    setScanData('');
  }

  const handleReturnHome = async () => {
    setScanned(false);
    setScanData('');
    // navigation.navigate('Home');
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted")
    })();
  }, []);

  if (!hasPermission) {
    return (
      <>
        <View style={styles.container}>
          <Text>Please grant camera access</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={arrowBack} style={styles.arrowBackIcon} />
        </Pressable>
        <BarCodeScanner
          style={[styles.camera]}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        />

        <SwipeUpDown
          itemMini={mini} // Pass props component when collapsed
          itemFull={full} // Pass props component when show full
          onShowMini={() => setModalTop('0%')}
          onShowFull={() => setModalTop('100%')}
          onMoveDown={() => setModalTop('0%')}
          onMoveUp={() => setModalTop('100%')}
          disablePressToShow={false} // Press item mini to show full
          style={{ backgroundColor: 'white', height: '100%', borderTopRightRadius: 20, borderTopLeftRadius: 20, marginTop: modalTop }} // style for swipe
        />
      </View>

      {((scanData !== undefined && scanData !== null && scanData !== '') ? (
        <QrModal handleCloseScan={handleCloseScan} data={scanData} handleReturnHome={handleReturnHome}/>
      ) : (
        <></>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  textDetail: {
    fontSize: 16,
    textAlign: "center",
    color: "gray",
    fontWeight: "medium",
    marginTop: 5,
    width: '80%'
  },
  qr: {
    width: 220,
    height: 220
  },
  camera: {
    height: '100%',
    width: '100%'
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black"
  },
  white: {
    color: "white",
  },
  backButton: {
    position: "absolute",
    top: '10%',
    left: 10,
    zIndex: 1,
  },
  arrowBackIcon: {
    width: 56,
    height: 56,
  },
  bottomRectangle: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "black",
    fontWeight: "medium",
    marginTop: 20,
    marginBottom: 30,
  },
  dragRectangleGreen: {
    width: 37,
    height: 4,
    backgroundColor: "#0EDB88",
    borderRadius: 20,
  },
  dragRectangleGrey: {
    width: 37,
    height: 4,
    backgroundColor: "grey",
    borderRadius: 20,
  },
});