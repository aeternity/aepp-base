#!/bin/sh

npm config set unsafe-perm true # https://github.com/npm/npm/issues/17346
npm install
npx cordova telemetry off

npm run build:cordova
npx cordova plugin add git+https://$GIT_USERNAME:$GIT_PASSWORD@github.com/aeternity/cordova-plugin-airgap-secure-storage.git#temp
npx cordova prepare android
npm run gen:cordova-resources
npx cordova build android -- --gradleArg=--no-daemon
