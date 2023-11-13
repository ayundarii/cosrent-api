const { Router } = require("express")
const CatalogControllers = require("../controllers/catalogs.controller")
const { auth, authorizeAdmin } = require("../middlewares/auth")

const router = Router()

router.get("/catalogs", CatalogControllers.getCatalogs)
router.get("/catalogs/:id", CatalogControllers.getCatalogById)
router.post("/catalogs/add", authorizeAdmin, CatalogControllers.addCatalog)
router.put("/catalogs/:id/update", authorizeAdmin, CatalogControllers.updateCatalog)
router.delete("/catalogs/:id", authorizeAdmin, CatalogControllers.deleteCatalog)

module.exports = router