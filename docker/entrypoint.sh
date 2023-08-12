#!/bin/sh

cd /backend
npm start &

# source https://github.com/nginxinc/docker-nginx/blob/3aac9b12463cf031037f7e21b3857f9a4bec3f28/stable/alpine-slim/Dockerfile#L122
/docker-entrypoint.sh nginx -g "daemon off;" &

wait -n
exit $?
