import mongoose from "mongoose";

export  default async function ConnectDb(){
    try {
        const connect = await mongoose.connect(`${process.env.MONGODB_URL}`)
        console.log('DB Connected')
        return connect
    } catch (error) {
        console.log(error)
    }
}