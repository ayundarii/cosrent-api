const { Router } = require("express")
const UserController = require("../controllers/user.controller")
const { auth, authorizeAdmin } = require("../middlewares/auth")

const router = Router()

router.post("/users/login", UserController.login)
//using auth to check if token is present
router.use(auth)
//check if the user in the token have the admin authorization
router.post("/users/add", authorizeAdmin, UserController.createUser)
router.get("/users", authorizeAdmin, UserController.getUser)

module.exports = router