const mongoose=require('mongoose');
const applicationSchema=new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phoneno:{
        type:String
    },
    password:{
        type:String,
        require:true
    },
    dob:{
        type:String
    },
    skills:[{
        type:String
    }],
    experience:{
        type:String
    },
    state:{
        type:String  
    },
    city:{
        type:String
    },
    readytolocate:{
        type:Boolean
    },
    comment:{
        type:String,
        default:""
    },
    createdat:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.model('Applications',applicationSchema)