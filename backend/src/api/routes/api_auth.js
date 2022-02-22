const express = require('express');
const router = express.Router();

const UserController = require('../controllers/User/UserController');


//Check if jwtPrivateKey is set
if(!process.env.jwtPrivateKey){
    console.log("Please set JWT Private Key...");
    process.exit(1);
}

// Login API
router.post("/signup",UserController.create);
router.post("/signin",UserController.login);


module.exports=router;