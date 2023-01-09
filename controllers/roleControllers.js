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

const editRole = async (req, res) => {
  try {
    const { _id, description } = req.body;
    const updatedRole = await Role.findOneAndUpdate(
      { _id },
      { description },
      { new: true }
    );
    res.status(200).send(updatedRole);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = { addRole, deleteRole, editRole };
