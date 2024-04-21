import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Registration from './models/register'
import dotenv from "dotenv";
dotenv.config();

import clientRouter from "./routes/register";
console.log(clientRouter);



const server = express();
const port = 8080;
server.use(cors());
server.use(Registration);
server.use(bodyParser.json());

server.use("/client", clientRouter);
server.listen(port, () => {
  console.log(`Successfully running on port ${port}`);
});
