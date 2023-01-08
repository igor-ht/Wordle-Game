import express from 'express';
import { IUser, UserDao } from '../controllers/userController';
import client from '../models/db.client';

const userRouter = express.Router();

const UserDb = new UserDao(client);

const MYKEY = '!@#PasswordEncryption$%^';

userRouter.get('/', (req, res) => {
  res.send('in /user');
  res.status(200);
});

userRouter.get('/:id', async (req, res) => {

  try {
    const id = req.params.id;
    const user = await UserDb.read(+id);
    if (user) {
      res.send(user);
    } else {
      res.send('User not found.')
    }
    res.status(200);
    
  } catch (error) {
    res.send(error);
    res.status(400);
  }
});

// userRouter.get();

userRouter.post('/create', async (req, res) => {

  try {
    const user: IUser = req.body;
    if (await UserDb.create(user)) {
      res.send('User succesfully registered.');
    } else {
      throw('Email already in use.');
    }
    res.status(200);

  } catch (error) {
    res.send(error);
    res.status(400);
  }
});

userRouter.put('/updateUser', async (req, res) => {

  try {
    const user = req.body
    const userUpdated = await UserDb.update(+user.id, user.newUser);
    res.send(userUpdated);
    res.status(200);

  } catch (error) {
    res.send(error);
    res.status(400);
  }

});

userRouter.delete('/deleteUser', async (req, res) => {

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