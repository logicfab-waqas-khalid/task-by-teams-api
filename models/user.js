const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new Schema(
  {
    username:String,
    email:String,
   password:String,
  },
  { timestamps: true }
);

userSchema.methods.generateHashedPassword = async function () {
    let salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  };
const User = model("user", userSchema);

module.exports = User;
