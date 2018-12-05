# Æternity identity

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at http://localhost:8080/
npm run serve

# serve with hot reload at https://localhost:8080/
npm run serve -- --https

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build -- --report

# run unit tests
npm run test:unit

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
* The master branch is deployed to the [live environment](https://identity.aepps.com) by travis.

## Live vs. Stage

We have a stage (develop) and a live (master) branch and environments where these branches will be deployed to.
* [stage environment](https://stage-identity.aepps.com)
* [live environment](https://identity.aepps.com)

### stage
* Is used to see changes to the code in effect in a "real" environment without the fear of breaking the live environment.

### live
* Is the live environment, code lives in the "master" branch
