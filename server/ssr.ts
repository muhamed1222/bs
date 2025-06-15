import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import type { HelmetServerState } from 'react-helmet-async';
import PublicProfilePage from '../pages/PublicProfilePage';
import { fetchPublicProfile, getPublicProfileSlugs } from '../mock/profiles';
import { usedSlugs } from './rest';

export function initSSR(app: import('express').Express) {
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const slugs = new Set([...getPublicProfileSlugs(), ...usedSlugs]);
    const urls = Array.from(slugs)
      .map((slug) => `<url><loc>${baseUrl}/public-profile/${slug}</loc></url>`)
      .join('');
    const xml =
      `<?xml version="1.0" encoding="UTF-8"?>` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
    res.type('application/xml').send(xml);
  });

  app.get('/public-profile/:slug', async (req, res) => {
    const { slug } = req.params;
    const data = await fetchPublicProfile(slug);
    const helmetContext: { helmet?: HelmetServerState } = {};
    const html = ReactDOMServer.renderToString(
      React.createElement(
        HelmetProvider,
        { context: helmetContext },
        React.createElement(
          StaticRouter,
          { location: req.url },
          React.createElement(PublicProfilePage, { initialData: data })
        )
      )
    );
    const { helmet } = helmetContext;
    res.set('Cache-Control', 'public, max-age=300');
    res.send(
      `<!doctype html><html lang="ru"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>${
        helmet?.title.toString() || `<title>${data?.name || 'Профиль'}</title>`
      }${helmet?.meta.toString() || ''}<link rel="stylesheet" href="/index.css" /></head><body><div id="root">${html}</div><script type="module" src="/index.tsx"></script></body></html>`
    );
  });
}
