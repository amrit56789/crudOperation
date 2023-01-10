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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await user.findOne({
      email,
    });
    if (!data) {
      res
        .status(401)
        .send({ message: "500 Error to user, Email or password is incorrect" });
    } else {
      const passwordMatch = await bcrypt.compare(password, data.password);
      if (passwordMatch) {
        res.status(200).send({ message: `Token is ${data._id}` });
      } else {
        res.status(500).send({
          message: "500 Error to user, Email or password is incorrect",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { _id } = req.headers;
    const data = await user.find({ _id });
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const deleteUserLoginData = async (req, res) => {
  try {
    const { id } = req.headers;
    await user.findByIdAndDelete(id);
    res.status(200).send({ message: "Data success fully delete" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const findLimitUserData = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit);
    const page = parseInt(req.params.page);
    const skip = limit * (page - 1);
    const data = await user.find({}).limit(limit).skip(skip).exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  userCreate,
  loginUser,
  getUser,
  deleteUserLoginData,
  findLimitUserData,
};
