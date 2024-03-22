
const {S3Client,PutObjectCommand} = require('@aws-sdk/client-s3');
require('dotenv').config();
const fs= require('fs');
const {ACCESS_KEY_ID,SECRET_ACCESS_KEY,BUCKET_NAME} = process.env;


const uploadFile = async (req,res,next) => {

    
    const s3Client = new S3Client({
        region:"ap-south-1",
        credentials:{
            accessKeyId:ACCESS_KEY_ID,
            secretAccessKey:SECRET_ACCESS_KEY
        }
    });
    const resume = req.files["resume"][0];
    const coverletter = req.files["coverletter"][0];
    const resumekey = "jobapplication/"+req.user.email+"/"+resume.filename;
    const coverkey = "jobapplication/"+req.user.email+"/"+coverletter.filename;

    const command = new PutObjectCommand({
        Bucket:BUCKET_NAME,
        Key:resumekey,
        Body:fs.createReadStream(resume.path),
        ContentType:resume.mimetype
    });

    const command1 = new PutObjectCommand({
        Bucket:BUCKET_NAME,
        Key:coverkey,
        Body:fs.createReadStream(coverletter.path),
        ContentType:coverletter.mimetype
    })

      const data = s3Client.send(command).then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err)
    })

    const data1 = s3Client.send(command1).then((data)=>{
        console.log(data);
        const coverlink="https://d291i16drwl00c.cloudfront.net/"+coverkey;
        const resumelink="https://d291i16drwl00c.cloudfront.net/"+resumekey;
        req.coverlink=coverlink;
        req.resumelink=resumelink;
        next();
        
    }).catch((err)=>{
        console.log(err)
    })


    

//     await upload.then((err, data) => {
//       console.log(err);
//       alert("File uploaded successfully.");
//     });
//   };

}
module.exports = {uploadFile}