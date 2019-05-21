#!/bin/bash
set -e

npm ci

if [[ $ANDROID_HOME != "" || $TRAVIS_OS_NAME == "osx" ]]; then
  mkdir www

  if [[ $TRAVIS_OS_NAME == "osx" ]]; then
    npx cordova prepare ios
  else
    npx cordova prepare android
  fi
fi
