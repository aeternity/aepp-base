const { execSync } = require('child_process');
const sharp = require('sharp'); // eslint-disable-line import/no-extraneous-dependencies

(async () => {
  const { NODE_ENV, npm_lifecycle_event: npmEvent, TRAVIS_BRANCH } = process.env;

  if (!['build', 'serve'].includes(npmEvent)) return;

  const branch = (TRAVIS_BRANCH || execSync('git rev-parse --abbrev-ref HEAD').toString())
    .replace('feature/', '');
  const showLabel = branch !== 'master';
  console.log(`Generating ${showLabel ? 'labeled ' : ''}icons`);

  const charsPerLine = 12;
  const formattedBranch = branch.replace('feature/', '').replace(/[-/]/g, ' ');
  const lastIndex = formattedBranch.slice(0, charsPerLine).lastIndexOf(' ');
  const firstLine = formattedBranch.slice(0, lastIndex === -1 ? charsPerLine : lastIndex);
  const secondLine = formattedBranch.slice(firstLine.length).trimLeft();

  const nodeEnv = NODE_ENV.replace('production', 'prod');
  const sourceIcon = './resources/icon.unlabeled.png';

  const appIcons = [
    { path: './public/favicons/android-chrome-192x192.png', side: 192, platform: 'web' },
    { path: './public/favicons/android-chrome-512x512.png', side: 512, platform: 'web' },
    { path: './public/favicons/apple-touch-icon.png', side: 180, platform: 'web' },
    { path: './resources/icon.png', side: 1024, platform: 'cordova' },
  ];

  const labelSvg = ({ platform }) => Buffer.from(`
    <svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
      <style>
        rect {
          fill: #000;
          fill-opacity: .5;
        }

        text {
          text-anchor: middle;
          font-family: sans-serif;
          font-size: 30px;
          fill: #fff;
        }
      </style>
      <rect x="0" y="0" width="200" height="100" />
      <text x="100" y="25">${firstLine}</text>
      <text x="100" y="55">${secondLine}</text>
      <text x="100" dy="85">${[platform, nodeEnv].filter(a => a).join(', ')}</text>
    </svg>`);
  await Promise.all(appIcons.map(async ({ path, side, platform }) => {
    const result = sharp(sourceIcon).resize(side);
    if (showLabel) {
      result.composite([{
        input: await sharp(labelSvg({ platform }), { density: 300 })
          .resize(side).toBuffer(),
      }]);
    }
    await result.toFile(path);
  }));
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
