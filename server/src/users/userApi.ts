import { Request, Response } from 'express';
import { IUser, UserDao } from '../../controllers/userController';
import checkDbConnection from '../../models/db.client';

let UserService: UserDao;
export default function UserDB() {
	if (!UserService) {
		UserService = new UserDao(checkDbConnection());
	}
	return UserService;
}

export async function getUserByEmail(req: Request, res: Response) {
	const email = req.params.email;
	const user = await UserDB().find(email);
	if (user !== undefined) return res.status(200), res.send(user);

	return res.status(400), res.send('Email not found');
}

export async function getUserByID(req: Request, res: Response) {
	const id = req.params.id;
	const user = await UserDB().read(+id);
	if (user !== undefined) return res.status(200), res.send(user);

	return res.status(400), res.send('User not found.');
}

export async function createNewUser(req: Request, res: Response) {
	const user: IUser = req.body;
	if (await UserDB().create(user)) return res.status(200), res.send('User succesfully registered.');

	return res.status(400), res.send('User couldn`t be registered.');
}

export async function updateUser(req: Request, res: Response) {
	const user = req.body;
	const userUpdated = await UserDB().update(+user.id, user.newUser);
	if (userUpdated !== undefined) return res.status(200), res.send(userUpdated);

	return res.status(400), res.send('Couldn`t update the user informations.');
}

export async function deleteUser(req: Request, res: Response) {
	const id = req.body.id;
	const removeRes = await UserDB().delete(+id);
	if (removeRes) return res.status(200), res.send('User deleted.');

	return res.status(400), res.send('Action not completed. Try again later.');
}
