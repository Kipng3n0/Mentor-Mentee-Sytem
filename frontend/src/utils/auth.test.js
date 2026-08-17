import { describe, expect, test } from 'vitest';
import { getUserRole, isAuthorized } from './auth';

const tokenFor = (payload) => {
  const encodedPayload = btoa(JSON.stringify(payload));
  return `header.${encodedPayload}.signature`;
};

describe('authentication utilities', () => {
  test('gets the role encoded in the access token', () => {
    localStorage.setItem('accessToken', tokenFor({ id: 1, role: 'mentor' }));

    expect(getUserRole()).toBe('mentor');
  });

  test('returns null without an access token and checks the stored role', () => {
    expect(getUserRole()).toBeNull();

    localStorage.setItem('role', 'mentee');
    expect(isAuthorized('mentee')).toBe(true);
    expect(isAuthorized('mentor')).toBe(false);
  });
});
