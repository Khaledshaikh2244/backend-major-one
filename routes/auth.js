const express = require ("express");
const router = express.Router();
// const authController = require ("../controller/user");
const authController = require ("../controller/user");


router.post("/register" , authController.registeUser); //defining route
router.post("/login" , authController.loginUser)

module.exports = router;