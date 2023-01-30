import { describe, expect, test } from '@jest/globals';
import { createToken, verifyJWT } from '../src/Auth/authApi';

describe('Testing JWT auth', () => {
  let user = { email: '', password: ''};
  let token = '';
  beforeEach(() => {
    user = { email: 'test@test.com', password: '123456' };
    token = createToken(user);
  });

  test('Create JWT', () => {
    expect(token).toBeDefined();
  });

  test('Verify JWT', () => {
    const { email, iat, exp } = verifyJWT(token);
    expect(email).toBe(user.email);
  });
})