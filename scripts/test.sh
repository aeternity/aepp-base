#!/bin/bash
set -e

npm run lint
npm run test:unit
npm run build -- --report

npx serve --single dist &
trap "kill $!" EXIT
npm run test:e2e -- --headless --url http://localhost:5000

if [[ $TRAVIS_BRANCH == "develop" ]]; then
  npm run storybook:build
  mv storybook-static dist/storybook
fi
