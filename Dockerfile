FROM node:20-alpine as aepp-aepp-base-build
WORKDIR /app
RUN apk add make g++ python3 git

ADD package*.json ./
# TODO: remove --legacy-peer-deps after updating dependencies
RUN npm ci --legacy-peer-deps

COPY . .

ARG REVISION
ENV VUE_APP_REVISION $REVISION

# TODO: remove legacy openssl after updating @vue/cli
RUN NODE_OPTIONS=--openssl-legacy-provider npm run build -- --report

FROM nginx:1.24-alpine
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/override-env.sh /docker-entrypoint.d
COPY --from=aepp-aepp-base-build /app/dist /usr/share/nginx/html
RUN cp /usr/share/nginx/html/index.html /usr/share/nginx/html/index.template.html
