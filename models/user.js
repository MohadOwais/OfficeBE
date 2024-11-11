const mongoose = require("mongoose");
const { type } = require("os");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  userType: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("AddUser", UserSchema);
