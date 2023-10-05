const Joi = require("joi");
const {
  createService,
  updateService,
  getAllService,
  deleteCategoryByIdService,
} = require("../services/categoryService");

const categoryValidator = Joi.object({
  name: Joi.string().min(3).max(40).required(),
});

const createCategory = async (req, res) => {
  const { error } = categoryValidator.validate(req.body);
  if (!error) {
    try {
      const newCat = await createService(req.body);
      res.send(newCat);
    } catch (error) {
      res.status(400).send({ error: `Failed to create category ${error}` });
    }
  } else {
    res.status(400).json({
      error: "validation failed",
      input: error.details,
    });
  }
};

const updateCategory = async (req, res) => {
  const { error } = categoryValidator.validate(req.body);
  if (!error) {
    try {
      const updatedCat = await updateService(req.params.id, req.body);
      res.send(updatedCat);
    } catch (error) {
      res.status(400).send({ error: `Failed to update category ${error}` });
    }
  } else {
    res.status(400).json({
      error: "validation failed",
      input: error.details,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const allCat = await getAllService();
    res.send(allCat);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const deletedCat = await deleteCategoryByIdService(req.params.id);
    res.send(deletedCat);
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  deleteCategoryById,
};
