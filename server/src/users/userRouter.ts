import express from 'express';
import { validadeUserUpdate, validateEmail, validateID, validateUser } from '../../Controllers/userValidation';
import { getUserByEmail, getUserByID, createNewUser, updateUser, deleteUser, userLogin } from './userApi';
import { serverConfig } from '../Config/serverConfig';
import { MiddlewareUserAuth } from '../Auth/authApi';

const userRouter = express.Router();

export const MYKEY = serverConfig.PASS_KEY;

userRouter.post('/login', userLogin);

userRouter.use(MiddlewareUserAuth);

userRouter.get('/find/:email', validateEmail, getUserByEmail);

userRouter.get('/:id', validateID, getUserByID);

userRouter.post('/create', validateUser, createNewUser);

userRouter.put('/updateUser', validadeUserUpdate, updateUser);

userRouter.delete('/deleteUser', validateID, deleteUser);

export default userRouter;
