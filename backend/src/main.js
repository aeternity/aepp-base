import createServer from './server.js';

// eslint-disable-next-line no-console
const io = createServer(process.env.PORT ?? 8079, console.log);

process.on('SIGINT', () => io.close());
process.on('SIGTERM', () => io.close());
