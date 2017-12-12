module.exports = {
  NODE_ENV: '"production"',
  SKIP_SECURITY: process.env.TRAVIS_BRANCH === 'stage' ? true : false,
  IS_STAGE: process.env.TRAVIS_BRANCH === 'stage'
}
