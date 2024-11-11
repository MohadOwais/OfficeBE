const express = require("express");
const LoginController = require("../../controller/LogIn");

const router = express.Router();

router.post("/login", LoginController.Login);

module.exports = router;
