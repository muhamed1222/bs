import { Router } from 'express';
import OAuth2Server from 'oauth2-server';
import { authenticate } from './userStore';

const oauth = new OAuth2Server({
  model: {
    async getClient(clientId: string, clientSecret: string) {
      if (clientId === 'client' && clientSecret === 'secret') {
        return { id: 'client', grants: ['client_credentials'] } as OAuth2Server.Client;
      }
      return null;
    },
    async saveToken(token: OAuth2Server.Token, client: OAuth2Server.Client, user: OAuth2Server.User) {
      return { ...token, client, user } as OAuth2Server.Token;
    },
    async getUser(username: string, password: string) {
      const record = authenticate(username, password);
      if (record) {
        return { id: record.id } as OAuth2Server.User;
      }
      return null;
    },
    async getAccessToken(accessToken: string) {
      return {
        accessToken,
        client: { id: 'client', grants: ['client_credentials'] },
        user: { id: 'user' },
        accessTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
      } as OAuth2Server.Token;
    },
    verifyScope() {
      return Promise.resolve(true);
    },
  },
});

export const oauthRouter = Router();

oauthRouter.post('/oauth/token', (req, res) => {
  const request = new OAuth2Server.Request(req);
  const response = new OAuth2Server.Response(res);
  oauth
    .token(request, response)
    .then((token: OAuth2Server.Token) => {
      res.json(token);
    })
    .catch((err: OAuth2Server.OAuthError | Error) => {
      const status = err instanceof OAuth2Server.OAuthError ? err.code : 500;
      res.status(status).json(err);
    });
});
