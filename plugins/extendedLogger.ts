import type { Plugin } from 'vite';

export default function extendedLogger(): Plugin {
  return {
    name: 'extended-logger',
    config(config, { command }) {
      console.info(`[vite] запуск команды: ${command}`);
      console.info(`[vite] корневая папка: ${config.root || process.cwd()}`);
    },
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const info = server.httpServer?.address();
        if (typeof info === 'object' && info) {
          const host = info.address === '::' ? 'localhost' : info.address;
          const protocol = server.config.server.https ? 'https' : 'http';
          console.info(`[vite] сервер запущен: ${protocol}://${host}:${info.port}`);
        }
      });
    },
    buildEnd() {
      console.info('[vite] сборка завершена');
    },
  };
}
