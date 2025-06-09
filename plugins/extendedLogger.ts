    },
    configureServer(server) {
      server.httpServer?.once('listening', () => {
        const info = server.httpServer?.address();
        if (typeof info === 'object' && info) {
          const host = info.address === '::' ? 'localhost' : info.address;
          const protocol = server.config.server.https ? 'https' : 'http';
    },
  };
}
