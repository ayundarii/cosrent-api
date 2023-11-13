const { Router } = require("express")
const CategoryController = require("../controllers/category.controller")

const router = Router()

router.get("/categories", CategoryController.getCategory)

module.exports = router