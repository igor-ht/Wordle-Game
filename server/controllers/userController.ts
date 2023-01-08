
import client from "../models/db";

export function handleRegistration (newUser: {name: string, email: string, password: string}) {

  try {
    client.query('SELECT uemail FROM users WHERE uemail = $1', [newUser.email])
      .then((res) => {
        if (res.rows.length === 0) {
          client.query('INSERT INTO users (uname, uemail, upassword, uregistration) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)', [newUser.name, newUser.email, newUser.password]);
        } else {
          throw ('Email already registered.')
        }})
      .catch((err) => { throw err });
  } catch (err) {
    console.log(err)
    return false
  }

};

// handle encryption and decryption of user's details
  // using cryptoData.ts

