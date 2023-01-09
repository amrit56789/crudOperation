const Role = require("../models/role");

const addRole = async (req, res) => {
  try {
    const { name, description } = req.body;
    await Role({
      name,
      description,
    }).save();
    res.status(200).send({ message: "Data success fully add" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Error" });
  }
};

module.exports = { addRole };
