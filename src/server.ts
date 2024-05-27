import express from "express";
import colors from 'colors'
import cors, { CorsOptions} from 'cors'
import swaggerUi from 'swagger-ui-express'

import db from "./config/db";
import router from "./router";
import swaggerSpec from "./config/swagger";

async function connectDB(){
    try{
        await db.authenticate()
        db.sync()
        //console.log(colors.magenta('Successfully connected to db'))
    }catch(error){
        console.log(error)
        console.log(colors.red.bold('Error connecting to db'))
    }
}
connectDB()

const server = express();

const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}

server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())
server.use('/api/products', router)

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server