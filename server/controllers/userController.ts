import { Pool } from 'pg';
import { ICrudDao } from './ICrud';

export interface IUser {
	name: string;
	email: string;
	password: string;
	confirmpassword: string;
}

export interface IDisplayUser {
	User_Name: string;
	User_Email: string;
	User_Registration: string;
}

export class UserDao implements ICrudDao<IDisplayUser, IUser> {
	#MYKEY = '!@#PasswordEncryption$%^';

	constructor(public db: Pool) {
		this.db = db;
	}

	private async checkUserInDB(email: string): Promise<boolean> {
		const res = await this.db.query(`SELECT * FROM users WHERE uemail = $1`, [email]);
		if (await res.rows[0]) return true;
		return false;
	}

	public async create(user: IUser): Promise<boolean> {
		const check = await this.checkUserInDB(user.email);
		if (!check) {
			await this.db.query(
				`INSERT INTO users (uname, uemail, upassword, uregistration) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING uid AS User_ID, uname AS User_Name, uemail AS User_Email, uregistration AS User_Registration`,
				[user.name, user.email, user.password]
			);
			return true;
		} else {
			return false;
		}
	}

	public async read(id: number): Promise<IDisplayUser> {
		const res = await this.db.query(
			'SELECT uname as "User Name", uemail as "User Email", uregistration as "User Registration" FROM users WHERE uid = $1',
			[id]
		);
		const data = await res.rows[0];
		return data;
	}

	public async update(id: number, user: IUser): Promise<IDisplayUser> {
		const res = await this.db.query(
			'UPDATE users SET uname = $2, uemail = $3, upassword = S4 WHERE uid = $1 RETURNING uname as User_Name, uemail as User_Email, uregistration as User_Registration',
			[id, user.name, user.email, user.password]
		);
		return res.rows[0];
	}

	public async delete(id: number): Promise<boolean> {
		const delres = await this.db.query('DELETE FROM users WHERE uid = $1', [id]);
		if (delres.rowCount === 0) return true;
		return false;
	}

	public async find(email: string) {
		const res = await this.db.query(
			'SELECT uname as "name", uemail as "email", upassword as "password" FROM users WHERE uemail = $1',
			[email]
		);
		const row = await res.rows[0];
		return row;
	}
}
