import axios from "axios";

const SUBDOMAIN = "https://ipfs.io";

export default class IPFService {
    //Elimina las credenciales almacenadas al cerrar sesión 
    uploadFile = (body) => {
        axios
            .post("https://api-biletly.onrender.com/ipfs/", body)
            .then((result) => {
                let foto = `${SUBDOMAIN}/ipfs/${result.data.cid["/"]}`;
                return foto;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getUri = (path) => {
        const uri = `${SUBDOMAIN}/ipfs/${path}`;
        return uri;
    };

    
} 