import express from 'express';
import { registerUserController ,loginUserController, userDetailsController, addNewContact, allContacts, allMessages } from '../controller/registerController';

const userRouter = express.Router();

userRouter.get("/",userDetailsController)
userRouter.post("/register",registerUserController);
userRouter.post("/login",loginUserController);
userRouter.post('/addNewContact/:userId',addNewContact);
userRouter.get('/allContacts/:userId',allContacts);
userRouter.get('/allMessages/:senderId/:receiverId', allMessages)


export default userRouter;