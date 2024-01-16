// require('dotenv').config({path: './env'})
import dotenv from 'dotenv'
import {connectDatabase} from "./db/db.js";
import  app  from './app.js';

//config dotenv file

connectDatabase() ;
dotenv.config({
    path: './.env' //.env pass is good
})

const PORT = process.env.PORT || 8000






app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`)
}
)