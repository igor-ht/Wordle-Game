import { NextFunction, Request, Response } from 'express';
import { check, Result, ValidationError, validationResult } from 'express-validator';
import { MYKEY } from '../src/users/userRouter';
import { decryption } from './cryptoData';

const passwordKey = process.env.APP_MYKEY_PASS! || '!@#PasswordEncryption$%^';

export async function validateEmail(req: Request, res: Response, next: NextFunction) {
	await check('email').isEmail().withMessage('Email not valid.').run(req);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let msgs: string[] = [];
		errors.array().forEach((er) => {
			msgs.push(er.msg);
		});
		return res.status(400).json(msgs);
	}
	next();
}

export async function validateID(req: Request, res: Response, next: NextFunction) {
	await check('id').toInt().isInt({ gt: 0, lt: 101 }).withMessage('ID not valid.').run(req);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let msgs: string[] = [];
		errors.array().forEach((er) => {
			msgs.push(er.msg);
		});
		return res.status(400).json(msgs);
	}
	next();
}

export async function validateUser(req: Request, res: Response, next: NextFunction) {
	await check('name')
		.isLength({ min: 2, max: 50 })
		.withMessage('Your name must contain between 2 and 50 characters.')
		.run(req),
		await check('email').isEmail().withMessage('Email not valid.').run(req),
		await check('password')
			.custom(async (value, { req }) => {
				const plaintext = decryption(value, passwordKey);
				if (plaintext.length < 6) throw false;
			})
			.withMessage('Password must contain at least 6 characters')
			.run(req);

	const errors: Result<ValidationError> = validationResult(req);
	if (!errors.isEmpty()) {
		let msgs: string[] = [];
		errors.array().forEach((er) => {
			msgs.push(er.msg);
		});
		return res.status(400).json(msgs);
	}
	next();
}

export async function validadeUserUpdate(req: Request, res: Response, next: NextFunction) {
	await check('id').isInt({ gt: 0, lt: 101 }).withMessage('ID not valid.').run(req),
		await check('newUser.email').isEmail().withMessage('Email not valid').run(req),
		await check('newUser.name')
			.isLength({ min: 2, max: 50 })
			.withMessage('Your name must be between 2 and 50 characters.')
			.run(req),
		await check('newUser.password')
			.custom((value, { req }) => {
				let plaintext = decryption(req.body.newUser.password, MYKEY);
				let plaintext2 = decryption(req.body.newUser.confirmpassword, MYKEY);
				if (plaintext.length < 6 || plaintext !== plaintext2) throw false;
				return true;
			})
			.withMessage('Password not valid.')
			.run(req);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let msgs: string[] = [];
		errors.array().forEach((er) => {
			msgs.push(er.msg);
		});
		return res.status(400).json(msgs);
	}
	next();
}
