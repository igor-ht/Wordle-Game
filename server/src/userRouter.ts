import express from 'express';
import { IUser, UserDao } from '../controllers/userController';
import { client, connectDataBase } from '../models/db.client';
import { validadeUserUpdate, validateID, validateUser } from '../controllers/userValidation';

const userRouter = express.Router();

connectDataBase();

const UserDb = new UserDao(client);

const MYKEY = '!@#PasswordEncryption$%^';

userRouter.get('/', (req, res) => {
	res.send('in /user');
	res.status(200);
});

userRouter.get('/find/:email', async (req, res) => {
	try {
		const email = req.params.email;
		const user = await UserDb.find(email);
		res.send(user);
		res.status(200);
	} catch (error) {
		res.send(error);
		res.status(400);
	}
});

userRouter.get('/:id', validateID, async (req, res) => {
	try {
		const id = req.params.id;
		const user = await UserDb.read(+id);

		if (user) {
			res.send(user);
		} else {
			res.send('User not found.');
		}
		res.status(200);
	} catch (error) {
		res.send(error);
		res.status(400);
	}
});

userRouter.post('/create', validateUser, async (req, res) => {
	try {
		const user: IUser = req.body;
		if (await UserDb.create(user)) {
			res.send('User succesfully registered.');
			res.status(200);
		} else {
			throw new Error();
		}
	} catch (error) {
		res.send(error);
		res.status(400);
	}
});

userRouter.put('/updateUser', validadeUserUpdate, async (req, res) => {
	// should receive the id of the user and a new object with the updated data
	try {
		const user = req.body;
		const userUpdated = await UserDb.update(+user.id, user.newUser);
		res.send(userUpdated);
		res.status(200);
	} catch (error) {
		res.send(error);
		res.status(400);
	}
});

userRouter.delete('/deleteUser', validateID, async (req, res) => {
	try {
		const id = req.body.id;
		const removeRes = await UserDb.delete(+id);
		if (removeRes) {
			res.send('User deleted.');
		} else {
			res.send('Action not completed. Try again later.');
		}
		res.status(200);
	} catch (error) {
		res.send(error);
		res.status(400);
	}
});

export default userRouter;
