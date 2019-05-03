#!/bin/bash
set -e

npm install

if [[ $TRAVIS_OS_NAME == "osx" ]]; then
  HOMEBREW_NO_AUTO_UPDATE=1 brew install imagemagick
  mkdir www
  npx cordova prepare ios
fi
