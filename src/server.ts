import express from "express";
import router from "./router";
import db from "./config/db";

async function connectDB(){
    try{
        await db.authenticate()
        db.sync()
        console.log('Successfully connected to database')
    }catch(error){
        console.log(error)
        console.log('Error connecting to database...')
    }
}
connectDB()


const server = express();

server.use('/api/products', router)


export default server