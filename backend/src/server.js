import { Server } from 'socket.io';
import sendPushNotification from './send-push-notification.js';

export default (port, log = () => {}) => {
  const io = new Server(port, {
    cors: { origin: '*' },
  });

  const getGroupName = (leaderKey) => `${leaderKey}-group`;
  const leaderKeys = {};
  const leaderPushApiSubscriptions = {};
  const leaderMessages = {};

  io.sockets.use((socket, next) => {
    const { key } = socket.handshake.auth;
    if (!key) next(new Error('Key is missed'));
    else if (io.sockets.sockets.get(key)) {
      next(new Error(`Already connected with this key: ${key}`));
    } else {
      // based on https://github.com/socketio/socket.io/discussions/4190#discussioncomment-1719254
      socket.id = key; // eslint-disable-line no-param-reassign
      next();
    }
  });

  io.on('connection', (socket) => {
    const { key, pushApiSubscription } = socket.handshake.auth;

    socket.on('message-to-all', (message) => socket
      .to(getGroupName(pushApiSubscription ? key : leaderKeys[key]))
      .emit('message', message));

    if (pushApiSubscription) {
      leaderMessages[key] ??= [];
      leaderMessages[key].forEach((messageToLeader) => socket
        .emit('message-from-follower', messageToLeader.key, messageToLeader.message));
      log([
        `Connected leader with key ${key}`,
        `push api ${pushApiSubscription.slice(0, 30)}`,
        `sent ${leaderMessages[key].length} offline messages`,
      ].join(', '));
      delete leaderMessages[key];

      const groupName = getGroupName(key);
      socket.join(groupName);
      leaderPushApiSubscriptions[key] = pushApiSubscription;

      socket.on('add-follower', async (fKey) => {
        if (leaderKeys[fKey]) {
          socket.emit('exception', `Client with key ${fKey} is already added to group`);
          return;
        }
        leaderKeys[fKey] = key;
        const fSocket = io.sockets.sockets.get(fKey);
        if (fSocket) {
          fSocket.join(groupName);
          fSocket.emit('added-to-group');
          socket.emit('follower-connected', fKey);
        }
        log(`Follower ${fKey} added to ${groupName}`);
      });

      socket.on('remove-follower', async (fKey) => {
        delete leaderKeys[fKey];
        const fSocket = io.sockets.sockets.get(fKey);
        if (fSocket) {
          fSocket.leave(groupName);
          fSocket.emit('removed-from-group');
        }
        log(`Follower ${fKey} removed from ${groupName}`);
      });

      socket.on('get-all-followers', (fn) => {
        const entries = Object.entries(leaderKeys)
          .filter(([, v]) => v === key)
          .map(([followerId]) => [followerId, { connected: io.sockets.sockets.has(followerId) }]);
        fn(Object.fromEntries(entries));
      });

      socket.on('message-to-follower', (fKey, message) => socket
        .to(fKey).emit('message-from-leader', message));

      socket.on('disconnect', () => {
        socket.to(getGroupName(key)).emit('leader-disconnected');
        log(`Disconnected leader with key ${key}`);
      });
    } else {
      if (leaderKeys[key]) {
        const groupName = getGroupName(leaderKeys[key]);
        socket.join(groupName);
        socket.emit('added-to-group');
        socket.to(leaderKeys[key]).emit('follower-connected', key);
        log(`Connected follower with key ${key}, added to group ${groupName}`);
      } else log(`Connected follower with key ${key}, no group`);

      socket.on('message-to-leader', async (message) => {
        const lKey = leaderKeys[key];

        if (!io.sockets.sockets.get(lKey)) {
          leaderMessages[lKey] = leaderMessages[lKey] || [];
          leaderMessages[lKey].push({ key, message });
          try {
            await sendPushNotification(leaderPushApiSubscriptions[lKey]);
            log(`Push notification sent to ${lKey}`);
          } catch (error) {
            log(`Failed to send push notification to ${lKey}: ${error.message}`);
          }
        }

        socket.to(lKey).emit('message-from-follower', key, message);
      });

      socket.on('leave-group', () => {
        const leaderKey = leaderKeys[key];
        if (!leaderKey) {
          socket.emit('exception', 'Not in a group');
          return;
        }
        socket.leave(getGroupName(leaderKey));
        socket.emit('removed-from-group');
        socket.to(leaderKey).emit('follower-removed', key);
        delete leaderKeys[key];
        log(`Follower ${key} left ${getGroupName(leaderKey)}`);
      });

      socket.on('disconnect', () => {
        socket.to(leaderKeys[key]).emit('follower-disconnected', key);
        log(`Disconnected follower with key ${key}`);
      });
    }
  });

  log(`Listening on ${port} port`);

  const interval = setInterval(() => {
    const leaders = Object.keys(leaderPushApiSubscriptions).length;
    const followers = Object.keys(leaderKeys).length;
    log(`Connected ${io.engine.clientsCount} clients, recorded ${leaders} leaders, ${followers} followers`);
  }, 20000);
  const ioClose = io.close;
  io.close = function closeHandler(...args) {
    log('Stopping server');
    clearInterval(interval);
    return ioClose.call(this, ...args);
  };

  return io;
};
