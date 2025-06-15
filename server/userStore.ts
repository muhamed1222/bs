import { createHash } from 'node:crypto';

export interface UserRecord {
  id: string;
  passwordHash: string;
}

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

export const users: Record<string, UserRecord> = {
  user: { id: 'user', passwordHash: hashPassword('pass') },
  test: { id: 'test', passwordHash: hashPassword('testpass') },
};

export function addUser(email: string, password: string): UserRecord {
  const record = { id: email, passwordHash: hashPassword(password) };
  users[email] = record;
  return record;
}

export function authenticate(email: string, password: string): UserRecord | null {
  const record = users[email];
  if (record && record.passwordHash === hashPassword(password)) {
    return record;
  }
  return null;
}
