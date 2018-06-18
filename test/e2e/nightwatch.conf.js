require('babel-register')
var config = require('../../config')

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],
  custom_commands_path: ['test/e2e/custom-commands'],

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port),
        waitForConditionTimeout: 5000
      },
      use_xpath: true
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    chromePhone: {
      desiredCapabilities: {
        browserName: 'chrome-phone',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          mobileEmulation: { deviceName: 'iPhone 8' }
        }
      }
    },

    chromeTablet: {
      desiredCapabilities: {
        browserName: 'chrome-tablet',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          mobileEmulation: { deviceName: 'iPad' }
        }
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
