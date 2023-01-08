import {describe, expect, test, jest } from '@jest/globals';

describe('create new User', () => {

  const endpoint = 'http://localhost:5000/user';

  test('Create new User with post method', async () => {
    const createUser = await fetch(`${endpoint}/create`, {
      method: 'post',
      body: JSON.stringify({ uname: 'Igor', uemail: 'bla@bla.com', upassword: 'oi', ucpassword: 'oi'}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const ans = await createUser.json()
    console.log(createUser);
    expect( createUser.status).toBe(200);
  });

  test('Create new User but sending wrong user object', async () => {
    const createUser = await fetch(`${endpoint}/create`, {
      method: 'post',
      body: JSON.stringify({ uname: 'Igor'}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    expect(createUser.status).toBe(400);
  });


});