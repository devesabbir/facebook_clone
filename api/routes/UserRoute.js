import express from "express";
import { LoginController } from "../controllers/LoginController.js";
import { CreateUser, DeleteUser, ReadUser,ReadSingleUser, UpdateUser, VerifyUser, LoggedInUser } from '../controllers/UserController.js';
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";
import { SingleAuthMiddleware } from "../middlewares/SingleAuthMiddleware.js";
const router = express.Router()


router.route('/me').get(LoggedInUser)
router.route('/verify').post(VerifyUser)
router.route('/login').post(LoginController) 

router.route('/').get(AuthMiddleware, ReadUser ).post(CreateUser )
router.route('/:id').get(SingleAuthMiddleware, ReadSingleUser).patch(SingleAuthMiddleware, UpdateUser ).put(SingleAuthMiddleware, UpdateUser ).delete(SingleAuthMiddleware, DeleteUser )



export default router