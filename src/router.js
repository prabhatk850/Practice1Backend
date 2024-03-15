const express = require('express');
const { SignIn, SignUp, submitApplication, viewApplication, viewByAdmin } = require('./Controller/Auth');
const { authTokenCheck, isAdmin } = require('./MiddleWare/middleware');
const router=express.Router();



router.route("/signup").post(SignUp)
router.route("/login").post(SignIn)
router.route("/application").post(authTokenCheck, submitApplication)
router.route('/viewapplication').get(authTokenCheck, viewApplication)
router.route('/viewbyadmin').get(authTokenCheck,isAdmin, viewByAdmin)


module.exports=router;