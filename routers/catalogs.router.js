const { Router } = require("express")
const CatalogControllers = require("../controllers/catalogs.controller")

const router = Router()

router.get("/catalogs", CatalogControllers.getCatalogs)

module.exports = router