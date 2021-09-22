FROM node:14.7-alpine as aepp-aepp-base-build
WORKDIR /app
RUN apk add make gcc g++ python git
COPY  . .
RUN npm install
RUN npm run build

FROM nginx:1.13.7-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf 
COPY --from=aepp-aepp-base-build /app/dist /usr/share/nginx/html
