const checkNameValidation = (req, res, next) => {
  const name = req.body.name;
  if (!name) {
    res
      .status(401)
      .send({ message: "Name cannot be empty, Please Enter name" });
  } else if (name.length <= 2) {
    res.status(401).send({ message: "Name must be 3 character" });
  } else {
    next();
  }
};

module.exports = checkNameValidation;
