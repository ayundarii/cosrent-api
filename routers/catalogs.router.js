const { Router } = require("express")
const CatalogControllers = require("../controllers/catalogs.controller")

const router = Router()

router.get("/catalogs", CatalogControllers.getCatalogs)
router.get("/catalogs/:id", CatalogControllers.getCatalogById)
router.post("/catalogs/add", CatalogControllers.addCatalog)
router.delete("/catalogs/:id", CatalogControllers.deleteCatalog)

module.exports = router