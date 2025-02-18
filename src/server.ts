import express from "express";
import config from "../config.js";

import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import orderRoutes from './routes/orders.js';

import connectDB from "./lib/db.js";
const server = express();

server.use(express.json());

server.use('/', userRoutes);
server.use('/item', productRoutes);
server.use('/order', orderRoutes);

connectDB();
server.listen( config.server.port, ()=>{
    console.log('Server started on Port:', config.server.port);
})