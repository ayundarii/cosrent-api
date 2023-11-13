const { Router } = require("express")
const CategoryController = require("../controllers/category.controller")
const { auth, authorizeAdmin } = require("../middlewares/auth")

const router = Router()

router.get("/categories", CategoryController.getCategory)
router.get("/categories/:id", CategoryController.getCategoryById)
router.post("/categories/add", authorizeAdmin, CategoryController.addCategory)
router.delete("/categories/:id", authorizeAdmin, CategoryController.deleteCategory)
router.put("/categories/:id/update", authorizeAdmin, CategoryController.updateCategory)

module.exports = router