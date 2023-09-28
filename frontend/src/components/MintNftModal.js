import { View, Text, Pressable, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React from 'react'
import logo from '../../public/logo.png'

export default function MintNftModal({setShowMintModal, mintThenList, mintObj}) {
    const {result, nftTicket, evento} = mintObj;
    console.log(nftTicket)
    if(nftTicket != undefined){
        return (
            <Pressable style={styles.container}>
                <Pressable style={styles.modal}>
                    <Image style={styles.image} source={{uri: nftTicket.image}} />
                    <Text style={styles.nftName}>{nftTicket.name}</Text>
                    <View style={styles.buttonsContainer}>
                        <Pressable onPress={() => setShowMintModal(false)} style={styles.cancelButton}><Text style={styles.textGray}>Dismiss</Text></Pressable>
                        <TouchableOpacity onPress={() => mintThenList(result, nftTicket, evento)} style={styles.mintButton}><Text style={styles.textWhite}>Mint NFT</Text></TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        )
    }else{
        return (
            <Pressable style={styles.container}>
                <Pressable style={styles.modal}>
                    <ActivityIndicator style={styles.loading} size="large" color="#0EDB88" />
                </Pressable>
            </Pressable>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '90%',
        backgroundColor: 'rgba(0,0,0, 0.6)'
    },
    nftName: {
        color: '#fff',
        fontSize: 22,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center'
    },
    logOutSubitle: {
        marginTop: 5,
        fontSize: 15,
        color: 'rgba(255,255,255, 0.5)',
        width: '90%'
    },
    image: {
        objectFit: "contain",
        width: "75%",
        height: "70%",
        marginBottom: 20,
        borderRadius: 8,
    },
    modal: {
        backgroundColor: '#282828',
        width: '80%',
        height: 500,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 45,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray'
    },
    
    buttonsContainer: {
        marginTop: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    textWhite: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    textGray: {
        color: 'gray',
        fontWeight: 'normal',
    },
    cancelButton: {
        width: '50%',
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mintButton: {
        borderRadius: 4,
        width: '50%',
        height: 45,
        backgroundColor: '#0EDB88',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loading: {
        marginTop: '100%'
    }
});
