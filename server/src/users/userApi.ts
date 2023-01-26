import { Request, Response } from 'express';
import { decryption } from '../../Controllers/cryptoData';
import { IUser, UserDao } from '../../Controllers/userController';
import checkDbConnection from '../../Models/db.client';
import { createToken } from '../Auth/authApi';
import { MYKEY } from './userRouter';

let UserService: UserDao;
export default function UserDB() {
	if (!UserService) {
		UserService = new UserDao(checkDbConnection());
	}
	return UserService;
}

export async function userLogin(req: Request, res: Response) {
	const { email, password } = req.body;
	const user = await UserDB().find(email);
	const plaintext = decryption(user.password, MYKEY);

	if (user.email + '' !== email + '' || plaintext + '' !== password + '') return res.status(400).send('Email or Password not valid.');

	const token = createToken(user);
	res.status(200).send({ token: token, email: user.email, name: user.name });
}

export async function getUserByEmail(req: Request, res: Response) {
	const email = req.params.email;
	const user = await UserDB().find(email);
	if (user !== undefined) return res.status(200).send(user);

	res.status(400).send('Email not found');
}

export async function getUserByID(req: Request, res: Response) {
	const id = req.params.id;
	const user = await UserDB().read(+id);
	if (user !== undefined) return res.status(200).send(user);

	return res.status(400).send('User not found.');
}

export async function createNewUser(req: Request, res: Response) {
	const user: IUser = req.body;
	if (await UserDB().create(user)) return res.status(200).send('User succesfully registered.');

	return res.status(400).send('User couldn`t be registered.');
}

export async function updateUser(req: Request, res: Response) {
	const user = req.body;
	const userUpdated = await UserDB().update(+user.id, user.newUser);
	if (userUpdated !== undefined) return res.status(200).send(userUpdated);

	return res.status(400).send('Couldn`t update the user informations.');
}

export async function deleteUser(req: Request, res: Response) {
	const id = req.body.id;
	const removeRes = await UserDB().delete(+id);
	if (removeRes) return res.status(200).send('User deleted.');

	return res.status(400).send('Action not completed. Try again later.');
}
