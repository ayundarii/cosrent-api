const { Router } = require("express")
const TransactionController = require("../controllers/transaction.controller")
const { auth, authorizeAdmin } = require("../middlewares/auth")

const router = Router()

router.get("/transactions", authorizeAdmin, TransactionController.getTransactions)
router.get("/transactions/:id", authorizeAdmin, TransactionController.getTransactionById)
router.post("/transactions/add", authorizeAdmin, TransactionController.addTransaction)
router.delete("/transactions/:id", authorizeAdmin, TransactionController.deleteTransaction)
router.put("/transactions/:id/update", authorizeAdmin, TransactionController.updateTransaction)

module.exports = router