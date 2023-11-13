const { Router } = require("express")
const categoriesRouter = require("./category.router")
const catalogsRouter = require("./catalogs.router")
const usersRouter = require("./user.router")
const itemsRouter = require("./items.router")

const router = Router()

router.get("/", (req, res) => {
    res.json({ message: "Server is running" })
})

router.use(usersRouter)
router.use(categoriesRouter)
router.use(catalogsRouter)
router.use(itemsRouter)

module.exports = router
