const mongoose=require('mongoose')
require('dotenv').config();
const url=process.env.CONNECTION_URL

mongoose.connect(url).then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log("Error connecting DB",err)
})