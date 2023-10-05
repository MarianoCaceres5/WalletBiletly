import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SignOutModal({handleConnection, setShowModal}) {
    return (
        <Pressable onPress={() => setShowModal(false)} style={styles.container}>
            <Pressable onPress={() => setShowModal(true)} style={styles.modal}>
                <Text style={styles.logOutTitle}>Log out</Text>
                <Text style={styles.logOutSubitle}>Are you sure you want to sign out?</Text>
                <View style={styles.buttonsContainer}>        
                    <Pressable onPress={() => setShowModal(false)}><Text style={styles.buttonGrey}>Cancel</Text></Pressable>
                    <TouchableOpacity onPress={() => handleConnection()}><Text style={styles.buttonGreen}>Sign Out</Text></TouchableOpacity>
                </View>
            </Pressable>
        </Pressable>
    );
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
    logOutTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold'
    },
    logOutSubitle: {
        marginTop: 5,
        fontSize: 15,
        color: 'rgba(255,255,255, 0.5)',   
        width: '90%'     
    },
    ImageNFT: {
        objectFit: "contain",
        width: "85%",
        height: "70%",
        marginTop: 20,
        borderRadius: 8,
    },
    modal: {
        backgroundColor: '#282828',
        width: '80%',
        height: 190,
        borderRadius: 10,
        paddingHorizontal: 30,
        paddingVertical: 25
    },
    buttonGreen: {
        color: '#0EDB88',
        fontWeight: 'bold',
    },
    buttonGrey: {
        color: 'rgba(255,255,255, 0.6)',
        fontWeight: 'normal',
    },
    buttonsContainer:{
        position: 'absolute',
        bottom: 25,
        right: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '50%'
    }
});
