const express = require("express");

const router = express.Router();

const userController = require("../controller/userController");

//login user
// route /users/login
router.post("/login", userController.handleLogin);

//create user
// route /users/register
router.post("/register", userController.newUser);

//read user
// route /users
router.get("/", userController.getUsers);



module.exports = router;
