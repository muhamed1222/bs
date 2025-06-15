import 'ts-node/register';
import request from 'supertest';
import app from '../server/index';
import { describe, it, expect } from 'vitest';

describe('slug endpoints', () => {
  it('rejects invalid slug', async () => {
    const res = await request(app).get('/api/check-slug?slug=bad slug');
    expect(res.status).toBe(400);
  });

  it('registers and prevents duplicate slug', async () => {
    let res = await request(app)
      .post('/api/register-slug')
      .send({ slug: 'unique' });
    expect(res.status).toBe(200);
    res = await request(app)
      .post('/api/register-slug')
      .send({ slug: 'unique' });
    expect(res.status).toBe(409);
  });
});
