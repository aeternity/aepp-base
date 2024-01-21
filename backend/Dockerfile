FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY src src
EXPOSE 80
ENV PORT=80

ARG REVISION
ENV REVISION $REVISION

CMD [ "node", "src/main.js" ]
