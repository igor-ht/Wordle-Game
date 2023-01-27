import express from 'express';
import { validadeUserUpdate, validateEmail, validateID, validateUser } from '../../Controllers/userValidation';
import { getUserByEmail, getUserByID, createNewUser, updateUser, deleteUser, userLogin } from './userApi';
import { serverConfig } from '../Config/serverConfig';
import { MiddlewareAuth } from '../Auth/authApi';

const userRouter = express.Router();

export const MYKEY = serverConfig.PASS_KEY;

userRouter.post('/create', validateUser, createNewUser);

userRouter.post('/login', userLogin);

userRouter.get('/find/:email', validateEmail, getUserByEmail);

userRouter.get('/:id', validateID, getUserByID);

userRouter.put('/updateUser', validadeUserUpdate, updateUser);

userRouter.delete('/deleteUser', validateID, deleteUser);

userRouter.use(MiddlewareAuth);

export default userRouter;
