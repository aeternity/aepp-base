# Æternity identity

The identity provider is a relatively simple app, that allows apps, which are loaded
via an iframe to interact with the ethereum network by providing an web3 instance.
To make this happen only a couple of things need to be paid attention to; first of
all since the apps are loaded via an iframe, same origin policies apply. To load
the parent web3 instance you can modify your usual check to detect metamask like
this:

```javascript
window.addEventListener('load', function() {
  if (window.web3) {
    web3.setProvider(window.web3.currentProvider);
  } else if (window.parent !== window && window.parent.web3 !== undefined) {
    web3.setProvider(window.parent.web3.currentProvider);
  }
});
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
