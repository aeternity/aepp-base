FROM node:18-alpine as aepp-aepp-base-build
WORKDIR /app
RUN apk add make g++ python3 git

ADD package*.json ./
# TODO: remove --legacy-peer-deps after updating dependencies
RUN npm ci --legacy-peer-deps

COPY . .

ARG VUE_APP_NETWORK_NAME
ARG VUE_APP_NODE_URL
ARG VUE_APP_MDW_URL
ARG VUE_APP_EXPLORER_URL
ARG VUE_APP_COMPILER_URL
ARG VUE_APP_REMOTE_CONNECTION_BACKEND_URL

# TODO: remove legacy openssl after updating @vue/cli
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build

FROM nginx:1.24-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=aepp-aepp-base-build /app/dist /usr/share/nginx/html
