import TicketService from "../services/TicketService.mjs";
import EventoxIdEntrada from "../services/EventoxTicketService.mjs";
import TicketxNFTService from "../services/TicketxNFTService.mjs";
import TicketxUsuarioService from "../services/TicketxUsuario.mjs";
import { Router } from "express";

let ticketService = new TicketService();
let eventoXEntradaService = new EventoxIdEntrada();
let ticketxNFTService = new TicketxNFTService();
let ticketxUsuarioService = new TicketxUsuarioService();

const ticketRouter = new Router();

ticketRouter.get('', async function (req, res) {
    try {
        let listaEntradas = await ticketService.getEntradas();
        if(listaEntradas != null){
            res.status(200).send(listaEntradas);
        }else{
            res.status(404).send('Algo falló');   
        }
    } catch (error) {
        res.send(error)
    }
})

ticketRouter.get('/:id', async function (req, res) {
    try {
        let parametros = req.params;
        let entrada = await ticketService.getEntradaxId(parametros.id);
        if(entrada != null){
            res.status(200).send(entrada);
        }else{
            res.status(404).send('Algo falló');   
        }
    } catch (error) {
        res.send(error)
    }
})

ticketRouter.get('/EventoxEntrada/:id', async function (req, res) {
    try {
        let parametros = req.params;
        let evento = await eventoXEntradaService.getEventoxIdEntrada(parametros.id);
        if(evento != null){
            res.status(200).send(evento);
        }else{
            res.status(404).send('Algo falló');   
        }
    } catch (error) {
        res.send(error)
    }
})

ticketRouter.get('/TicketxUsuario/:address', async function (req, res) {
    try { 
        let parametros = req.params;
        let entradas = await ticketxUsuarioService.getEntradasxUsuario(parametros.address);
        if(entradas != null){
            res.status(200).send(entradas);
        }else{
            res.status(404).send('Algo falló');   
        }
    } catch (error) {
        console.log(error)
    }
})

ticketRouter.put('/:id', async function (req, res) {
    try {  
        let parametros = req.params
        let result = await ticketService.updateEntrada(parametros.id);
        if(result == 0){
            res.status(404).send('Algo falló');               
        }else{
            res.status(200).send(result); 
        }

    } catch (error) {
        res.send("error")
    }

})

ticketRouter.post('/TicketxUsuario/', async function (req, res) {
    try { 
        let address = (req.body.address == undefined ? "" : req.body.address);
        let idEntrada = (req.body.idEntrada == undefined ? -1 : req.body.idEntrada);
        let resultado = await ticketxUsuarioService.createEntradaxUsuario(address, idEntrada);
        if(resultado == 0){
            res.status(404).send('Algo falló');               
        }else{
            res.status(200).send(resultado); 
        }
    } catch (error) {
        console.log(error)
    }
})

ticketRouter.post('/NFT/', async function (req, res) {
    try {
        let tokenCount = (req.body.tokenCount == undefined ? -1 : req.body.tokenCount);
        let idEntrada = (req.body.idEntrada == undefined ? -1 : req.body.idEntrada);
        let resultado = await ticketxNFTService.createEntradaxNFT(tokenCount, idEntrada);
        if(resultado == 0){
            res.status(404).send('Algo falló');               
        }else{
            res.status(200).send(resultado); 
        }

    } catch (error) {
        console.log(error)
    }
})

export default ticketRouter;