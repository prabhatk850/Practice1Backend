const express = require('express');
const { SignIn, SignUp, submitApplication, viewApplication, viewByAdmin } = require('./Controller/Auth');
const { authTokenCheck, isAdmin } = require('./MiddleWare/middleware');
const router=express.Router();
const {uploadFile} = require('./Controller/fileupload')
const multer = require('multer');``


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Uploads/');
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + file.originalname );
    }
});

const upload = multer({ storage: storage })


router.route("/signup").post(SignUp)
router.route("/login").post(SignIn)
// router.route("/application").post(authTokenCheck, submitApplication)
router.route('/application').post(upload.fields([{name:"resume"},{name:"coverletter"}]),authTokenCheck, uploadFile, submitApplication)
router.route('/viewapplication').get(authTokenCheck, viewApplication)
router.route('/viewbyadmin').get(authTokenCheck,isAdmin, viewByAdmin)


module.exports=router; 