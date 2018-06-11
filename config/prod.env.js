'use strict'
module.exports = {
  NODE_ENV: '"production"',
  IS_STAGE: process.env.TRAVIS_BRANCH === 'stage'
}
