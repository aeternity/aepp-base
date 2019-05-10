#!/bin/bash
set -e

if [[ $TRAVIS_OS_NAME != "osx" ]]; then
  npm run lint
  npm run test:unit
  npm run build -- --report

  npx serve dist &
  trap "kill $!" EXIT
  npm run test:e2e -- --headless --url http://localhost:5000
fi
