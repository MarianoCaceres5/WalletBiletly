import AsyncStorage from "@react-native-async-storage/async-storage";

const ADDRESS_KEY = 'LOGIN_address';
const NFT_KEY = 'LOGIN_nft';

export default class AccountService{ 

    automaticlogin = async() => { 
        //Obtiene las credenciales almacenadas e intenta loguearse.  
        try {
            let address = await AsyncStorage.getItem(ADDRESS_KEY);
            let nft = await AsyncStorage.getItem(NFT_KEY);
            let isValid;
            
            if(address != undefined && address != null && nft != undefined && nft != null){
                isValid = true;
            }else{
                isValid = false;
            }             
            return isValid; 

        } catch(e){
            return false;
        }
    };

    //Elimina las credenciales almacenadas al cerrar sesión 
    eliminarCredenciales = async() => { 
        try{
            await AsyncStorage.removeItem(ADDRESS_KEY); 
            await AsyncStorage.removeItem(NFT_KEY); 
        }catch(e){
            console.log(e);
        }
    }; 

    almacenarCredenciales = async(address, nft) => { 
        //Almacena las credenciales en el asyncStorage
        //(para leerlas al iniciar la próxima vez) 
        try {    
            await AsyncStorage.setItem(ADDRESS_KEY, address);  
            await AsyncStorage.setItem(NFT_KEY, nft); 
        } catch(e) {    
            console.log(e);
        }
    }; 

    obtenerCredenciales = async() => { 
        let storedAddress = await AsyncStorage.getItem(ADDRESS_KEY);
        let storedNFT= await AsyncStorage.getItem(NFT_KEY);
        const returnValue = {'address':storedAddress, 'nft':storedNFT}; 
        return returnValue; 
    }; 
} 