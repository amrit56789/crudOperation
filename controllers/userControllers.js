const user = require("../models/user");
const bcrypt = require("bcrypt");

const Role = require("../models/role");
const userCreate = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      firstName,
      lastName,
      roleId,
      confirmPassword,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashCode = await bcrypt.hash(password, salt);

    const addUser = await user({
      username,
      password: hashCode,
      email,
      firstName,
      lastName,
      roleId,
    }).save();

    res.status(200).send({ message: "Success fully add" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server error" });
  }
};

module.exports = { userCreate };
