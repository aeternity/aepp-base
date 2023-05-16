const path = require('path');
const fs = require('fs');
const { defineConfig } = require('cypress');
// TODO: remove after fixing https://github.com/import-js/eslint-plugin-import/issues/1810
// eslint-disable-next-line import/no-unresolved
const { initPlugin } = require('@frsource/cypress-plugin-visual-regression-diff/plugins');

module.exports = defineConfig({
  video: false,
  fixturesFolder: 'tests/e2e/fixtures',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  env: process.env.CI === 'true' ? {} : {
    pluginVisualRegressionImagesPath: '{spec_path}/__image_snapshots_local__',
  },
  e2e: {
    specPattern: 'tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'tests/e2e/support/index.js',
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      initPlugin(on, config);

      const videoPath = path.resolve('tests/e2e/fixtures/qr-code-videos/video.y4m');
      const defaultVideoPath = path.resolve('tests/e2e/fixtures/qr-code-videos/default.y4m');

      on('before:browser:launch', (browser, launchOptions) => {
        if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
        fs.linkSync(defaultVideoPath, videoPath);

        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push(`--use-file-for-fake-video-capture=${videoPath}`);
        }
        return launchOptions;
      });

      on('task', {
        changeVideoSource(videoSource) {
          const sourceVideoPath = path.join('tests/e2e/fixtures/qr-code-videos', videoSource);
          fs.unlinkSync(videoPath);
          fs.linkSync(sourceVideoPath, videoPath);
          return null;
        },
      });
    },
  },
});
