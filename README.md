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

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
