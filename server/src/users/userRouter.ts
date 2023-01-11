import express from 'express';
import { validadeUserUpdate, validateEmail, validateID, validateUser } from '../../controllers/userValidation';
import { getUserByEmail, getUserByID, createNewUser, updateUser, deleteUser } from './userApi';

const userRouter = express.Router();

export const MYKEY = process.env.APP_MYKEY_PASS!;

userRouter.get('/', (req, res) => {
	res.status(200);
	res.send('inside /user');
});

userRouter.get('/find/:email', validateEmail, getUserByEmail);

userRouter.get('/:id', validateID, getUserByID);

userRouter.post('/create', validateUser, createNewUser);

userRouter.put('/updateUser', validadeUserUpdate, updateUser);

userRouter.delete('/deleteUser', validateID, deleteUser);

export default userRouter;
