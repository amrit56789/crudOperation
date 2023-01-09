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

const deleteRole = async (req, res) => {
  try {
    const { id } = req.body;
    await Role.findByIdAndDelete(id);
    res.status(200).send({ message: "Data is deleted success fully" });
  } catch (error) {
    res.status(500).send({ message: "500 error to user" });
  }
};

module.exports = { addRole, deleteRole };
