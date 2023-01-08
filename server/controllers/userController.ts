import { Pool } from "pg";
import client from "../models/db.client";
import { ICrudDao } from "./ICrud";


export interface IUser {
  uname: string,
  uemail: string,
  upassword: string,
  ucpassword: string
};

export interface IDisplayUser {
  User_Name: string,
  User_Email: string,
  User_Registration: string
};


export class UserDao implements ICrudDao <IDisplayUser, IUser> {

  #MYKEY = '!@#PasswordEncryption$%^';

  constructor (public db: Pool) {
    this.db = db;
  }

  private async checkUserInDB (email: string): Promise<boolean> {
    const res = await client.query(`SELECT uemail FROM users WHERE uemail = $1`, [email]);
    return res.rows[0].exists
  };

  public async create (user: IUser): Promise<boolean> {
    const check = await this.checkUserInDB(user.uemail);
    if (!check) {
      client.query(`INSERT INTO users (uname, uemail, upassword, uregistration) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING uid AS User_ID, uname AS User_Name, uemail AS User_Email, uregistration AS User_Registration`, [user.uname, user.uemail, user.upassword]);
      return true ;
    } else {
      return check
    }
  }

  public async read (id: number): Promise<IDisplayUser> {
    const res = await client.query('SELECT uname as User_Name, uemail as User_Email, uregistration as User_Registration WHERE uid = $1', [id]);
    return res.rows[0]
  };


  public async update (id: number, user: IUser): Promise<IDisplayUser> {
    const res = await client.query('UPDATE users SET uname = $2, uemail = $3, upassword = S4 WHERE uid = $1 RETURNING uname as User_Name, uemail as User_Email, uregistration as User_Registration', [id, user.uname, user.uemail, user.upassword]);
    return res.rows[0]
  };

  public async delete (id: number): Promise<boolean> {
    const delres = await client.query('DELETE FROM users WHERE uid = $1', [id]);
    if (delres.rowCount === 0) return true;
    return false;
  };
}