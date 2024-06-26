const ApplicationModel=require('../Database/authschema')
const jwt =require("jsonwebtoken");
require("dotenv").config()
const authschema = require("../Database/authschema");
// const { application } = require('express');

tokenGenrate=async(_id)=>{
    const token= await jwt.sign({_id},process.env.JWTSECRETKEY,{expiresIn:"24h"})
return token;
}
const SignUp=async(req,res)=>{
    if(!req.body.name || !req.body.email || !req.body.password){
        res.status(400).json({message:"All fields are mandatory"})
    }
    const ApplicationDetails=ApplicationModel(req.body)
 
    let alreadyUserCheck= await ApplicationModel.findOne({
        email:req.body.email,
    })
    if(alreadyUserCheck){
        res.status(400).json({message:"User already exists"})
    }
    else{
        ApplicationDetails.save().then((result)=>{
            res.status(200).json({message:"Application submitted successfully"})
        }).catch((err)=>{
            res.status(400).json({message:"Error in submitting application",err})
        })
    }
}



const SignIn= async (req,res)=>{
    if(!req.body.email){
      res.status(400).send("This field can't be empty")
    }else{
      let emailcheck = await ApplicationModel.findOne({
          email: req.body.email
        });
        if(!emailcheck){
          return res.status(404).send("User not found")
        }
       if(emailcheck && req.body.password == emailcheck.password){
              token = await tokenGenrate(emailcheck._id).then((result)=>{
                    let isAdmin=false;
                    authschema.findOne({email:req.body.email}).then((rest)=>{    
                    isAdmin=rest.isAdmin
                    token = result
                    res.status(200).json({token,isAdmin})
                    })  
              })
              .catch((err)=>{
                  console.log("err",err)
              })
          }
          else{
              res.status(401).send("Invalid password")
          }
  
}
}

const viewApplication=(req,res)=>{
    ApplicationModel.findById(req.user._id).then((result)=>{
        
        res.send(result)
    }).catch((error)=>{
        console.log("error",error)
    })
} 

const viewByAdmin=(req,res)=>{
    ApplicationModel.find().then((result)=>{
        console.log("first",result)
        res.status(200).json(result)
    }).catch((error)=>{
        res.status(400).json({message:"Error in fetching data",error})
    })    
}

const submitApplication= (req,res)=>{
    const applicationDetails = JSON.parse(req.body.applicationDetails);
    const {phoneno}=applicationDetails;
    if(!phoneno){
        res.status(400).json({message:"phoneno. is mandatory"})
    }
    else{
        const data=applicationDetails
        data.resume=req.resumelink
        data.coverletter=req.coverlink

        console.log("data",data)

        ApplicationModel.findOneAndUpdate(req.user._id,data).then((result)=>{
             console.log("sumitted",result)
            res.status(200).json({message:"Application submitted successfully"})

        }).catch((err)=>{
            res.status(400).json({message:"Error in submitting application",err})
        })}
}





module.exports={SignUp,SignIn,submitApplication,viewApplication,viewByAdmin}

