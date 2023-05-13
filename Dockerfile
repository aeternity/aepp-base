FROM node:18-alpine
WORKDIR /app

COPY backend/package*.json ./
RUN npm ci

COPY backend/src src
EXPOSE 80
ENV PORT=80

CMD [ "npm", "start" ]
