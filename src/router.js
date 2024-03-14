const express = require('express');
const { SignIn, SignUp, submitApplication, viewApplication } = require('./Controller/Auth');
const { authTokenCheck } = require('./MiddleWare/middleware');
const router=express.Router();



router.route("/signup").post(SignUp)
router.route("/login").post(SignIn)
router.route("/application").post(authTokenCheck, submitApplication)
router.route('/viewapplication').get(authTokenCheck, viewApplication)


module.exports=router;