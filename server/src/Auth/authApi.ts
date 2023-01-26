import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { serverConfig } from '../Config/serverConfig';

const MY_JWT_KEY = serverConfig.JWT_KEY;

export const createToken = (user: { email: string; password: string }) => {
	const { email } = user;
	const token = jwt.sign({ email }, MY_JWT_KEY, { expiresIn: '1h' });
	return token;
};

export function verifyJWT<T = JwtPayload>(token: string): T {
	return jwt.verify(token, MY_JWT_KEY) as T;
}

export function MiddlewareAuth(req: Request, res: Response, next: NextFunction) {
	const token = req.headers.token as string;
	if (!token) next(new Error('No token provided'));

	try {
		const { email } = verifyJWT(token);
		if (email) next();

		throw error;
	} catch (error) {
		next(new Error('Token not valid.'));
	}
}
