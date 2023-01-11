const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const user = require("../models/user");
const Role = require("../models/role");
const Token = require("../models/accessToken");
const Address = require("../models/address");

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
      const passwordMatch = bcrypt.compare(password, data.password);
      if (passwordMatch) {
        const tokenVal = await createTokenSave(data._id, email, password);
        res.status(200).send(tokenVal);
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
    const userData = await user.findById({ _id });

    if (!userData) {
      res.status(500).send({ message: "500 error, Id is invalid" });
    }
    res.status(200).send(userData);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "500 error to user, Internal server error" });
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

const createTokenSave = async (id, email, password) => {
  const tokenValue = crypto
    .createHash("md5")
    .update(`${email}${password}${process.env.SECRET_KEY}`)
    .digest("hex");

  const expiryDate = new Date();
  expiryDate.setHours(1);
  const tokenData = await Token({
    userId: id,
    token: tokenValue,
    expiryDate: expiryDate,
  }).save();
  console.log(tokenData.expiryDate);
  return tokenData;
};

const addAddress = async (req, res) => {
  try {
    const { address, city, state, pin_code, phone_number, userId } = req.body;
    const createAddress = await Address.create({
      address,
      city,
      state,
      pin_code,
      phone_number,
      userId,
    });
    res.status(200).send(createAddress);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const userForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await user.findOne({ email });

    if (!data) {
      return res.status(400).send({ message: "Enter a valid data" });
    } else {
      let jwtToken = jwt.sign({ email: user.email }, process.env.SECRET_KEY);

      const updateData = await user.updateOne(
        { email: req.body.email },
        { passwordResetToken: jwtToken }
      );

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.emailId,
          pass: process.env.emailPassword,
        },
      });

      const mailOptions = {
        from: process.env.emailId,
        to: process.env.emailTo,
        subject: "Password Reset",
        text: "That was great",
        html: `<html>
          <head>
            <title>Password reset token</title>
            <style>
              body{
                height : 100%;
                display : flex;
                flex-direction : column;
                justify-content : center;
                align-items : center;
              }
              .container{
                width : 100vw;
                height : 400px;
                border-radius : 2px;
                background-color : #fff;
                box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
              }
              .btn{
                border : none;
                padding : 10px 20px;
                border-radius : 4px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Password Reset</h2>
              <p>If you've lost your password or wish to reset it, use the link below to get started </p>
              <button class = "btn"><a href = "http://localhost:8000/user/verify-reset-password/${jwtToken}">Reset Your Password </button>
            </div>
          </body>
        
        </html>
        `,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      res
        .status(200)
        .send({ message: "User password reset token updated successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "500 error, Internal error" });
  }
};

const checkResetPasswordToken = async (req, res) => {
  try {
    const { passwordResetToken } = req.params;
    if (!passwordResetToken) {
      return res.status(401).send({ message: "Please enter reset token" });
    }

    const jwtCheck = jwt.verify(
      passwordResetToken,
      process.env.SECRET_KEY,
      { expiryIn: "10m" },
      async (error, data) => {
        if (error) {
          res.status(400).send({ message: "Unauthorized token" });
        } else {
          try {
            const { password } = req.body;
            if (!password) {
              res.status(400).send({ message: "Please Enter a password" });
            } else {
              const salt = await bcrypt.genSalt(10);
              const hashCode = await bcrypt.hash(password, salt);

              const updateData = await user.updateOne(
                { passwordResetToken: passwordResetToken },
                { password: hashCode }
              );
              res.status(200).send(updateData);
            }
          } catch (error) {
            console.log(error);
            res.status(500).send({ message: "Internal server error" });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "500, Internal server error" });
  }
};

module.exports = {
  userCreate,
  loginUser,
  getUser,
  deleteUserLoginData,
  findLimitUserData,
  addAddress,
  userForgetPassword,
  checkResetPasswordToken,
};
