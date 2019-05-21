#!/bin/bash
set -e

npm run lint
npm run test:unit
npm run build -- --report

npx serve --single dist &
trap "kill $!" EXIT
npm run test:e2e -- --headless --url http://localhost:5000
