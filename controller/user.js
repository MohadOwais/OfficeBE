const Users = require("../models/user");
exports.AddUsers = (req, res, next) => {
  const { name, email, password, userType } = req.body;
  const newUser = new Users({
    name,
    email,
    password,
    userType,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Users added successfully",
        User: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Failed to add Users",
        error: err,
      });
    });
};

exports.getUsers = (req, res, next) => {
  Users.find()
    .then((result) => {
      res.status(201).json({
        message: "user fetched successfully",
        user: result,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        message: "Failed to fetch user",
        error: err,
      });
    });
};

exports.DeleteUsers = (req, res, next) => {
  const userId = req.params.userId;

  Users.findByIdAndDelete(userId)
    .then((result) => {
      res.status(200).json({
        message: "users is Deleted",
        users: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Failed to users",
        error: err,
      });
    });
};

exports.EditUser = async (req, res, next) => {
  const userId = req.params.userId;

  const { name, email, password, userType } = req.body;

  const updatedFields = { name, email, password, userType };

  try {
    const result = await Users.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });

    if (result) {
      res.status(200).json({
        message: "User is updated",
        User: result,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({
      message: "Failed to update user",
      error: err,
    });
  }
};
