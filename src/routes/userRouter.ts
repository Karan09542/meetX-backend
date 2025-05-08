import express from "express"
import { authorize, getUserController, userLoginController, userSignupController } from "../controllers/userController"
import { userSignupValidator, validateAuthorizationHeader } from "../validators/userValidator"

const PublicUserRouter = express.Router()

PublicUserRouter.post("/", validateAuthorizationHeader, authorize, getUserController)
PublicUserRouter.post("/signup",userSignupValidator, userSignupController)
PublicUserRouter.post("/login",userLoginController, userLoginController)

export { PublicUserRouter }