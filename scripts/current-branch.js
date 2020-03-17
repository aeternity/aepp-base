const { execSync } = require('child_process');

const { TRAVIS, TRAVIS_BRANCH, TRAVIS_TAG } = process.env;

const travisBranch = TRAVIS_BRANCH === TRAVIS_TAG ? 'master' : TRAVIS_BRANCH;

const branch = TRAVIS
  ? travisBranch
  : execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

module.exports = branch;
