'use strict'

const { TARGET_DEVICE } = process.env
const IS_CORDOVA = process.env.IS_CORDOVA === 'true'

module.exports = {
  NODE_ENV: '"production"',
  IS_CORDOVA,
  TARGET_DEVICE:
    TARGET_DEVICE && JSON.stringify(TARGET_DEVICE) ||
    IS_CORDOVA && '"mobile"' ||
    undefined
}
