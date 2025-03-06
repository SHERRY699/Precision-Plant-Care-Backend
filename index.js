import { configDotenv } from "dotenv";
import express from "express";
import ConnectDb from "./db/db.js";

const app = express()

// Middlewares
app.use(express.json())


//Function Calls 
configDotenv()

//Db function
ConnectDb()

app.listen(8000,()=>{
    console.log('Server Is Started')
})