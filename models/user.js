import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:string,
        required:true,
        unique:true
    },
    password:{
        type:string, 
        required:true,
        unique:true,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
    images:[{
        type:String
    }]

}
, {
    timestamps:true
}
)


const user = mongoose.model('User',userSchema)
export default user