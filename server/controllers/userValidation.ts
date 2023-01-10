import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { decryption } from './cryptoData';

const passwordKey = '!@#PasswordEncryption$%^';

export function validateID(req: Request, res: Response, next: NextFunction) {
	check('id').isInt({ gt: 1, lt: 100 }).toInt().run(req);

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	next();
}

export function validateUser(req: Request, res: Response, next: NextFunction) {
	const validationChecks = [
		check('email').isEmail(),
		check('name').isLength({ min: 2, max: 50 }),
		check('password')
			.custom((value, { req }) => {
				const plaintext = decryption(value, passwordKey);
				check(plaintext).isLength({ min: 6 });
			}),
		check('confirmpassword').custom((value, { req }) => {
			if (decryption(value, passwordKey) !== decryption(req.body.password, passwordKey))
				throw new Error('Password confirmation does not match password');
			return true;
		}),
	];
	validationChecks.forEach( (validationCheck) => validationCheck.run(req));
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}

export function validadeUserUpdate(req: Request, res: Response, next: NextFunction) {
	const updateChecks = [
		check('id').isInt({ gt: 1, lt: 100 }),
		check('uemail').isEmail(),
		check('uname').isLength({ min: 2, max: 50 }).isAlphanumeric(),
		check('upassword').isLength({ min: 6 }),
		check('ucpassword').custom((value, { req }) => {
			if (value !== req.body.upassword) throw new Error('Password confirmation does not match password');
			return true;
		}),
	];
	updateChecks.forEach((updtCheck) => updtCheck.run(req));
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
}
