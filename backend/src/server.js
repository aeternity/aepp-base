import Server from 'socket.io';
import sendPushNotification from './send-push-notification';

export default (port) => {
  const io = Server(port);

  const getGroupName = leaderKey => `${leaderKey}-group`;
  const leaderKeys = {};
  const leaderPushApiSubscriptions = {};
  const leaderMessages = {};

  // eslint-disable-next-line no-underscore-dangle
  io.engine.generateId = req => req._query.key || 'invalid-id';

  io.sockets.use((socket, next) => {
    const { key } = socket.handshake.query;
    if (!key) next(new Error('Key is missed'));
    else if (io.sockets.sockets[key]) {
      next(new Error(`Already connected with this key: ${key}`));
    } else next();
  });

  io.on('connection', (socket) => {
    const { key, pushApiSubscription } = socket.handshake.query;

    socket.on('message-to-all', message =>
      socket
        .to(getGroupName(pushApiSubscription ? key : leaderKeys[key]))
        .emit('message', message));

    if (pushApiSubscription) {
      (leaderMessages[key] || []).forEach(messageToLeader =>
        socket.emit('message-from-follower', messageToLeader.key, messageToLeader.message));
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
        const fSocket = io.sockets.sockets[fKey];
        if (fSocket) {
          fSocket.join(groupName);
          fSocket.emit('added-to-group');
          socket.emit('follower-connected', fKey);
        }
      });

      socket.on('remove-follower', async (fKey) => {
        delete leaderKeys[fKey];
        const fSocket = io.sockets.sockets[fKey];
        if (fSocket) {
          fSocket.leave(groupName);
          fSocket.emit('removed-from-group');
        }
      });

      socket.on('get-all-followers', fn => fn(Object.entries(leaderKeys)
        .filter(([, v]) => v === key)
        .map(([k]) => k)
        .reduce((p, followerId) => Object.assign(
          {},
          p,
          { [followerId]: { connected: !!io.sockets.sockets[followerId] } },
        ), {})));

      socket.on('message-to-follower', (fKey, message) =>
        socket.to(fKey).emit('message-from-leader', message));

      socket.on('disconnect', () =>
        socket.to(getGroupName(key)).emit('leader-disconnected'));
    } else {
      if (leaderKeys[key]) {
        socket.join(getGroupName(leaderKeys[key]));
        socket.emit('added-to-group');
        socket.to(leaderKeys[key]).emit('follower-connected', key);
      }

      socket.on('message-to-leader', async (message) => {
        const lKey = leaderKeys[key];

        if (!io.sockets.sockets[lKey]) {
          leaderMessages[lKey] = leaderMessages[lKey] || [];
          leaderMessages[lKey].push({ key, message });
          await sendPushNotification(leaderPushApiSubscriptions[lKey]);
        }

        socket.to(lKey).emit('message-from-follower', key, message);
      });

      socket.on('leave-group', () => {
        const leaderKey = leaderKeys[key];
        if (!leaderKey) {
          socket.emit('exception', 'Not in a group');
          return;
        }
        socket
          .leave(getGroupName(leaderKey))
          .emit('removed-from-group');
        socket.to(leaderKey).emit('follower-removed', key);
        delete leaderKeys[key];
      });

      socket.on('disconnect', () =>
        socket.to(leaderKeys[key]).emit('follower-disconnected', key));
    }
  });

  return io;
};
