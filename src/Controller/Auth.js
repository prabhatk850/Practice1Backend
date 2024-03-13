const ApplicationModel=require('../Database/authschema')
const jwt =require("jsonwebtoken");
require("dotenv").config();

tokenGenrate=async(_id)=>{
    const token=await jwt.sign({_id},process.env.JWTSECRETKEY,{expiresIn:"24h"})
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
          res.status(404).send("User not found").then((result)=>{
              console.log("result",result)
          }).catch((err)=>{
              console.log("err",err)
          })
        }
       if(emailcheck && req.body.password == emailcheck.password){
              token = await tokenGenrate(emailcheck._id).then((result)=>{
                  res.send(result)
              })
              .catch((err)=>{
                  console.log("err",err)
              })

              // res.send("Login Successful").then((result)=>{
              //     console.log("error",result)
              // }).catch((err)=>{
              //     console.log("err",err)
              // })
          }
          else{
              res.send("Invalid password")
          }
  
}
}

const submitApplication=(req,res)=>{
    console.log(req.user)
    const {name,email,phoneno,dob,skills,experience,state}=req.body;
    if(!name||!email||!phoneno||!dob||!skills||!experience||!state){
        res.status(400).json({message:"All fields are mandatory"})
    }
    else{
        const ApplicationDetails=ApplicationModel(req.body)
       
        ApplicationDetails.save().then((result)=>{
            res.status(200).json({message:"Application submitted successfully"})
        }).catch((err)=>{
            res.status(400).json({message:"Error in submitting application",err})
        })}
}



module.exports={SignUp,SignIn,submitApplication}

