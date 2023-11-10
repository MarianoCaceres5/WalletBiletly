
import axios from "axios";


export default class BiletlyService {
    //Elimina las credenciales almacenadas al cerrar sesión 
    getTicketsXUsuario = async (account) => {
        await axios
            .get(
                "https://api-biletly.onrender.com/tickets/TicketxUsuario/" +
                account
            )
            .then((result) => {
                console.log(result.data)
                return result.data;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getEvento = async (idEntrada) => {
        await axios
            .get(
                "https://api-biletly.onrender.com/tickets/EventoxEntrada/" +
                ticket.idEntrada
            )
            .then((result) => {
                let evento = result.data;
                return evento;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    updateTicket = async (idEntrada) => {
        await axios
            .put("https://api-biletly.onrender.com/tickets/" + idEntrada)
            .then((result) => {
                //console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };


} 