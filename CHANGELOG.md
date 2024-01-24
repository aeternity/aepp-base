# Changelog

## [1.1.0](https://www.github.com/aeternity/aepp-base/compare/v1.0.3...v1.1.0) (2024-01-24)


### Features

* allow navigation gestures on ios ([94b47be](https://www.github.com/aeternity/aepp-base/commit/94b47be2c490f3b67b5ca605becebc6a2b40e099))
* override backend url through env variables after build ([f34d70a](https://www.github.com/aeternity/aepp-base/commit/f34d70a7c0ab8f356d06a4fc396c8ed32e12f62e))
* override network through env variables after build ([5d442c0](https://www.github.com/aeternity/aepp-base/commit/5d442c0bfef24b34357c461fc2de24de00b9a9de))


### Bug Fixes

* `pointers` format returned by middleware ([b31d6cb](https://www.github.com/aeternity/aepp-base/commit/b31d6cb7b0eab76bc0a2425d71ba1dda91aaedaf))
* **backend:** stop server correctly in Docker and if ctrl+c pressed ([389eaf8](https://www.github.com/aeternity/aepp-base/commit/389eaf8251743654364abc3bfa34ca35f511fe05))
* don't provide internal url that is not used and working ([0374d8d](https://www.github.com/aeternity/aepp-base/commit/0374d8d3b3856c8280dd74c5ff4058da4921f35d))
* don't reload app right after first load ([de9092a](https://www.github.com/aeternity/aepp-base/commit/de9092afcb2bab5cbd9e0b37cf957dd7f4f534e5))
* duplicate navigation to /transfer error ([696bb76](https://www.github.com/aeternity/aepp-base/commit/696bb76e1b70fcc9363e971d991acd07f2353da5))
* fetch metadata over https to avoid mixed content error ([3d10470](https://www.github.com/aeternity/aepp-base/commit/3d10470f215f9cadb9e4d3bf90e8986821c8f042))
* icons path in webmanifest ([75b0d2c](https://www.github.com/aeternity/aepp-base/commit/75b0d2c5fac5afcd71d44cb0c825cef7dd2f9309))
* parameter numeration in deeplinks ([981df93](https://www.github.com/aeternity/aepp-base/commit/981df9369fe8e5cb58d7da0a06dfc602d2e50791))
* path to apps registry ([7fc61b3](https://www.github.com/aeternity/aepp-base/commit/7fc61b324dff2bdc620315593647617dac862fef))
* pointer setting in NameDetails ([2230bfc](https://www.github.com/aeternity/aepp-base/commit/2230bfc96f09983c11aa21a620e5794a2634132d))
* race condition between subscribing and service worker registration ([455fb84](https://www.github.com/aeternity/aepp-base/commit/455fb8434db48d025739cbd835e43e59589f172d))
* SDK usage in AirGap code parsing ([3652d3e](https://www.github.com/aeternity/aepp-base/commit/3652d3e86c63707ea71f1aab7accbae0e1d136d4))
* show all bids using v2 middleware api ([29038fa](https://www.github.com/aeternity/aepp-base/commit/29038fab34d62ff818d2437630e2ae586283ae5c))
* styles of initialization errors ([aca40e6](https://www.github.com/aeternity/aepp-base/commit/aca40e67cd8b312e546e2b70301da4f57f921ae7))
* switch to a fixed deployment of home page ([8d5e823](https://www.github.com/aeternity/aepp-base/commit/8d5e823d0b15d64b614a461f179cdda4722f4c54))
* use consistent red color across the app ([8ff1b02](https://www.github.com/aeternity/aepp-base/commit/8ff1b02920054156969dacfc2ae509eaeaea2a8e))
* use Google Fonts instead of rsms.me (down) ([c7b3564](https://www.github.com/aeternity/aepp-base/commit/c7b35649790936ba1b22b58b0c05227b78e3db6a))


### CI / CD

* don't copy `node_modules` to container ([afe4d97](https://www.github.com/aeternity/aepp-base/commit/afe4d97ee57c3beedd5c475ed2af8b8580f1959d))
* generate bundle report in Docker build ([a03ca8e](https://www.github.com/aeternity/aepp-base/commit/a03ca8ec06b2db9d1fc1708f63f8d6a3ae7e7ee5))
* patch gh action output steps ([a7f0f38](https://www.github.com/aeternity/aepp-base/commit/a7f0f380d79e9397fa6b655ee8ed29290b69e433))
* run a local compiler ([3433cb1](https://www.github.com/aeternity/aepp-base/commit/3433cb13259322a22aa258251689b163f01e86f9))
* run tests in GH action ([41c6f33](https://www.github.com/aeternity/aepp-base/commit/41c6f33d6de14198574b9dad9d1ef33f3804fa8c))
* Switch to AF github actions shared workflows ([#1515](https://www.github.com/aeternity/aepp-base/issues/1515)) ([7293f9a](https://www.github.com/aeternity/aepp-base/commit/7293f9af9c2ef24de11e8638c6dcbb7be3605233))
* update actions, nodejs, ubuntu-latest ([614313e](https://www.github.com/aeternity/aepp-base/commit/614313ebc3fca1e602bed42af15d3abc419a2c39))
* update nodejs to 18 in container ([f080192](https://www.github.com/aeternity/aepp-base/commit/f080192fa3619eba2a54b5d0781cac8d15fb0228))


### Refactorings

* add own loader instead of unmaintained "vue-svg-loader" ([36783e6](https://www.github.com/aeternity/aepp-base/commit/36783e62ae67288fc7526cad379f061878c45419))
* **backend:** add debug logging ([978d0eb](https://www.github.com/aeternity/aepp-base/commit/978d0eb5efbd1a3bb6b1e33c4e8fb423b05c3fe2))
* disable pwa in cordova ([206f0df](https://www.github.com/aeternity/aepp-base/commit/206f0df0740e6725bd7c8d274eac8b13a8e6d165))
* drop unnecessary compiler setup ([4700a04](https://www.github.com/aeternity/aepp-base/commit/4700a04bf673202a72b4304ab87c035dbccc145a))
* fix missed parts in replace `[@import](https://www.github.com/import)` with `[@use](https://www.github.com/use)` ([8526d93](https://www.github.com/aeternity/aepp-base/commit/8526d9306c6cd0236635547115138f6f0674155c))
* move env detected in runtime to constants, add ENV_MOBILE_DEVICE ([09d9d15](https://www.github.com/aeternity/aepp-base/commit/09d9d15ce51aed752c0b1fb9b2d1f6751e5755b9))
* prefer `Object.fromEntries` over `reduce` ([15a5ba1](https://www.github.com/aeternity/aepp-base/commit/15a5ba19aa1e8524b4aad78840a327014487b874))
* prefer env variables prefixed with VUE_APP_ ([19b966a](https://www.github.com/aeternity/aepp-base/commit/19b966a31d323975751a21c43b800fa4c7d5b04f))
* remove iOS-specific webmanifest ([dbdf879](https://www.github.com/aeternity/aepp-base/commit/dbdf8790cf415c49534c049739e448c55b70300e))
* remove migrations older than 3 years ([5c8b6df](https://www.github.com/aeternity/aepp-base/commit/5c8b6df7dae1504f108a763b4a6ac698cd35e515))
* remove unused UNFINISHED_FEATURES, IS_MASTER env flags ([0a88405](https://www.github.com/aeternity/aepp-base/commit/0a88405f884be005824495d3d6c82dc99e3b4bbd))
* use `[@use](https://www.github.com/use)` instead of `[@import](https://www.github.com/import)` in styles ([9ec89ca](https://www.github.com/aeternity/aepp-base/commit/9ec89ca962974749791ff53cd23dff5c40b6c024))


### Testing

* avoid request limit of coingecko.com ([11bed3c](https://www.github.com/aeternity/aepp-base/commit/11bed3c93864b037d88e75d81be0deff0c19bd4e))
* enable Onboarding tests ([07492a4](https://www.github.com/aeternity/aepp-base/commit/07492a4e31f9f0f160cb9ac41de3c7e1124ef66c))
* enable visual testing of mobile version [update screenshots] ([cb5ae7d](https://www.github.com/aeternity/aepp-base/commit/cb5ae7d8ddf19ebae6b25bd471255ffcfc296c58))
* ensure that connected before making screenshot ([132e291](https://www.github.com/aeternity/aepp-base/commit/132e2912495ad71e1d7d390616cfb254ac90a5ec))
* ensure that image loaded before making Onboarding screenshot ([46c1ef1](https://www.github.com/aeternity/aepp-base/commit/46c1ef1d85988a6f55566f71db0db3ace491176a))
* fix flaky onboarding e2e tests ([91570ac](https://www.github.com/aeternity/aepp-base/commit/91570ac1080d537746a8d4a20f5a5d4ef78cfa25))
* settings password and mnemonic ([318f037](https://www.github.com/aeternity/aepp-base/commit/318f037f65a877c9c500817bfa44dd69a861f600))
* store local screenshots separately ([ff0f4d0](https://www.github.com/aeternity/aepp-base/commit/ff0f4d0b2e4cf253361f7543bb07fd431927fcc5))
* tx sign confirmation modal ([11919d8](https://www.github.com/aeternity/aepp-base/commit/11919d8ac6ea15523afc0016266d986653e30ef4))


### Miscellaneous

* add android build number ([72552af](https://www.github.com/aeternity/aepp-base/commit/72552afc510b59020dee62b3191a28c7fc351241))
* add docker-compose file ([b21bafc](https://www.github.com/aeternity/aepp-base/commit/b21bafc8aeac1143f96d595b820a0ad53b29a0dd))
* add workaround to keep background after using qr scanner ([4c4742d](https://www.github.com/aeternity/aepp-base/commit/4c4742d34890fd933b71feff2e601b72599d49d3))
* cleanup backend files ([1675248](https://www.github.com/aeternity/aepp-base/commit/1675248e69a2fc0e7ae5e150724512965d3d2856))
* copy aepp-base-remote-connection-backend ([c412d3f](https://www.github.com/aeternity/aepp-base/commit/c412d3fc0838022f273eecf05c26eb0d553f5893))
* **deps-dev:** bump @babel/traverse from 7.21.4 to 7.23.2 ([64e5197](https://www.github.com/aeternity/aepp-base/commit/64e51971b2d46607bcf8d53a1b8841cf76aba120))
* **deps-dev:** bump systeminformation from 5.11.0 to 5.21.8 ([0ccdf23](https://www.github.com/aeternity/aepp-base/commit/0ccdf23624791c5f5f3a41705d913b8bfa20231f))
* **deps-dev:** bump word-wrap from 1.2.3 to 1.2.4 ([fe7462c](https://www.github.com/aeternity/aepp-base/commit/fe7462c8000783d447276619f85a2dbfbf0c7b42))
* **deps:** bump async from 2.6.3 to 2.6.4 ([cad182d](https://www.github.com/aeternity/aepp-base/commit/cad182d66179403abb8d5b0148928b9c60308ebd))
* **deps:** bump follow-redirects from 1.15.2 to 1.15.4 ([0f05e89](https://www.github.com/aeternity/aepp-base/commit/0f05e89d73e6c0910fe9eb0b67b73574e96b45cf))
* **deps:** bump json5 from 1.0.1 to 1.0.2 ([d195995](https://www.github.com/aeternity/aepp-base/commit/d195995e61ccc7392e20a03ef97605de6cfef31b))
* **deps:** bump loader-utils from 1.4.0 to 1.4.2 ([c4a1886](https://www.github.com/aeternity/aepp-base/commit/c4a1886d679375bc92e19c91881958033032b865))
* **deps:** bump semver from 5.7.1 to 5.7.2 ([90f8073](https://www.github.com/aeternity/aepp-base/commit/90f807315347043795593f4e0a0ccdb916710fda))
* **deps:** bump socket.io-parser from 4.2.2 to 4.2.3 ([6fa42d8](https://www.github.com/aeternity/aepp-base/commit/6fa42d8b839335ad04bd646cb8959f7abd52747f))
* **deps:** bump socket.io-parser from 4.2.2 to 4.2.3 in /backend ([0ce086e](https://www.github.com/aeternity/aepp-base/commit/0ce086ea37516bec71245de4966a841a70619ae6))
* **deps:** drop unmaintained `cordova-res` package ([b52283b](https://www.github.com/aeternity/aepp-base/commit/b52283b0f94718dee9e5da8b661484dee32dea23))
* **deps:** update ([759d070](https://www.github.com/aeternity/aepp-base/commit/759d070549a5c135a3efe27feb26ff50e2d8c590))
* **deps:** update cordova deps ([dea9343](https://www.github.com/aeternity/aepp-base/commit/dea934321115973e312356f31c3bb1c83e5596e1))
* **deps:** update cordova, cordova-ios, cordova-android ([795fc44](https://www.github.com/aeternity/aepp-base/commit/795fc4411fd05999edf65b3d78fe31c96e575c8d))
* disable lintOnSave ([6856148](https://www.github.com/aeternity/aepp-base/commit/68561480e90746b66278fb855ac4c7765e237fd5))
* don't try setup push api in unsupported envs, distinglish not allowed ([4f3259f](https://www.github.com/aeternity/aepp-base/commit/4f3259ffe2c3aa6875f239c6ece91f276bde6540))
* fix statusbar color in android@13 ([51d9b1a](https://www.github.com/aeternity/aepp-base/commit/51d9b1af53b0dc08afbd44c38a591561a44d15b4))
* fix typo in NameDetails ([b64f471](https://www.github.com/aeternity/aepp-base/commit/b64f471040de722fe5a6939915cfcffbaa76cb44))
* fix version number in cordova ([6d39c26](https://www.github.com/aeternity/aepp-base/commit/6d39c26c381c870f63935046b242fb5c8caf8089))
* ignore order in extract-css plugin ([91accd9](https://www.github.com/aeternity/aepp-base/commit/91accd98cc6faeb5dbae93b6361835693ab4f844))
* make splash screen compatible with android@12 ([a30cf46](https://www.github.com/aeternity/aepp-base/commit/a30cf46f90416acb584c02a42a860e92ce8d3403))
* move svg configuration to configureWebpack ([8d25fed](https://www.github.com/aeternity/aepp-base/commit/8d25fedb947d3f0cf73d3f903d7f2c3c43e078ab))
* remove not necessary robots.txt ([003ac29](https://www.github.com/aeternity/aepp-base/commit/003ac29702f04faeba09b42d2e698d1db487c7a5))
* remove not necessary webkit font smoothing ([af7ab2d](https://www.github.com/aeternity/aepp-base/commit/af7ab2d343ce9fece9685d719285d476ca95085a))
* remove outdated travis scripts ([c0b76ce](https://www.github.com/aeternity/aepp-base/commit/c0b76cef782a3253dd61a9304431445a327f508e))
* remove unnecessary cordova-plugin-headercolor ([979a17d](https://www.github.com/aeternity/aepp-base/commit/979a17dc050b2264c7aa15424b6a30f4bfd7ea20))
* set lang attribute of html ([1a8f952](https://www.github.com/aeternity/aepp-base/commit/1a8f9527bcf896daae5b9e5fe22490e95c6005de))
* set the current version in package meta ([0bb931f](https://www.github.com/aeternity/aepp-base/commit/0bb931f3813e2d1b8c2c02de2a516e7e2a75aeb4))
* switch to a fork of qrscanner compatible with cordova-android@11 ([e53c6b6](https://www.github.com/aeternity/aepp-base/commit/e53c6b685333bc2650ee67b12cef84335fcaf706))
* switch to new deployment of backend ([bb208ff](https://www.github.com/aeternity/aepp-base/commit/bb208ff16c80ca8ee1a9ff5f5d359f5443af597b))
* switch to new middleware swagger path, update issues ([7b820ae](https://www.github.com/aeternity/aepp-base/commit/7b820aebe88173eb3ba91dc0be75599ef06643e1))
* update @aeternity/ledger-app-api to a version compatible with @vue/cli@5 ([4f0b354](https://www.github.com/aeternity/aepp-base/commit/4f0b354ad14eae265165b17d6148955b51114adb))
* update @vue/cli to 5 ([911064c](https://www.github.com/aeternity/aepp-base/commit/911064c0dd9eb5c1c0aa501a1645a1b941a728e4))
* update backend dependencies ([eaf4441](https://www.github.com/aeternity/aepp-base/commit/eaf44416cdd3c8e5788e4d7a48f6f180b21b7c41))
* update cypress to 12 ([7682053](https://www.github.com/aeternity/aepp-base/commit/768205384301948c55d3d8b3e19363ad1333de0c))
* update dependencies ([75db50f](https://www.github.com/aeternity/aepp-base/commit/75db50f9067374e365e85072194bbd16188b4802))
* update deps by regeneration of package-lock ([3c503f4](https://www.github.com/aeternity/aepp-base/commit/3c503f45406b9ea202c945663f697ea5b757270a))
* update e2e screenshots ([983397d](https://www.github.com/aeternity/aepp-base/commit/983397d424c6352cfe443c0fd606e431f0a008c4))
* update e2e screenshots ([caef720](https://www.github.com/aeternity/aepp-base/commit/caef720ccdf4b8fc8ff58529db6540f323c8f129))
* update npm dependencies ([4668236](https://www.github.com/aeternity/aepp-base/commit/4668236844121e4f667caecd3e03bce82a158473))
* update socket.io to 4 ([0197d94](https://www.github.com/aeternity/aepp-base/commit/0197d9415d2755c093948b54b7dadae5dd86e3dd))
* use a fork of ionic-plugin-deeplinks compatible with android@12 ([a9702ac](https://www.github.com/aeternity/aepp-base/commit/a9702acbbde947d025fd1d982759e769199a5ca9))
* use aescan instead of old explorer ([50fffe9](https://www.github.com/aeternity/aepp-base/commit/50fffe91c04f3b06b96e128c73bfa02d403c4edc))
