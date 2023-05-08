FROM node:14-alpine

ENV NODE_ENV=production
ENV NODE_PATH=/usr/local/lib/node_modules

COPY backend/package.json .
RUN npm install

COPY backend/src/main.js .
COPY backend/src/send-push-notification.js .
COPY backend/src/server.js .

CMD ["node", "main.js"]

EXPOSE 80
