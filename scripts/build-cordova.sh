#!/bin/bash
set -e

npm run build:cordova

if [[ $TRAVIS_OS_NAME == "osx" ]]; then
  npx cordova build ios
  tar -czvf aeternity.app.tar.gz -C platforms/ios/build/emulator Base\ æpp.app
else
  npx cordova build android
  mv platforms/android/app/build/outputs/apk/debug/app-debug.apk ./aeternity.apk
fi
