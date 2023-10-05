const router = require("express").Router();
const {
  createCategory,
  updateCategory,
  getAllCategories,
  deleteCategoryById,
} = require("../controllers/categoryController");

router.post("/", createCategory);
router.put("/:id", updateCategory);
router.get("/", getAllCategories);
router.delete("/:id", deleteCategoryById);

module.exports = router;
