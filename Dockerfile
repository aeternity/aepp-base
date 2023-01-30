FROM node:14.7-alpine as aepp-aepp-base-build
WORKDIR /app
RUN apk add make gcc g++ python git

ADD package*.json ./
RUN npm install

COPY . .

ARG VUE_APP_NETWORK_NAME
ARG VUE_APP_NODE_URL
ARG VUE_APP_MDW_URL
ARG VUE_APP_EXPLORER_URL
ARG VUE_APP_COMPILER_URL
ARG VUE_APP_REMOTE_CONNECTION_BACKEND_URL

RUN npm run build

FROM nginx:1.13.9-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf 
COPY --from=aepp-aepp-base-build /app/dist /usr/share/nginx/html
