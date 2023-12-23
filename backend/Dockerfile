FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src src
EXPOSE 80
ENV PORT=80

CMD [ "node", "src/main.js" ]
