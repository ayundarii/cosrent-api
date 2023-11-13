const { Router } = require("express")
const ItemController = require("../controllers/items.controller")
const { auth, authorizeAdmin } = require("../middlewares/auth")

const router = Router()

router.get("/items", ItemController.getItems)
router.get("/items/:id", ItemController.getItemById)
router.post("/items/add", authorizeAdmin, ItemController.addItem)
router.delete("/items/:id", authorizeAdmin, ItemController.deleteItem)
router.put("/items/:id/update", authorizeAdmin, ItemController.updateItem)

module.exports = router