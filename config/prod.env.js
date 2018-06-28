'use strict'
module.exports = {
  NODE_ENV: '"production"',
  IS_STAGE: process.env.TRAVIS_BRANCH === 'stage',
  IS_CORDOVA: process.env.IS_CORDOVA === 'true'
}
