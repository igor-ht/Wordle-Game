import { Express, Request, Response} from 'express';
import { QueryResult } from 'pg';
import { encryption } from '../controllers/cryptoData';
import { handleRegistration } from '../controllers/userController';
import client from '../models/db';

export default function (app: Express) {

  app.get('/word', (req: Request, res: Response) => {
    const myKey = '$%^Encrypt!@#';

    client
      .query('SELECT word FROM words ORDER BY RANDOM() LIMIT 1')
        .then(ans => {
          const cyphertext = encryption(ans.rows[0].word, myKey);
          res.send(cyphertext);
          res.status(200);
        })
        .catch(err => {
          res.status(400);
          console.log(err);
        });

  });

  app.get('/users/:id', (req: Request, res: Response) => {
    try {
      client.query('SELECT uemail FROM users WHERE uemail = $1', [req.params], (err: Error, ans: QueryResult) => {
        if (ans.rows.length === 1) {
          // complete login because user is in database
          res.status(200);
        } else {
          res.send({message: 'email not registred'});
          res.status(400);
        }
      })
    } catch (error) {
      res.send({message: 'server could not access database'});
      res.status(400)
    }
  })

  app.post('/users', (req: Request, res: Response) => {
    try {
      if (handleRegistration(req.body) !== false) {
        res.send({message: 'Registration Succesfully Completed'});
      } else {
        res.send({message: 'This email is already registred.'})
      }
      res.status(200);
    } catch (error) {
      res.send({message: error});
      res.status(400);
    }
  });
};