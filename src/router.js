const express = require('express');
const { SignIn, SignUp, submitApplication } = require('./Controller/Auth');
const { authTokenCheck } = require('./MiddleWare/middleware');
const router=express.Router();



router.route("/signup").post(SignUp)
router.route("/login").post(SignIn)
router.route("/application").post(authTokenCheck, submitApplication)


module.exports=router;