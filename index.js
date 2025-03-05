import express from "express";

const app = express()

app.get('/',(req,res)=>{
    res.status(200,{
        message:'Hello Jee'
    })

})

app.listen(8000,()=>{
    console.log('Server Is Started')
})