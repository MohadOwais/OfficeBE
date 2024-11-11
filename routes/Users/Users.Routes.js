const express = require("express");
const UsersController = require("../../controller/user");

const router = express.Router();

router.post("/add-user", UsersController.AddUsers);
router.get("/get-user", UsersController.getUsers);
router.delete("/delete-user/:userId", UsersController.DeleteUsers);
router.put("/edit-user/:userId", UsersController.EditUser);

module.exports = router;
