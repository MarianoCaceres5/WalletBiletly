import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import arrowBack from "../public/icons/arrow-back.png";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function ScanQr({route}) {

  const [hasPermission, setHasPermission] = useState(false); 
  const [scanData, setScanData] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    (async() => {
      const {status} = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted")
    })();
  }, []);

  if(!hasPermission){
    return (
      <>
        <View style={styles.container}>
          <Text>Please grant camera</Text>
        </View>       
      </>
    );
  }

  const handleBarCodeScanned = ({type, data}) => {
    setScanData(data)
    console.log("Data: " + data)
  }

  return (
    <>
      <View style={styles.container}>
        <BarCodeScanner
          style={StyleSheet.absoluteFillObject} 
          onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}          
        />
        {scanData && <Button title="Scan Again" onPress={() => setScanData(undefined)}></Button>}
      </View>


      {/* <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image source={arrowBack} style={styles.arrowBackIcon} />
        </Pressable>
      </View> */}

      {/* <View style={styles.bottomRectangle}> 
        <View style={styles.dragRectangle}></View>
        <Text style={styles.text}> Scan the QR </Text>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282828"
  },
  white: {
    color: "white",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  arrowBackIcon: {
    width: 56,
    height: 56,
  },
  bottomRectangle: {
    width: "100%",
    height: 90,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    display: "flex",
    alignItems: "center",
  },
  text:{
    fontSize: 20,
    textAlign: "center",
    color: "black",
    fontWeight: "Medium",
    marginTop: 15
  },
  dragRectangle: {
    width: 37,
    height: 4,
    backgroundColor: "#0EDB88",
    borderRadius: 20,
    marginTop: 15
  },
});