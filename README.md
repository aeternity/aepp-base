# Base æpp [![Build Status](https://api.travis-ci.org/aeternity/aepp-base.svg?branch=develop)](https://travis-ci.org/aeternity/aepp-base/branches)

## How to get the Base æpp

* [Google Play](https://play.google.com/store/apps/details?id=com.aeternity.base)
* [App Store](https://apps.apple.com/app/base-æpp-wallet/id1458655724)
* [Web version](https://base.aepps.com/)

Also join our [Telegram channel](https://t.me/aeppbase) and our [Forum](https://forum.aeternity.com/t/base-aepp-wallet-we-would-like-your-feedback/3387).

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at http://localhost:8080/
npm run serve

# serve with hot reload at https://localhost:8080/
npm run serve -- --https

# run on android emulator or device
npm run serve:android

# run on ios emulator
npm run serve:ios

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build -- --report

# build for cordova
npm run build:cordova

# build an app file
npm run build:ios

# build an apk file
npm run build:android

# run unit tests
npm run test:unit

# run e2e tests
npm run test:e2e

# run all tests
npm test
```

## Contributing

We use the [gitflow](https://danielkummer.github.io/git-flow-cheatsheet/) workflow [this is also helpful](https://gist.github.com/JamesMGreene/cdd0ac49f90c987e45ac).
* Development of features happens in branches made from **develop** called feature/<the-feature> like feature/show-token-balance.
* When development is finished a pull request to **develop** is created. At least one person has to review the PR and when everything is fine the PR gets merged.
* The develop branch gets deployed to the [stage environment](https://stage-identity.aepps.com) by travis.
* To make a new release create a release branch called release/vX.X.X, also bump the version number in package.json in this branch.
* Create a PR to master which then also has to be accepted.
* Create a tag for this version and push the tag.
* Also merge back the changes (like the version bump) into develop.
* The master branch has to be deployed to the [production environment](https://base.aepps.com/) manually.

## Deployment

We have a stage (develop) and a production (master) branch and environments where these branches will be deployed to.
* [stage environment](https://stage-identity.aepps.com)
* [production environment](https://base.aepps.com/)

### stage
* Is used to see changes to the code in effect in a "real" environment without the fear of breaking the production environment.

### production
* Is the production environment, code lives in the "master" branch.

### other branches
* Every branch is auto-deployed on https://`branch-name`.origin.aepps.com/, with each `/`, `.` symbol in a branch name replaced by `-`.

### unsigned .apk and .app file
* Find `aetenity.app.tar.gz` file in the [latest release](https://github.com/aeternity/aepp-base/releases/latest) or download corresponding
version from a branch https://`branch-name`.origin.aepps.com/aetenity.app.tar.gz
* Find `aeternity.apk` file in the [latest release](https://github.com/aeternity/aepp-base/releases/latest) or download corresponding
version from a branch https://`branch-name`.origin.aepps.com/aeternity.apk

### bundle analyzer report
* Get bundle analyzer report on each domain by adding /report.html. Example [https://stage-identity.aepps.com/report.html](https://stage-identity.aepps.com/report.html).
