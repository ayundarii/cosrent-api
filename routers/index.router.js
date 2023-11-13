const { Router } = require("express")
const categoryRouter = require("./category.router")
const catalogsRouter = require("./catalogs.router")

const router = Router()

router.get("/", (req, res) => {
    res.json({ message: "Server is running" })
})

router.use(categoryRouter)
router.use(catalogsRouter)

module.exports = router