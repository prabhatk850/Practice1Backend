const jwt = require("jsonwebtoken");
const authschema = require("../Database/authschema");
require("dotenv").config();

const authTokenCheck = async(req,res,next)=> {
    
    let token = req.header("Authorization").split(" ")[1]
    if(!token){
        res.status(401).send("Token not found")
    }
    jwt.verify(token,process.env.JWTSECRETKEY,(err,payload)=>{
        if(err){
            res.status(401).send(err)
        }
        else{
            requser = async ()=>{
                
                const{_id} =payload
                req.user= await authschema.findById(_id)
                next()
                
            }
            requser()
        }
    
    })
}

const isAdmin=(req,res,next)=>{
    if(req.user.isAdmin===true){
        next()
    }
    else{
        res.status(401).send("Access Denied")
    }
}

module.exports = {authTokenCheck,isAdmin}