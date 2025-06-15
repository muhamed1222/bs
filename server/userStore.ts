export interface UserRecord {
  id: string;
  password: string;
}

export const users: Record<string, UserRecord> = {
  user: { id: 'user', password: 'pass' },
  test: { id: 'test', password: 'testpass' },
};
