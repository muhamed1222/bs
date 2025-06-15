import express from 'express';
import { initRest } from './rest';
import { oauthRouter } from './oauth';
import { initGraphQL } from './graphql';
import { initSSR } from './ssr';
import { initSession } from './sessionStore';

export const app = express();

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
process.on('warning', (warning) => {
  console.warn(warning.name, warning.message, warning.stack);
});

app.use(express.json());
await initSession(app);

app.use(oauthRouter);
initRest(app);
await initGraphQL(app);
initSSR(app);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Express error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});
