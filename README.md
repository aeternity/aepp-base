# Æternity identity

The identity provider is a relatively simple app, that allows apps, which are loaded
via an iframe to interact with the ethereum network by providing an web3 instance.
To make this happen only a couple of things need to be paid attention to; first of
all apps need to be run on localhost, <subdomain>.aepps.com or <subdomain>.aepps.dev
for security reasons. To get a web3 instance which talks to the identity aepp you
need to use the [@aeternity/id-manager-provider](https://www.npmjs.com/package/@aeternity/id-manager-provider/).

```javascript
import IdManagerProvider from '@aeternity/id-manager-provider'
// ...
function initWeb3() {
    let web3;
    let idManager = new IdManagerProvider()
    idManager.checkIdManager().then( (idManagerPresent) => {
        if (idManagerPresent ) {
            web3 = new Web3(idManager.web3.currentProvider)
        } else if (typeof window.web3 !== 'undefined') { // Metamask
            web3 = new Web3(window.web3.currentProvider);
        } else {
            web3 = null;
        }

        if (web3) {
            // Ready
        } else {
            // Not Ready
        }

    })
}
```

You also need to make sure that there are no synchronous calls to any of the web3
functions which issue API calls, e.g. instead of `web3.eth.accounts` use `web.eth.getAccounts(function (err, accounts) {...})`.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## Contributing

Changes should be made in an extra fork or branch. Then create a pull request to the **stage** branch. The pull request will be reviewed and if the changes are accepted they are deployed to the [stage environment](https://stage-identity.aepps.com) by travis. If there are no conflicts in stage the stage branch will be merged into master. The master branch is deployed to the [live environment](http://stage-identity.aepps.com) by travis. Changes are never made directly into the master branch.

## Live vs. Stage

We have a stage and a live branch and environments where these branches will be deployed to.
* [stage environment](https://stage-identity.aepps.com)
* [live environment](http://stage-identity.aepps.com)

### stage
* Is used to see changes to the code in effect in a "real" environment without the fear of breaking the live environment.
* Is password protected (???)
* http and https are allowed
* The URL of dapps running in the identity manager is not checked
* Some of our æpps included in the identity manager point to the staging version of those æpps (e.g. [notary stage](https://stage-notary.aepps.com))

### live
* Is the live environment, code lives in the "master" branch
* https is enforced
* dapps must use https
* dapps running in the identity manager must be running on <name>.aepps.com, localhost<:port?> or <name>.ngrok.io

### Developing with the identity manager

Since the accepted URLs are very restricted and https is enforced you can use the stage environment during development. You need to configure the [id-manager-provider](https://www.npmjs.com/package/@aeternity/id-manager-provider/) to either use the stage environment by changing the *idManagerHost* option during initialization or passing the *skipSecurity* option.
