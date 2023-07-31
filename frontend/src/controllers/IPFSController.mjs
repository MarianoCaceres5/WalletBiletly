import { Router } from "express";
import { client }  from '../config/Infura.mjs';

const ipfsRouter = new Router();

ipfsRouter.post('', async function (req, res) {
    try {         
        let result = await client.add(req.body.file);
        console.log(result)
        res.status(200).send(result);              
    } catch (error) {
        console.log(error)
        res.status(404).send('Algo falló'); 
    }
})

export default ipfsRouter;