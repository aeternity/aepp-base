#!/bin/sh
set -e

envsubst < /usr/share/nginx/html/index.template.html > /usr/share/nginx/html/index.html
