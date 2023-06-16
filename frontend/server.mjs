import TicketService from "./src/services/TicketService.mjs";
import express from 'express';
import cors from 'cors';
import ticketRouter from "./src/controllers/TicketController.mjs";

const app = express();
const port = 912;

app.use(cors())
app.use(express.json());
app.use(express.static('public'));

let svc = new TicketService();

// app.use(tiempoTranscurrido);
// app.use(checkApiKey);
// app.use(headerResponse);
app.use("/api/Tickets", ticketRouter)

app.listen(port, () => {
    console.log('API listening on port ' + port)
})
