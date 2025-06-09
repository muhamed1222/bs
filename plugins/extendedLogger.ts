import type { Plugin, Logger } from 'vite';

export default function extendedLogger(): Plugin {
  let logger: Logger;

  return {
    name: 'extended-logger',
    configResolved(resolved) {
      logger = resolved.logger;
      logger.info(`[vite] запуск команды: ${resolved.command}`);
      logger.info(`[vite] корневая папка: ${resolved.root}`);
    },
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const info = server.httpServer?.address();
        if (typeof info === 'object' && info) {
          const host = info.address === '::' ? 'localhost' : info.address;
          const protocol = server.config.server.https ? 'https' : 'http';
          logger.info(`[vite] сервер запущен: ${protocol}://${host}:${info.port}`);
        }
      });

      server.middlewares.use((req, _res, next) => {
        logger.info(`[vite] ${req.method} ${req.url}`);
        next();
      });

      server.middlewares.use((err: any, _req: any, _res: any, next: any) => {
        if (err) {
          logger.error(`[vite] ошибка: ${err.message}`);
        }
        next(err);
      });
    },
    buildStart() {
      logger.info('[vite] начало сборки');
    },
    buildEnd() {
      logger.info('[vite] сборка завершена');
    },
  };
}
