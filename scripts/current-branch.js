const { execSync } = require('child_process');

const branch = process.env.TRAVIS_BRANCH
  || execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

module.exports = branch;
