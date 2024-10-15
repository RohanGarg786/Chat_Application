import express from 'express';
import { registerUserController ,loginUserController, userDetailsController } from '../controller/registerController';

const userRouter = express.Router();

userRouter.get("/",userDetailsController)
userRouter.post("/register",registerUserController);
userRouter.post("/login",loginUserController);


export default userRouter;