import createServer from './server.js';

// eslint-disable-next-line no-console
createServer(process.env.PORT ?? 8079, console.log);
