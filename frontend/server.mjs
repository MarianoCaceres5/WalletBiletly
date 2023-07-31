import TicketService from "./src/services/TicketService.mjs";
import express from 'express';
import cors from 'cors';
import ticketRouter from "./src/controllers/TicketController.mjs";
import ipfsRouter from "./src/controllers/IPFSController.mjs";

const app = express();
const port = 912;

app.use(cors({
    origin:'*',
    // methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());
// app.use(express.static());

app.use("/api/Tickets", ticketRouter)
app.use("/api/IPFS", ipfsRouter)

app.listen(port, () => {
    console.log('API listening on port ' + port)
})
