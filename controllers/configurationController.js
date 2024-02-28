const asyncHandler = require("express-async-handler");
const Configuration = require("../models/configurationModel");

const createConfiguration = asyncHandler(async (req, res) => {
  const { configId } = req.body;
  const userId = req.user;

  const existingConfiguration = await Configuration.findOne({ configId });

  if (existingConfiguration) {
    res.status(400);
    throw new Error("Configuration with this ID already exists");
  }

  const newConfiguration = await Configuration.create({
    configId,
    data: [
      ["sym1", "sym2", "sym3"],
      ["sym4", "sym6", "sym8"],
      ["sym5", "sym1", "sym0"],
    ],
    userData: userId,
  });

  res.status(201).json({ message: "Configuration created successfully" });
});

const getConfiguration = asyncHandler(async (req, res) => {
  const configId = req.params.id;

  const configuration = await Configuration.findOne({ configId });

  if (!configuration) {
    res.status(404);
    throw new Error("Configuration not found");
  }

  res.json(configuration.data);
});

const updateConfiguration = asyncHandler(async (req, res) => {
  const configId = req.params.id;
  const { remark } = req.body;

  const configuration = await Configuration.findOne({ configId });

  if (!configuration) {
    res.status(400);
    throw new Error("Configuration not found");
  }

  configuration.remark = remark;
  await configuration.save();

  res.json({ message: "Success" });
});

module.exports = {
  createConfiguration,
  getConfiguration,
  updateConfiguration,
};
