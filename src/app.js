const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
require('./Database/connection');
const allroutes=require('./router');
require('dotenv').config();

const app=express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());
const port=process.env.PORT||3000;

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.use("/api",allroutes);

const start=()=>{
    app.listen(port,()=>{
        console.log(`Example app listning at ${port}`)
    })
}

start();