const Users = require("../models/user");

exports.Login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  Users.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (user.password === password) {
        res.status(200).json({
          message: `Welcome, ${user.name}`,
          name: user.name,
          id: user._id,
        });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "An error occurred", error });
    });
};
