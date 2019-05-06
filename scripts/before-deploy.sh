#!/bin/bash
set -e

if [[ $TRAVIS_OS_NAME != "osx" ]]; then
  VUE_APP_SHOW_VOTING_APP=true npm run build
else
  npm run build:cordova
  npm run gen:cordova-resources
  npx cordova build ios
  tar -czvf aeternity.app.tar.gz -C platforms/ios/build/emulator Base\ æpp.app
fi
