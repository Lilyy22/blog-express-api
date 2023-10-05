const Category = require("../models/category");

const create = async ({ name }) => {
  try {
    const newCatagory = new Category({
      name: name,
    });
    await newCatagory.save();
    console.log("hhh" + newCatagory);
    return newCatagory;
  } catch (error) {
    throw error;
  }
};

const update = async (id, { name }) => {
  try {
    const updatedCatagory = Category.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      { new: true }
    );
    return updatedCatagory;
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const allCatagory = Category.find({});
    return allCatagory;
  } catch (error) {
    throw error;
  }
};

const deleteCategoryById = async (id) => {
  try {
    const deletedCatagory = Category.findByIdAndDelete(id).exec();
    return deletedCatagory;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createService: create,
  updateService: update,
  getAllService: getAll,
  deleteCategoryByIdService: deleteCategoryById,
};
