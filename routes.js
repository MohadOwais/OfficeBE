const express = require("express");
const UsersRoutes = require("./routes/Users/Users.Routes");
const EmployeeRoutes = require("./routes/Users/Employee/Employee.Routes");
const Login = require("./routes/Users/Login.Routes");

const router = express.Router();

// Use UsersRoutes under the /user path
router.use("/user", UsersRoutes);
router.use("/employee", EmployeeRoutes);
router.use("/Login", Login);

module.exports = router;
