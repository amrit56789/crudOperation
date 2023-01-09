const { check, validationResult } = require("express-validator");

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
  validationMiddleWare,
};
