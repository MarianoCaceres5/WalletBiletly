import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import arrowBack from "../public/icons/arrow-back.png";
import { BarCodeScanner } from "expo-barcode-scanner";
import SwipeUpDown from 'react-native-swipe-up-down';
import qrScan from "../public/icons/qrScan.png";

export default function ScanQr({route}) {

  const [hasPermission, setHasPermission] = useState(false); 
  const [scanData, setScanData] = useState();
  const navigation = useNavigation();
  const [modal, setModal] = useState('mini');


  const handleBarCodeScanned = ({type, data}) => {
    setScanData(data)
    console.log("Data: " + data)
  }

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

  let modalStyle = {
    backgroundColor: 'white',
    height: '50%'
  }

  useEffect(() => {
    (async() => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted")
    })();
  }, []);

  useEffect(() => {
    if(modal === 'full'){
      modalStyle.height = '50%'
    }else{
      modalStyle.height = '100%'
    }
  }, [modal]);

  if(!hasPermission){
    return (
      <>
        <View style={styles.container}>
          <Text>Please grant camera</Text>
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
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}          
        />

        <SwipeUpDown        
          swipeHeight={100} 
          itemMini={mini} // Pass props component when collapsed
          itemFull={full} // Pass props component when show full
          onShowMini={() => setModal('mini')}
          onShowFull={() => setModal('full')}
          onMoveDown={() => console.log('down')}
          onMoveUp={() => console.log('up')}
          disablePressToShow={false} // Press item mini to show full
          style={modalStyle} // style for swipe
        />        

      </View>      

    </>
  );
}

const styles = StyleSheet.create({
  textDetail: {
    fontSize: 15,
    textAlign: "center",
    color: "gray",
    fontWeight: "Medium",
    marginTop: 30,
    width: '80%'
  },
  qr: {
    textAlign: 'center',
    width:207,
    height:207
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
    top: 100,
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
  text:{
    fontSize: 20,
    textAlign: "center",
    color: "black",
    fontWeight: "Medium",
    marginTop: 30
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