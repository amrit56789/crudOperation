const { check, validationResult } = require("express-validator");
const role = require("../models/role");
const checkRoleValidation = () => {
  return [
    check("name")
      .not()
      .isEmpty()
      .withMessage("Name cannot be empty, Please Enter name"),
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long"),
  ];
};

const RoleDeleteValidation = () => {
  return [check("id").not().isEmpty().withMessage("Please Enter Id")];
};

const RoleEditValidation = () => {
  return [
    check("id").not().isEmpty().withMessage("Please Enter Id"),
    check("description")
      .not()
      .isEmpty()
      .withMessage("Please Enter Description"),
  ];
};

const checkUserValidation = (req, res) => {
  return [
    // Check password username
    check("username")
      .isLength({ min: 3 })
      .withMessage("UserName must be at least 3 character long"),

    // Check password length
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 character long"),

    // Check email
    check("email").isEmail().withMessage("Email is not correct"),

    // check password and confirm password validation
    check("confirmPassword")
      .exists()
      .custom((value, { req }) => value === req.body.password)
      .withMessage("Password and confirm password doesn't match"),
  ];
};

const validationMiddleWare = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  checkRoleValidation,
  RoleDeleteValidation,
  RoleEditValidation,
  checkUserValidation,
  validationMiddleWare,
};
