import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { decryption } from './cryptoData';

const passwordKey = '!@#PasswordEncryption$%^';

export function validateID(req: Request, res: Response, next: NextFunction) {
	check('id').isInt({ gt: 1, lt: 100 }).run(req);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	next();
}

export function validateUser(req: Request, res: Response, next: NextFunction) {
	check('email').isEmail().run(req);
	check('name').isLength({ min: 2, max: 50 }).isAlphanumeric().run(req);
	check('password').custom((value, { req }) => {
		const plaintext = decryption(value, passwordKey);
		console.log(plaintext);
		check(plaintext).isLength({ min: 6 }).run(value);
	});
	check('confirmpassword')
		.custom((value, { req }) => {
			if (decryption(value, passwordKey) !== decryption(req.body.upassword, passwordKey))
				throw new Error('Password confirmation does not match password');
			return true;
		})
		.run(req);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	next();
}

export function validadeUserUpdate(req: Request, res: Response, next: NextFunction) {
	check('id').isInt({ gt: 1, lt: 100 }).run(req);
	check('uemail').isEmail().run(req);
	check('uname').isLength({ min: 2, max: 50 }).isAlphanumeric().run(req);
	check('upassword').isLength({ min: 6 }).run(req);
	check('ucpassword')
		.custom((value, { req }) => {
			if (value !== req.body.upassword) throw new Error('Password confirmation does not match password');
			return true;
		})
		.run(req);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	next();
}
