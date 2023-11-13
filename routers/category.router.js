const { Router } = require("express")
const CategoryController = require("../controllers/category.controller")

const router = Router()

router.get("/categories", CategoryController.getCategory)
router.get("/categories/:id", CategoryController.getCategoryById)
router.post("/categories/add", CategoryController.addCategory)
router.delete("/categories/:id", CategoryController.deleteCategory)
router.put("/categories/:id/update", CategoryController.updateCategory)

module.exports = router