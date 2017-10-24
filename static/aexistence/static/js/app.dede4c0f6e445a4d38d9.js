webpackJsonp([1],{

/***/ "+D7v":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	TEXT: 0,
	IMAGE: 1,
	PAYMENT: 2,
	LINK: 3,
	PROOF: 4
});

/***/ }),

/***/ "+r+W":
/***/ (function(module, exports, __webpack_require__) {

var sha256 = __webpack_require__("BUS2");

var generateHashFromFile = function generateHashFromFile(file, done) {
	console.log('generateHashFromFile', file);
	readFile(file, function (err, binaryString) {
		if (err) {
			return done(err);
		}
		return done(null, generateHash(binaryString));
	});
};

var readFile = function readFile(file, done) {
	var fileReader = new FileReader();
	fileReader.onload = function (event) {
		var binaryString = event.target.result;
		return done(null, binaryString);
	};
	fileReader.readAsArrayBuffer(file);
};

var generateHash = function generateHash(binaryString) {
	return sha256(binaryString);
};

module.exports = generateHashFromFile;

/***/ }),

/***/ "/gei":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"home screen"},[_c('h1',{staticClass:"center"},[_vm._v("Success")]),_vm._v(" "),_c('p',{staticClass:"text center"},[_vm._v("\n\tThis is the æxistence. This æpp enables you to proof the existance of digital files on the æternity blockchain and share it with other poeple.\n\t")]),_vm._v(" "),_c('div',{staticClass:"pink next button"},[_c('router-link',{attrs:{"to":"/chat"}},[_vm._v("\n\t\t\tCreate first proof\n\t\t")])],1),_vm._v(" "),(this.$store.state.hasParentWeb3)?_c('div',{staticClass:"quickIdPlaceholder"}):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "02Ns":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"screen"},[_c('div',{staticClass:"nomargin conversation-container",attrs:{"id":"conv"}},[_vm._l((_vm.messages),function(message){return _c('speech',{attrs:{"body":message.body,"sender":message.sender,"primary":message.primary}})}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showti),expression:"showti"}],staticClass:"app speech typing-indicator"},[_c('span'),_vm._v(" "),_c('span'),_vm._v(" "),_c('span')])],2),_vm._v(" "),_c('div',{staticClass:"response"},[_c('div',{staticClass:"answer-group"},[_vm._l((_vm.answers),function(answer,index){return _c('Answer',{attrs:{"answer":answer},on:{"answerClicked":function($event){_vm.handleAnswer(answer)}}})}),_vm._v(" "),_c('form',{directives:[{name:"show",rawName:"v-show",value:(_vm.showFileUpload),expression:"showFileUpload"}],attrs:{"enctype":"multipart/form-data","action":"#"},on:{"submit":_vm.preventSubmit}},[_c('input',{staticClass:"answer",staticStyle:{"display":"none"},attrs:{"id":"selectedFile","type":"file","accept":"image/*"},on:{"change":_vm.onFileChange}}),_vm._v(" "),_c('button',{ref:"fileButton",staticClass:"answer",attrs:{"onclick":"document.getElementById('selectedFile').click();"}},[_vm._v("Choose File")])]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.userInput),expression:"userInput"},{name:"show",rawName:"v-show",value:(_vm.showFreetext),expression:"showFreetext"}],attrs:{"type":"text"},domProps:{"value":(_vm.userInput)},on:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13)){ return null; }_vm.handleFreetextInput()},"input":function($event){if($event.target.composing){ return; }_vm.userInput=$event.target.value}}}),_vm._v(" "),_c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.showFreetext),expression:"showFreetext"}],staticClass:"send",on:{"click":function($event){_vm.handleFreetextInput()}}},[_vm._v("Send")])],2)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "0EXd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.show)?_c('div',{staticClass:"camera",on:{"click":_vm.close}},[_c('div',{staticClass:"image"})]):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "0aV6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_Camera_js__ = __webpack_require__("FFLb");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e6246f60_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Camera_vue__ = __webpack_require__("0EXd");
function injectStyle (ssrContext) {
  __webpack_require__("EUwE")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e6246f60"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_Camera_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e6246f60_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Camera_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "19yl":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "2pC0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('Topbar'),_vm._v(" "),_c('router-view')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "4Vh3":
/***/ (function(module, exports) {

module.exports = {"modp1":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},"modp2":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},"modp5":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},"modp14":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},"modp15":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},"modp16":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},"modp17":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},"modp18":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}

/***/ }),

/***/ "4YY7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_helper_js__ = __webpack_require__("j27a");

/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'proofs-list-entry',
	mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_helper_js__["a" /* default */]],
	props: ['proof']
});

/***/ }),

/***/ "5hpq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:{ 'identity-wrap' : true, 'show-payment-ui' : _vm.showPaymentUi }},[(_vm.showPaymentUi)?_c('div',{staticClass:"payment"},[_c('p',{staticClass:"center"},[_vm._v("\n\t\tPlease confirm the transaction of\n\t\t"),_c('br'),_vm._v(" "),_c('span',{staticClass:"price"},[_c('span',{staticClass:"amount"},[_vm._v(_vm._s(_vm.paymentRequest.amount))]),_vm._v(" "),_c('span',{staticClass:"currency-symbol"},[_vm._v("ETH")])]),_vm._v(" "),_c('br')]),_vm._v(" "),_c('div',{staticClass:"pink button pay",on:{"click":_vm.pay}},[_vm._v("\n\t\t\tPay "+_vm._s(_vm.paymentRequest.amount)+" ETH\n\t\t")]),_vm._v(" "),_c('div',{staticClass:"button",on:{"click":_vm.cancel}},[_vm._v("\n\t\t\tcancel\n\t\t")])]):_vm._e(),_vm._v(" "),_c('div',{class:{identity:true, collapsed : _vm.collapsed, 'show-payment-ui' : _vm.showPaymentUi },on:{"click":_vm.toggle}},[_c('div',{staticClass:"left"},[_c('avatar',{attrs:{"image":_vm.identity.avatar,"address":_vm.identity.address}}),_vm._v(" "),_c('div',{staticClass:"account-info"},[_c('div',{staticClass:"name"},[_vm._v(_vm._s(_vm.identity.name))]),_vm._v(" "),_c('div',{staticClass:"address"},[_vm._v(_vm._s(_vm.identity.address))])])],1),_vm._v(" "),_c('div',{staticClass:"right"},[_c('div',{staticClass:"balance"},[_c('span',{staticClass:"amount"},[_vm._v(_vm._s(_vm.identity.balance))]),_vm._v(" "),_c('span',{staticClass:"currency-symbol"},[_vm._v("ETH")])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "6ZSt":
/***/ (function(module, exports) {

module.exports = {"aes-128-ecb":{"cipher":"AES","key":128,"iv":0,"mode":"ECB","type":"block"},"aes-192-ecb":{"cipher":"AES","key":192,"iv":0,"mode":"ECB","type":"block"},"aes-256-ecb":{"cipher":"AES","key":256,"iv":0,"mode":"ECB","type":"block"},"aes-128-cbc":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes-192-cbc":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes-256-cbc":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes128":{"cipher":"AES","key":128,"iv":16,"mode":"CBC","type":"block"},"aes192":{"cipher":"AES","key":192,"iv":16,"mode":"CBC","type":"block"},"aes256":{"cipher":"AES","key":256,"iv":16,"mode":"CBC","type":"block"},"aes-128-cfb":{"cipher":"AES","key":128,"iv":16,"mode":"CFB","type":"stream"},"aes-192-cfb":{"cipher":"AES","key":192,"iv":16,"mode":"CFB","type":"stream"},"aes-256-cfb":{"cipher":"AES","key":256,"iv":16,"mode":"CFB","type":"stream"},"aes-128-cfb8":{"cipher":"AES","key":128,"iv":16,"mode":"CFB8","type":"stream"},"aes-192-cfb8":{"cipher":"AES","key":192,"iv":16,"mode":"CFB8","type":"stream"},"aes-256-cfb8":{"cipher":"AES","key":256,"iv":16,"mode":"CFB8","type":"stream"},"aes-128-cfb1":{"cipher":"AES","key":128,"iv":16,"mode":"CFB1","type":"stream"},"aes-192-cfb1":{"cipher":"AES","key":192,"iv":16,"mode":"CFB1","type":"stream"},"aes-256-cfb1":{"cipher":"AES","key":256,"iv":16,"mode":"CFB1","type":"stream"},"aes-128-ofb":{"cipher":"AES","key":128,"iv":16,"mode":"OFB","type":"stream"},"aes-192-ofb":{"cipher":"AES","key":192,"iv":16,"mode":"OFB","type":"stream"},"aes-256-ofb":{"cipher":"AES","key":256,"iv":16,"mode":"OFB","type":"stream"},"aes-128-ctr":{"cipher":"AES","key":128,"iv":16,"mode":"CTR","type":"stream"},"aes-192-ctr":{"cipher":"AES","key":192,"iv":16,"mode":"CTR","type":"stream"},"aes-256-ctr":{"cipher":"AES","key":256,"iv":16,"mode":"CTR","type":"stream"},"aes-128-gcm":{"cipher":"AES","key":128,"iv":12,"mode":"GCM","type":"auth"},"aes-192-gcm":{"cipher":"AES","key":192,"iv":12,"mode":"GCM","type":"auth"},"aes-256-gcm":{"cipher":"AES","key":256,"iv":12,"mode":"GCM","type":"auth"}}

/***/ }),

/***/ "78FQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__("BO1k");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Topbar_vue__ = __webpack_require__("v4YQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_web3__ = __webpack_require__("8k0n");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_web3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_web3__);



/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'app',
	computed: {
		appClass: function appClass() {
			return this.$store.state.appClass;
		},
		contractReady: function contractReady() {
			return this.$store.state.contractReady;
		}
	},
	components: {
		Topbar: __WEBPACK_IMPORTED_MODULE_1__components_Topbar_vue__["a" /* default */]
	},
	methods: {
		loadAllProofs: function loadAllProofs() {
			var _this = this;

			if (window.globalContract) {
				window.globalContract.getProofsByOwner(this.$store.state.identity.address, function (err, hashes) {
					if (!err) {
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(hashes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var hash = _step.value;

								window.globalContract.getProofByHash(hash, function (err, rawProof) {
									console.log(rawProof);
									var data = {
										image: null,
										owner: rawProof[0],
										created: rawProof[1],
										block: rawProof[2],
										title: rawProof[3],
										ipfsHash: rawProof[4],
										fileSha256: rawProof[5],
										contract: _this.$store.state.contractAddress
									};
									if (rawProof[4]) {
										data.image = _this.$store.state.apiBaseUrl + '/uploads/' + rawProof[4];
									}
									_this.$store.commit('addProof', data);
								});
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
						}
					}
				});
			}
		},
		changeUser: function changeUser(address) {
			this.$store.commit('setAccount', address);
			this.$store.commit('setName', address.substr(0, 6));
			this.$store.commit('clearProofs');
			this.loadAllProofs();
		},
		setAcountInterval: function setAcountInterval(web3) {
			var _this2 = this;

			setInterval(function () {
				if (web3) {
					web3.eth.getAccounts(function (err, accounts) {
						if (err) {
							console.log(err);
							return;
						} else if (accounts.length === 0) {
							console.log('no accounts found');
							return;
						}
						var address = accounts[0];
						if (address) {
							var currentAddress = _this2.$store.state.identity.address;
							if (address != currentAddress) {
								console.log('address changed');
								_this2.changeUser(address);
							}

							web3.eth.getBalance(address, function (err, balance) {
								var readable = parseFloat(web3.fromWei(balance.toString(10), 'ether')).toFixed(3);
								console.log(err, readable);
								_this2.$store.commit('setBalance', readable);
							});

							var tokenContract = window.globalTokenContract;
							if (tokenContract) {
								tokenContract.balanceOf(address, {}, function (err, balance) {
									var readable = web3.fromWei(balance.toString(10), 'ether');
									_this2.$store.commit('setTokenBalance', readable);
									_this2.$store.commit('setHasTokens', balance > 0);
								});
							}
						}
					});
				}
			}, 1000);
		},
		initWeb3: function initWeb3() {
			var web3 = void 0;
			if (window.parent !== window && window.parent.web3 !== undefined) {
				// Parent has something for us.
				console.log('loaded with parent web3 instance');
				this.$store.commit('setHasParentWeb3', true);
				web3 = new __WEBPACK_IMPORTED_MODULE_2_web3___default.a(window.parent.web3.currentProvider);
			} else if (typeof window.web3 !== 'undefined') {
				// Metamask
				web3 = new __WEBPACK_IMPORTED_MODULE_2_web3___default.a(window.web3.currentProvider);
			} else {
				web3 = null;
			}
			if (web3) {
				window.globalWeb3 = web3;
				this.initContract(web3);
				this.initTokenContract(web3);
				this.setAcountInterval(web3);
			}
		},
		initContract: function initContract(web3) {
			var _this3 = this;

			var abi = [{
				"constant": false,
				"inputs": [{
					"name": "document",
					"type": "string"
				}, {
					"name": "comment",
					"type": "string"
				}, {
					"name": "ipfsHash",
					"type": "string"
				}],
				"name": "notarize",
				"outputs": [],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [{
					"name": "owner",
					"type": "address"
				}],
				"name": "getProofsByOwner",
				"outputs": [{
					"name": "",
					"type": "bytes32[]"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [{
					"name": "document",
					"type": "string"
				}],
				"name": "calculateHash",
				"outputs": [{
					"name": "",
					"type": "bytes32"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [{
					"name": "hash",
					"type": "bytes32"
				}],
				"name": "getProofByHash",
				"outputs": [{
					"name": "owner",
					"type": "address"
				}, {
					"name": "timestamp",
					"type": "uint256"
				}, {
					"name": "proofBlock",
					"type": "uint256"
				}, {
					"name": "comment",
					"type": "string"
				}, {
					"name": "ipfsHash",
					"type": "string"
				}, {
					"name": "storedDocument",
					"type": "string"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [{
					"name": "document",
					"type": "string"
				}],
				"name": "getProof",
				"outputs": [{
					"name": "owner",
					"type": "address"
				}, {
					"name": "timestamp",
					"type": "uint256"
				}, {
					"name": "proofBlock",
					"type": "uint256"
				}, {
					"name": "comment",
					"type": "string"
				}, {
					"name": "ipfsHash",
					"type": "string"
				}, {
					"name": "storedDocument",
					"type": "string"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [{
					"name": "document",
					"type": "string"
				}],
				"name": "hasProof",
				"outputs": [{
					"name": "",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			}, {
				"inputs": [{
					"name": "tokenAddress",
					"type": "address"
				}],
				"payable": false,
				"type": "constructor"
			}];
			var PoEContract = web3.eth.contract(abi);
			PoEContract.at(this.$store.state.contractAddress, function (err, contract) {
				window.globalContract = contract;
				_this3.$store.commit('setContractReady', true);
				// app.loadAllProofs();
			});
		},
		initTokenContract: function initTokenContract(web3) {
			var abi = [{
				"constant": false,
				"inputs": [],
				"name": "launch",
				"outputs": [],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [],
				"name": "creator",
				"outputs": [{
					"name": "",
					"type": "address"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [],
				"name": "name",
				"outputs": [{
					"name": "",
					"type": "string"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": false,
				"inputs": [{
					"name": "_spender",
					"type": "address"
				}, {
					"name": "_value",
					"type": "uint256"
				}],
				"name": "approve",
				"outputs": [{
					"name": "success",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [],
				"name": "totalSupply",
				"outputs": [{
					"name": "",
					"type": "uint256"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": false,
				"inputs": [{
					"name": "_from",
					"type": "address"
				}, {
					"name": "_to",
					"type": "address"
				}, {
					"name": "_value",
					"type": "uint256"
				}],
				"name": "transferFrom",
				"outputs": [{
					"name": "success",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [],
				"name": "decimals",
				"outputs": [{
					"name": "",
					"type": "uint8"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [],
				"name": "version",
				"outputs": [{
					"name": "",
					"type": "string"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [{
					"name": "_owner",
					"type": "address"
				}],
				"name": "balanceOf",
				"outputs": [{
					"name": "balance",
					"type": "uint256"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": false,
				"inputs": [{
					"name": "_addresses",
					"type": "address[]"
				}, {
					"name": "_values",
					"type": "uint256[]"
				}],
				"name": "prefill",
				"outputs": [],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [],
				"name": "symbol",
				"outputs": [{
					"name": "",
					"type": "string"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": false,
				"inputs": [{
					"name": "_to",
					"type": "address"
				}, {
					"name": "_value",
					"type": "uint256"
				}],
				"name": "transfer",
				"outputs": [{
					"name": "success",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": false,
				"inputs": [{
					"name": "_spender",
					"type": "address"
				}, {
					"name": "_value",
					"type": "uint256"
				}, {
					"name": "_extraData",
					"type": "bytes"
				}],
				"name": "approveAndCall",
				"outputs": [{
					"name": "success",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [],
				"name": "transferableUntil",
				"outputs": [{
					"name": "",
					"type": "uint256"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [{
					"name": "_owner",
					"type": "address"
				}, {
					"name": "_spender",
					"type": "address"
				}],
				"name": "allowance",
				"outputs": [{
					"name": "remaining",
					"type": "uint256"
				}],
				"payable": false,
				"type": "function"
			}, {
				"constant": true,
				"inputs": [],
				"name": "prefilled",
				"outputs": [{
					"name": "",
					"type": "bool"
				}],
				"payable": false,
				"type": "function"
			}, {
				"inputs": [],
				"payable": false,
				"type": "constructor"
			}, {
				"payable": false,
				"type": "fallback"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"name": "_from",
					"type": "address"
				}, {
					"indexed": true,
					"name": "_to",
					"type": "address"
				}, {
					"indexed": false,
					"name": "_value",
					"type": "uint256"
				}],
				"name": "Transfer",
				"type": "event"
			}, {
				"anonymous": false,
				"inputs": [{
					"indexed": true,
					"name": "_owner",
					"type": "address"
				}, {
					"indexed": true,
					"name": "_spender",
					"type": "address"
				}, {
					"indexed": false,
					"name": "_value",
					"type": "uint256"
				}],
				"name": "Approval",
				"type": "event"
			}];

			var TokenContract = web3.eth.contract(abi);
			TokenContract.at(this.$store.state.tokenAddress, function (err, contract) {
				window.globalTokenContract = contract;
			});
		}
	},
	mounted: function mounted() {
		var _this4 = this;

		console.log('mounted');
		window.addEventListener('load', function () {
			_this4.initWeb3();
		});
	},
	watch: {
		contractReady: function contractReady(val) {
			if (val === true) {
				this.loadAllProofs();
			}
		}
	}
});

/***/ }),

/***/ "8YCc":
/***/ (function(module, exports) {

module.exports = {"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}

/***/ }),

/***/ "9spv":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ProofsListEntry_vue__ = __webpack_require__("gUHz");


/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'proofs-list',
	components: {
		'proofsListEntry': __WEBPACK_IMPORTED_MODULE_0__ProofsListEntry_vue__["a" /* default */]
	},
	computed: {
		proofs: function proofs() {
			return this.$store.state.proofs;
		}
	}
});

/***/ }),

/***/ "EEbw":
/***/ (function(module, exports) {

module.exports = {"version":"0.20.2"}

/***/ }),

/***/ "EUwE":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "FFLb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'camera',
	props: ['show'],
	data: function data() {
		return {
			//show : false,
		};
	},
	methods: {
		close: function close() {
			this.$emit('picture');
		}
	}
});

/***/ }),

/***/ "FyjB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	ME: 0,
	APP: 1
});

/***/ }),

/***/ "G++b":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"answer",class:{ primary: _vm.isPrimary },on:{"click":function($event){_vm.answerClicked()}}},[_vm._v(_vm._s(_vm.answer.name))])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "G4pG":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_Avatar_js__ = __webpack_require__("W1zK");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2656e6f8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Avatar_vue__ = __webpack_require__("f/Nh");
function injectStyle (ssrContext) {
  __webpack_require__("RB33")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2656e6f8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_Avatar_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2656e6f8_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Avatar_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "HT3c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "Is/k":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_Proof_js__ = __webpack_require__("TgEi");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d1f5e69_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Proof_vue__ = __webpack_require__("kT2X");
function injectStyle (ssrContext) {
  __webpack_require__("M46u")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0d1f5e69"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_Proof_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0d1f5e69_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Proof_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "KYqO":
/***/ (function(module, exports) {

module.exports = {"_args":[[{"raw":"elliptic@^6.0.0","scope":null,"escapedName":"elliptic","name":"elliptic","rawSpec":"^6.0.0","spec":">=6.0.0 <7.0.0","type":"range"},"/home/max/workspace-node/aepp-aexistence/node_modules/browserify-sign"]],"_from":"elliptic@>=6.0.0 <7.0.0","_id":"elliptic@6.4.0","_inCache":true,"_location":"/elliptic","_nodeVersion":"7.0.0","_npmOperationalInternal":{"host":"packages-18-east.internal.npmjs.com","tmp":"tmp/elliptic-6.4.0.tgz_1487798866428_0.30510620190761983"},"_npmUser":{"name":"indutny","email":"fedor@indutny.com"},"_npmVersion":"3.10.8","_phantomChildren":{},"_requested":{"raw":"elliptic@^6.0.0","scope":null,"escapedName":"elliptic","name":"elliptic","rawSpec":"^6.0.0","spec":">=6.0.0 <7.0.0","type":"range"},"_requiredBy":["/browserify-sign","/create-ecdh"],"_resolved":"https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz","_shasum":"cac9af8762c85836187003c8dfe193e5e2eae5df","_shrinkwrap":null,"_spec":"elliptic@^6.0.0","_where":"/home/max/workspace-node/aepp-aexistence/node_modules/browserify-sign","author":{"name":"Fedor Indutny","email":"fedor@indutny.com"},"bugs":{"url":"https://github.com/indutny/elliptic/issues"},"dependencies":{"bn.js":"^4.4.0","brorand":"^1.0.1","hash.js":"^1.0.0","hmac-drbg":"^1.0.0","inherits":"^2.0.1","minimalistic-assert":"^1.0.0","minimalistic-crypto-utils":"^1.0.0"},"description":"EC cryptography","devDependencies":{"brfs":"^1.4.3","coveralls":"^2.11.3","grunt":"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^8.6.2","istanbul":"^0.4.2","jscs":"^2.9.0","jshint":"^2.6.0","mocha":"^2.1.0"},"directories":{},"dist":{"shasum":"cac9af8762c85836187003c8dfe193e5e2eae5df","tarball":"https://registry.npmjs.org/elliptic/-/elliptic-6.4.0.tgz"},"files":["lib"],"gitHead":"6b0d2b76caae91471649c8e21f0b1d3ba0f96090","homepage":"https://github.com/indutny/elliptic","keywords":["EC","Elliptic","curve","Cryptography"],"license":"MIT","main":"lib/elliptic.js","maintainers":[{"name":"indutny","email":"fedor@indutny.com"}],"name":"elliptic","optionalDependencies":{},"readme":"ERROR: No README data found!","repository":{"type":"git","url":"git+ssh://git@github.com/indutny/elliptic.git"},"scripts":{"jscs":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","jshint":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","lint":"npm run jscs && npm run jshint","test":"npm run lint && npm run unit","unit":"istanbul test _mocha --reporter=spec test/index.js","version":"grunt dist && git add dist/"},"version":"6.4.0"}

/***/ }),

/***/ "Kw7J":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"screen"},[_c('div',{staticClass:"proofs-list"},_vm._l((_vm.proofs),function(proof){return _c('proofs-list-entry',{attrs:{"proof":proof}})})),_vm._v(" "),(this.$store.state.hasParentWeb3)?_c('div',{staticClass:"quickIdPlaceholder"}):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "LeEj":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "M46u":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "M93x":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_App_js__ = __webpack_require__("78FQ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20b4fdf3_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__("2pC0");
function injectStyle (ssrContext) {
  __webpack_require__("kF0r")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_App_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_20b4fdf3_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "NHnr":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("/5sW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__("NYxO");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__App_vue__ = __webpack_require__("M93x");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router__ = __webpack_require__("YaEn");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_resource__ = __webpack_require__("ORbq");






__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_4_vue_resource__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;

var store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
	state: {
		title: '',
		appClass: '',
		proofs: [],
		identity: {
			avatar: '/static/avatar-1.jpg',
			balance: '0.00',
			tokenBalance: 0,
			hasTokens: false,
			name: '',
			address: null,
			paymentRequest: null,
			approvedPayments: [],
			declinedPayments: []
		},
		transactions: {},
		identityCollapsed: true,
		hasWeb3: false,
		contractReady: false,
		// default gas price in wei
		gasPrice: 5,
		// Ropsten
		// contractAddress: '0xcbaa1afa8bd967eb093b8da83c0cad905a82e905'
		// Kovan
		contractAddress: '0x2801361d0e854d5a8ca5a53243720a227ef08182',
		tokenAddress: '0x35d8830ea35e6Df033eEdb6d5045334A4e34f9f9',
		apiBaseUrl:  false ? 'http://localhost:3000' : '',
		hasParentWeb3: false
	},
	getters: {
		getProofById: function getProofById(state, getters) {
			return function (id) {
				return state.proofs.find(function (proof) {
					return proof.id === id;
				});
			};
		},
		getTxByHash: function getTxByHash(state, getters) {
			return function (hash) {
				if (state.transactions[hash]) {
					return state.transactions[hash];
				}
				if (typeof Storage !== 'undefined') {
					var txId = localStorage.getItem('txFor_' + hash);
					if (txId) {
						return txId;
					}
				}
				return null;
			};
		}
	},
	mutations: {
		title: function title(state, newtitle) {
			state.title = newtitle;
		},
		addProof: function addProof(state, newProof) {
			state.proofs.push(newProof);
			state.proofs.sort(function (a, b) {
				return b.created - a.created;
			});
		},
		appClass: function appClass(state, newClass) {
			state.appClass = newClass;
		},
		identityCollapsed: function identityCollapsed(state, collapse) {
			state.identityCollapsed = collapse;
		},
		addPaymentRequest: function addPaymentRequest(state, payment) {
			state.identity.paymentRequest = payment;
		},
		pay: function pay(state) {
			var paymentRequest = state.identity.paymentRequest;
			state.identity.balance = (state.identity.balance - paymentRequest.amount).toFixed(2);
			state.identity.approvedPayments.push(paymentRequest);
			paymentRequest.success();
		},
		cancel: function cancel(state) {
			state.identity.paymentRequest.canceled();
			state.identity.paymentRequest = null;
		},
		setHasWeb3: function setHasWeb3(state, hasWeb3) {
			state.hasWeb3 = hasWeb3;
		},
		setContractReady: function setContractReady(state, contractReady) {
			state.contractReady = contractReady;
		},
		setHasTokens: function setHasTokens(state, hasTokens) {
			state.identity.hasTokens = hasTokens;
		},
		setAccount: function setAccount(state, account) {
			state.identity.address = account;
		},
		setBalance: function setBalance(state, balance) {
			state.identity.balance = balance;
		},
		setTokenBalance: function setTokenBalance(state, balance) {
			state.identity.tokenBalance = balance;
		},
		setName: function setName(state, name) {
			state.identity.name = name;
		},
		clearProofs: function clearProofs(state) {
			state.proofs = [];
		},
		addTransaction: function addTransaction(state, options) {
			console.log('addTransaction', options);
			if (options.hash && options.txId) {
				state.transactions[options.hash] = options.txId;
				if (typeof Storage !== 'undefined') {
					localStorage.setItem('txFor_' + options.hash, options.txId);
				}
			}
		},
		setHasParentWeb3: function setHasParentWeb3(state, hasParentWeb3) {
			state.hasParentWeb3 = hasParentWeb3;
		}
	},
	actions: {
		paymentRequest: function paymentRequest(context, payment) {
			context.commit('addPaymentRequest', payment);
		},
		approvePayment: function approvePayment(context) {
			context.commit('pay');
		},
		cancelPayment: function cancelPayment(context) {
			context.commit('cancel');
		}
	}
});

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
	el: '#app',
	store: store,
	router: __WEBPACK_IMPORTED_MODULE_3__router__["a" /* default */],
	render: function render(h) {
		return h(__WEBPACK_IMPORTED_MODULE_2__App_vue__["a" /* default */]);
	}
});

/***/ }),

/***/ "NsM9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_Identity_js__ = __webpack_require__("bTS8");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_780308a9_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Identity_vue__ = __webpack_require__("5hpq");
function injectStyle (ssrContext) {
  __webpack_require__("mt4u")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-780308a9"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_Identity_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_780308a9_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Identity_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "P2MH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_Speech_js__ = __webpack_require__("wnF+");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2947e78d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Speech_vue__ = __webpack_require__("SCcc");
function injectStyle (ssrContext) {
  __webpack_require__("HT3c")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2947e78d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_Speech_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2947e78d_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Speech_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "PgOa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('router-link',{attrs:{"to":"/proofs/"+_vm.proof.fileSha256}},[_c('div',{staticClass:"proofs-list-entry"},[_c('div',{staticClass:"left"},[_c('div',{staticClass:"proof-image",style:("background-image:url(" +_vm.proof.image+ ")")})]),_vm._v(" "),_c('div',{staticClass:"middle"},[_c('div',{staticClass:"proof-title"},[_vm._v(_vm._s(_vm.proof.title))]),_vm._v(" "),_c('div',{staticClass:"proof-created"},[_vm._v(_vm._s(_vm.readableTimestamp(_vm.proof.created)))])]),_vm._v(" "),_c('div',{staticClass:"right"})])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "QDfD":
/***/ (function(module, exports) {

module.exports = {"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"}

/***/ }),

/***/ "QghM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_swiper__ = __webpack_require__("gsqX");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_swiper___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_swiper__);

/* harmony default export */ __webpack_exports__["a"] = ({
	mounted: function mounted() {
		new __WEBPACK_IMPORTED_MODULE_0_swiper___default.a('.swiper-container', {
			pagination: '.swiper-pagination',
			nextButton: '.next'
		});
	}
});

/***/ }),

/***/ "R/pS":
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"name","outputs":[{"name":"o_name","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"content","outputs":[{"name":"","type":"bytes32"}],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"addr","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"reserve","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"subRegistrar","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_newOwner","type":"address"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_registrar","type":"address"}],"name":"setSubRegistrar","outputs":[],"type":"function"},{"constant":false,"inputs":[],"name":"Registrar","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_a","type":"address"},{"name":"_primary","type":"bool"}],"name":"setAddress","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_content","type":"bytes32"}],"name":"setContent","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"disown","outputs":[],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_name","type":"bytes32"},{"indexed":false,"name":"_winner","type":"address"}],"name":"AuctionEnded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_name","type":"bytes32"},{"indexed":false,"name":"_bidder","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"NewBid","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"}],"name":"Changed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"},{"indexed":true,"name":"addr","type":"address"}],"name":"PrimaryChanged","type":"event"}]

/***/ }),

/***/ "RB33":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "SCcc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"speech-container"},[_c('div',{class:_vm.thisclass},[(_vm.body.type === 0)?_c('p',{staticClass:"text"},[_vm._v(_vm._s(_vm.body.text))]):_vm._e(),_vm._v(" "),(_vm.body.type === 3)?_c('div',[_c('p',{staticClass:"text"},[_vm._v(_vm._s(_vm.body.description))]),_vm._v(" "),_c('a',{staticClass:"text",attrs:{"href":_vm.body.url,"target":"_blank"}},[_vm._v(_vm._s(_vm.body.title))])]):_vm._e(),_vm._v(" "),(_vm.body.type === 1)?_c('div',{staticClass:"image",style:(_vm.style)},[(_vm.body.link)?_c('div',{staticClass:"linkwrap"},[_c('router-link',{attrs:{"to":_vm.body.link}},[_vm._v("\n\t\t\t\t\t"+_vm._s(_vm.body.linktext)+"\n\t\t\t\t")])],1):_vm._e()]):_vm._e(),_vm._v(" "),(_vm.body.type === 4)?_c('div',{staticClass:"proof"},[(_vm.proof.loading)?_c('div',[_c('p',{staticClass:"text"},[_vm._v("loading")])]):_vm._e(),_vm._v(" "),(!_vm.proof.loading)?_c('div',[(_vm.proofImage)?_c('div',{staticClass:"image",style:("background-image:url(" + _vm.proofImage + ")")}):_vm._e(),_vm._v(" "),(_vm.proof.data.fileSha256)?_c('p',{staticClass:"text"},[_vm._v(_vm._s(_vm.proof.data.fileSha256))]):_vm._e(),_vm._v(" "),(_vm.proof.data.title)?_c('p',{staticClass:"text"},[_vm._v(_vm._s(_vm.proof.data.title))]):_vm._e(),_vm._v(" "),(_vm.proof.data.ipfsHash)?_c('p',{staticClass:"text"},[_vm._v(_vm._s(_vm.proof.data.ipfsHash))]):_vm._e(),_vm._v(" "),(_vm.proof.data.txId)?_c('a',{staticClass:"text",attrs:{"href":_vm.etherscanLink(_vm.proof.data.txId, 'tx'),"target":"_blank"}},[_vm._v(_vm._s(_vm.proof.data.txId))]):_vm._e(),_vm._v(" "),_c('router-link',{attrs:{"to":{ name: 'proof', params: { id: _vm.body.hash }}}},[_vm._v("View Proof")])],1):_vm._e()]):_vm._e()])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "TgEi":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_helper_js__ = __webpack_require__("j27a");

/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'proof',
	data: function data() {
		return {
			cssClass: {
				image: {
					fullscreen: false
				}
			},
			rawProof: null
		};
	},
	mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_helper_js__["a" /* default */]],
	computed: {
		hash: function hash() {
			return this.$route.params.id;
		},
		contractReady: function contractReady() {
			return this.$store.state.contractReady;
		},
		proof: function proof() {
			var hash = this.$route.params.id;
			var data = {
				image: this.$store.state.apiBaseUrl + '/uploads/' + hash,
				title: '',
				fileSha256: hash,
				created: null,
				ipfsHash: '',
				contract: '',
				owner: '',
				block: ''
			};

			if (this.rawProof) {
				data.contract = this.$store.state.contractAddress;
				data.owner = this.rawProof[0];
				data.created = this.rawProof[1];
				data.block = this.rawProof[2];
				data.title = this.rawProof[3];
				data.ipfsHash = this.rawProof[4];
				data.fileSha256 = this.rawProof[5];
			}

			return data;
		}
	},
	methods: {
		toggleImage: function toggleImage() {
			this.cssClass.image.fullscreen = !this.cssClass.image.fullscreen;
		},
		getProof: function getProof(text) {
			var _this = this;

			var contract = window.globalContract;
			if (contract) {
				contract.getProof(text, function (err, proof) {
					_this.rawProof = proof;
					console.log('getProof', err, proof);
				});
			}
		}
	},
	mounted: function mounted() {
		var app = this;
		if (app.contractReady) {
			app.getProof(app.hash);
		}
	},
	watch: {
		contractReady: function contractReady(val) {
			var app = this;
			if (val === true) {
				app.getProof(app.hash);
			}
		}
	}
});

/***/ }),

/***/ "UIsv":
/***/ (function(module, exports) {

module.exports = [{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"owner","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_refund","type":"address"}],"name":"disown","outputs":[],"type":"function"},{"constant":true,"inputs":[{"name":"_name","type":"bytes32"}],"name":"addr","outputs":[{"name":"","type":"address"}],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"reserve","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_newOwner","type":"address"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"},{"name":"_a","type":"address"}],"name":"setAddr","outputs":[],"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"name","type":"bytes32"}],"name":"Changed","type":"event"}]

/***/ }),

/***/ "VqNs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'answer',
	props: ['answer'],
	computed: {
		isPrimary: function isPrimary() {
			return this.answer.settings && this.answer.settings.primary;
		}
	},
	methods: {
		answerClicked: function answerClicked() {
			this.$emit('answerClicked');
		}
	}
});

/***/ }),

/***/ "W1zK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_helper_js__ = __webpack_require__("j27a");


/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'avatar',
	props: ['image', 'address'],
	mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_helper_js__["a" /* default */]],
	computed: {
		style: function style() {
			if (this.address) {
				return {
					backgroundImage: "url('" + this.blockie(this.address) + "')"
				};
			} else {
				return {
					backgroundColor: '#d1d1d1'
				};
			}
		}
	}
});

/***/ }),

/***/ "YaEn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__("/5sW");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__("/ocq");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Intro_vue__ = __webpack_require__("xa4f");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Home_vue__ = __webpack_require__("lO7g");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_Chat_vue__ = __webpack_require__("ePsb");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_Camera_vue__ = __webpack_require__("0aV6");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_ProofsList_vue__ = __webpack_require__("sw+o");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_Proof_vue__ = __webpack_require__("Is/k");










__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
	routes: [{
		path: '/',
		component: __WEBPACK_IMPORTED_MODULE_2__components_Intro_vue__["a" /* default */],
		meta: {
			title: 'Welcome',
			appClass: 'welcome'
		}
	}, { path: '/home',
		component: __WEBPACK_IMPORTED_MODULE_3__components_Home_vue__["a" /* default */],
		meta: {
			title: 'Æxistence',
			appClass: 'home'
		} }, { path: '/chat',
		component: __WEBPACK_IMPORTED_MODULE_4__components_Chat_vue__["a" /* default */],
		meta: {
			title: 'Create Proof',
			appClass: 'new'
		} }, { path: '/camera',
		component: __WEBPACK_IMPORTED_MODULE_5__components_Camera_vue__["a" /* default */],
		meta: {
			title: 'Camera',
			appClass: 'camera'
		} }, { path: '/proofs',
		component: __WEBPACK_IMPORTED_MODULE_6__components_ProofsList_vue__["a" /* default */],
		meta: {
			title: 'Your Proofs',
			appClass: 'proofs'
		} }, { name: 'proof',
		path: '/proofs/:id',
		component: __WEBPACK_IMPORTED_MODULE_7__components_Proof_vue__["a" /* default */],
		meta: {
			title: 'Proof Details',
			appClass: 'proof'
		} }]
}));

/***/ }),

/***/ "ZVY4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_MenuEntry_js__ = __webpack_require__("cEYD");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_09e82510_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MenuEntry_vue__ = __webpack_require__("yHou");
function injectStyle (ssrContext) {
  __webpack_require__("mFZl")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-09e82510"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_MenuEntry_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_09e82510_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_MenuEntry_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "bTS8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Avatar_vue__ = __webpack_require__("G4pG");

/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'identity',
	components: {
		'avatar': __WEBPACK_IMPORTED_MODULE_0__Avatar_vue__["a" /* default */]
	},
	data: function data() {
		return {
			showPaymentUi: false
		};
	},
	computed: {
		identity: function identity() {
			return this.$store.state.identity;
		},
		collapsed: function collapsed() {
			return !this.showPaymentUi && this.$store.state.identityCollapsed;
		},
		paymentRequest: function paymentRequest() {
			return this.$store.state.identity.paymentRequest;
		},
		blockie: function blockie() {
			return false; // blockies.create();
		}
	},
	watch: {
		paymentRequest: function paymentRequest(req) {
			console.log(req);
			if (req) {
				this.showPaymentUi = true;
			} else {
				this.showPaymentUi = false;
			}
		}
	},
	methods: {
		toggle: function toggle() {
			if (this.$store.state.appClass !== 'home') {
				this.$store.commit('identityCollapsed', !this.$store.state.identityCollapsed);
			}
		},
		pay: function pay() {
			var _this = this;

			store.dispatch('approvePayment');
			setTimeout(function () {
				_this.showPaymentUi = false;
			}, 200);
		},
		cancel: function cancel() {
			store.dispatch('cancelPayment');
			this.showPaymentUi = false;
		}
	}
});

/***/ }),

/***/ "bb87":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Identity_vue__ = __webpack_require__("NsM9");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MenuEntry_vue__ = __webpack_require__("ZVY4");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Avatar_vue__ = __webpack_require__("G4pG");




/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'topbar',
	components: {
		'avatar': __WEBPACK_IMPORTED_MODULE_2__Avatar_vue__["a" /* default */],
		'menu-entry': __WEBPACK_IMPORTED_MODULE_1__MenuEntry_vue__["a" /* default */],
		'identity': __WEBPACK_IMPORTED_MODULE_0__Identity_vue__["a" /* default */]
	},
	data: function data() {
		return {
			navopen: false,
			showAdd: true,
			showBurger: true,
			showBack: false,
			entris: [{
				label: 'My Proofs',
				link: '/proofs'
			}, {
				label: 'Create a Proof',
				link: '/chat'
			}]
		};
	},
	computed: {
		thisclass: function thisclass() {
			return {
				'topbar': true,
				'open': this.navopen
			};
		},
		identity: function identity() {
			return this.$store.state.identity;
		},
		title: function title() {
			return this.$store.state.title;
		},
		showQuickId: function showQuickId() {
			return !this.$store.state.hasParentWeb3;
		}
	},
	watch: {
		'$route': function $route(to, from) {
			var proofDetail = null !== to.path.match(/^\/proofs\/\d+/);

			this.showAdd = to.path !== '/chat';
			this.showBurger = !proofDetail;
			this.showBack = proofDetail;
			this.navopen = false;
		}
	},
	methods: {
		toggleopen: function toggleopen() {
			this.navopen = !this.navopen;
		}
	}
});

/***/ }),

/***/ "cEYD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'menu-entry',
	props: ['link', 'label']
});

/***/ }),

/***/ "ePsb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_Chat_js__ = __webpack_require__("mgmZ");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_69d1207a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Chat_vue__ = __webpack_require__("02Ns");
function injectStyle (ssrContext) {
  __webpack_require__("lnyP")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-69d1207a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_Chat_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_69d1207a_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Chat_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "ejIc":
/***/ (function(module, exports) {

module.exports = {"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}}

/***/ }),

/***/ "ekFf":
/***/ (function(module, exports, __webpack_require__) {

var Conversational = __webpack_require__("QREd");
// let Conversational = require('../../conversational-machine')
// let ConversationalFSM = Conversational.ConversationalFSM
var Question = Conversational.Question;
// let WidgetQuestion = Conversational.WidgetQuestion
var AnswerFactory = Conversational.AnswerFactory;

// export default function () {
module.exports = function () {
	var fsm = new Conversational.ConversationalFSM({
		initialState: 'uninitialized',
		states: {
			uninitialized: new Question(null, {
				answers: [AnswerFactory.answer('Start', 'checkRequirements', /^.*$/i)]
			}),

			checkRequirements: new Question('', {
				onEnter: function onEnter() {
					fsm.emit('checkRequirements');
				},
				answers: [AnswerFactory.hidden('welcome'), AnswerFactory.hidden('noWeb3'), AnswerFactory.hidden('notUnlocked'), AnswerFactory.hidden('noEther'), AnswerFactory.hidden('noToken')]
			}),

			noWeb3: new Question('To use this service you need a web3 provider like metamask installed.', {
				answers: [AnswerFactory.answer('Check again', 'checkRequirements', /^.*$/i)]
			}),

			notUnlocked: new Question('To use this service you need to unlock metamask. Please unlock metamask and check again.', {
				answers: [AnswerFactory.answer('Check again', 'checkRequirements', /^.*$/i)]
			}),

			noEther: new Question('To use this service you need some ether to pay the transaction fees aka gas. Please get some ether or change accounts and check again.', {
				answers: [AnswerFactory.answer('Check again', 'checkRequirements', /^.*$/i)]
			}),

			noToken: new Question('For now this service is just for the Æternity community. This is why you need some AE-Tokens in your account. Please get some AE-Tokens or change accounts and check again.', {
				answers: [AnswerFactory.answer('Check again', 'checkRequirements', /^.*$/i)]
			}),

			welcome: new Question('Hi! I am æxistence – built to proof the existence of files on the blockchain. \n Select a file from your device to get started.', {
				answers: [AnswerFactory.settings('Select File', 'selectFile', /^select/i, { primary: true }), AnswerFactory.answer('Why would I do that?', 'whyProof', /^why/i)]
			}),

			whyProof: new Question('Mainly to proof to third parties that an image or file existed at a certain point of time. ✍ \n Also to check if that exact same file has been registred before', {
				answers: [AnswerFactory.settings('Select File', 'selectFile', /^select/i, { primary: true }), AnswerFactory.answer('How does that work?', 'howProofWorks', /^how/i)]
			}),

			howProofWorks: new Question('I calculate a SHA256 hash from the file and save it – together with the timestamp and the user adress – to one of the most secure data storages in the world: The blockchain.', {
				onEnter: function onEnter() {
					fsm.emit('showBubble', 'Note: Although my service is free, every block of information saved to the blockchain comes with a transaction fee.', { primary: true });
				},
				answers: [AnswerFactory.settings('Select File', 'selectFile', /^select/i, { primary: true }), AnswerFactory.answer('Cancel', 'clear', /cancel/i)]
			}),

			selectFile: new Question('', {
				onEnter: function onEnter() {
					fsm.emit('showFileUpload', true);
					fsm.emit('openFilePicker');
				},
				onLeave: function onLeave() {
					fsm.emit('showFileUpload', false);
				},
				answers: [AnswerFactory.answer('Cancel', 'clear', /cancel/i), AnswerFactory.hidden('giveName'), AnswerFactory.hidden('proofExists'), AnswerFactory.hidden('filesizeLimit')]
			}),

			filesizeLimit: new Question('Error: File size limit reached. Try splitting up or compressing your file.', {
				answers: [AnswerFactory.settings('Pick different file', 'selectFile', /^select/i, { primary: true }), AnswerFactory.answer('Cancel', 'clear', /cancel/i)]
			}),

			proofExists: new Question('This file has already been proofed.', {
				onEnter: function onEnter() {
					fsm.emit('showExistingProof');
				},
				answers: [AnswerFactory.settings('Cancel', 'clear', /cancel/i, { primary: true })]
			}),

			giveName: new Question('Great, you uploaded a new file! Now give it a suitable name, but remember: This can’t be changed afterwards.', {
				onEnter: function onEnter() {
					fsm.emit('showFreetext', true);
					fsm.emit('showBubble', 'Note: The longer the name, the higher the gas costs for the transaction.', { primary: true });
					fsm.emit('showBubble', 'Warning: The name will be visible to public.', { primary: true });
				},
				onLeave: function onLeave() {
					fsm.emit('showFreetext', false);
				},
				answers: [AnswerFactory.freetext('description', 'askStorage', /^.*$/i, function (givenDescription) {
					fsm.emit('proofDescriptionGiven', givenDescription);
				})]
			}),

			askStorage: new Question('Do you want me to save a copy of the file to an IPFS server?', {
				answers: [AnswerFactory.settings('Save it', 'storeFile', /save/i, { primary: true }), AnswerFactory.answer('Nope – I got it!', 'showSummary', /nope/i)]
			}),

			storeFile: new Question('', {
				onEnter: function onEnter() {
					fsm.emit('startUpload');
				},
				answers: [AnswerFactory.hidden('showSummary'), AnswerFactory.hidden('askStorage')]
			}),

			showSummary: new Question('To finish creating the proof, you must approve the transaction:', {
				onEnter: function onEnter() {
					fsm.emit('showSummary');
				},
				answers: [AnswerFactory.settings('Approve', 'triggerTransaction', /approve/i, { primary: true }), AnswerFactory.answer('I changed my mind!', 'askStorage', /changed/i, function () {
					fsm.emit('deleteIpfsHash');
				})]
			}),

			triggerTransaction: new Question('', {
				onEnter: function onEnter() {
					fsm.emit('startProof');
				},
				answers: [AnswerFactory.hidden('showSuccess'), AnswerFactory.hidden('transactionError')]
			}),

			transactionError: new Question('An error encountered. Be sure to pay at least the minimum transaction fee.', {
				answers: [AnswerFactory.settings('Try again', 'triggerTransaction', /try/i, { primary: true }), AnswerFactory.answer('Cancel', 'clear', /cancel/i)]
			}),

			showSuccess: new Question('Sucess! The existence of your file is now proofable! Check it out:', {
				onEnter: function onEnter() {
					fsm.emit('showCreatedProof');
				},
				answers: [AnswerFactory.settings('New proof', 'clear', /new/i, { primary: true }), AnswerFactory.answer('Show my proofs', 'showProofList', /show/i)]
			}),

			showProofList: new Question('', {
				onEnter: function onEnter() {
					fsm.emit('showProofList');
				},
				answers: [AnswerFactory.answer('Cancel', 'clear', /cancel/i)]
			}),

			clear: new Question('', {
				onEnter: function onEnter() {
					fsm.emit('clearProof');
					fsm.transition('welcome');
				},
				answers: [AnswerFactory.hidden('welcome')]
			})
		}
	});

	return fsm;
};

/***/ }),

/***/ "f/Nh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"avatar",style:(_vm.style)})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "gUHz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_ProofsListEntry_js__ = __webpack_require__("4YY7");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_115b0fea_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ProofsListEntry_vue__ = __webpack_require__("PgOa");
function injectStyle (ssrContext) {
  __webpack_require__("yDwQ")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-115b0fea"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_ProofsListEntry_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_115b0fea_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ProofsListEntry_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "gb88":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "j27a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment__ = __webpack_require__("PJh5");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_moment__);

var blockies = __webpack_require__("DDQh");

/* harmony default export */ __webpack_exports__["a"] = ({
	methods: {
		readableTimestamp: function readableTimestamp(timestamp) {
			if (timestamp) {
				var momentTime = __WEBPACK_IMPORTED_MODULE_0_moment___default.a.unix(timestamp.toString());
				return momentTime.format('YYYY-MM-DD HH:mm');
			} else {
				return '';
			}
		},
		etherscanLink: function etherscanLink(value, type) {
			// type tx, address, block
			var baseurl = 'https://kovan.etherscan.io/';
			baseurl += type;
			baseurl += '/';
			baseurl += value;
			return baseurl;
		},
		blockie: function blockie(address) {
			return blockies.createDataURL({
				seed: address
			});
		}
	}
});

/***/ }),

/***/ "kF0r":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "kT2X":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"screen proof"},[_c('div',{class:{'proof-image' :true, image: true, fullscreen : _vm.cssClass.image.fullscreen},style:("background-image:url(" +_vm.proof.image+ ")"),on:{"click":_vm.toggleImage}}),_vm._v(" "),_c('div',{staticClass:"columns"},[_c('div',{staticClass:"column"},[_c('div',{staticClass:"proof-title"},[_vm._v(_vm._s(_vm.proof.title))]),_vm._v(" "),_c('div',{staticClass:"proof-created"},[_vm._v(_vm._s(_vm.readableTimestamp(_vm.proof.created)))])])]),_vm._v(" "),_c('table',[_c('tr',[_c('td',[_vm._v("Owner")]),_vm._v(" "),_c('td',{staticClass:"proof-owner"},[_c('a',{attrs:{"target":"_blank","href":_vm.etherscanLink(_vm.proof.owner, 'address')}},[_vm._v(_vm._s(_vm.proof.owner))])])]),_vm._v(" "),_c('tr',[_c('td',[_vm._v("Contract")]),_vm._v(" "),_c('td',{staticClass:"proof-contract"},[_c('a',{attrs:{"target":"_blank","href":_vm.etherscanLink(_vm.proof.contract, 'address')}},[_vm._v(_vm._s(_vm.proof.contract))])])]),_vm._v(" "),_c('tr',[_c('td',[_vm._v("Block")]),_vm._v(" "),_c('td',{staticClass:"proof-block"},[_c('a',{attrs:{"target":"_blank","href":_vm.etherscanLink(_vm.proof.block, 'block')}},[_vm._v(_vm._s(_vm.proof.block))])])]),_vm._v(" "),_vm._m(0),_vm._v(" "),_c('tr',[_c('td',[_vm._v("File Sha256")]),_vm._v(" "),_c('td',{staticClass:"proof-fileSha256"},[_vm._v(_vm._s(_vm.proof.fileSha256))])])])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',{staticClass:"sep"},[_c('td',{attrs:{"colspan":"2"}},[_c('hr')])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "lO7g":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_Home_js__ = __webpack_require__("rlol");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_586fb5ca_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__ = __webpack_require__("/gei");
function injectStyle (ssrContext) {
  __webpack_require__("19yl")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-586fb5ca"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_Home_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_586fb5ca_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "lnyP":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "mFZl":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "mgmZ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__machine_js__ = __webpack_require__("ekFf");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__machine_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__machine_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Speech_vue__ = __webpack_require__("P2MH");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Answer_vue__ = __webpack_require__("qIkd");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_async_waterfall__ = __webpack_require__("+NtB");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_async_waterfall___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_async_waterfall__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_async_parallel__ = __webpack_require__("Ld/R");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_async_parallel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_async_parallel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_helper_js__ = __webpack_require__("j27a");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__ = __webpack_require__("FyjB");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__ = __webpack_require__("+D7v");











/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'chat',
	components: {
		'speech': __WEBPACK_IMPORTED_MODULE_1__Speech_vue__["a" /* default */],
		'Answer': __WEBPACK_IMPORTED_MODULE_2__Answer_vue__["a" /* default */]
	},
	mixins: [__WEBPACK_IMPORTED_MODULE_5__mixins_helper_js__["a" /* default */]],
	data: function data() {
		return {
			defaultDelay: 500,
			machine: __WEBPACK_IMPORTED_MODULE_0__machine_js___default()(),
			messages: [],
			showti: false,
			showresp: false,
			showFileUpload: false,
			showFreetext: false,
			userInput: '',
			fileUploadFormData: new FormData(),
			proof: {
				hash: null,
				description: null,
				ipfsHash: null,
				txId: null,
				dataUrl: null
			}
		};
	},
	computed: {
		answers: function answers() {
			return this.machine.getCurrentQuestion().getPossibleAnswers();
		},
		hasAnswers: function hasAnswers() {
			return this.answers && this.answers.length > 0;
		},
		contractReady: function contractReady() {
			return this.$store.state.contractReady;
		}
	},
	methods: {
		scrollDown: function scrollDown() {
			setTimeout(function () {
				document.getElementsByClassName('conversation-container')[0].scrollTop = 100000000;
			}, 100);
		},
		handleAnswer: function handleAnswer(givenAnswer) {
			this.setAnswer(givenAnswer.name);
		},
		handleFreetextInput: function handleFreetextInput() {
			this.setAnswer(this.userInput);
			this.userInput = '';
		},
		setAnswer: function setAnswer(answerText) {
			this.addMessage({
				sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].ME,
				body: {
					type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].TEXT,
					text: answerText
				}
			});
			this.machine.setAnswer(answerText);
		},
		showQuestionDelayed: function showQuestionDelayed(text) {
			this.addMessageDelayed({
				sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].APP,
				body: {
					type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].TEXT,
					text: text
				}
			}, this.defaultDelay, true);
		},
		addMessageDelayed: function addMessageDelayed(message, delay, showThinkingBubble) {
			var _this = this;

			console.log('addMessageDelayed');
			if (showThinkingBubble) {
				this.showti = true;
			}
			setTimeout(function () {
				if (showThinkingBubble) {
					_this.showti = false;
				}
				_this.addMessage(message);
			}, delay);
		},
		startProof: function startProof(textToProof, comment, ipfsHash) {
			var _this2 = this;

			console.log('startProof', textToProof, comment, ipfsHash);
			var contract = window.globalContract;
			var tokenContract = window.globalTokenContract;
			if (!contract || !tokenContract) {
				return;
			}

			__WEBPACK_IMPORTED_MODULE_3_async_waterfall___default()([function (callback) {
				window.globalWeb3.eth.getAccounts(function (err, accounts) {
					if (err) {
						return callback(err);
					} else if (accounts.length === 0) {
						return callback(new Error('No accounts found'));
					}
					tokenContract.balanceOf(accounts[0], {}, function (err, balance) {
						if (err) {
							return callback(err);
						}
						if (balance <= 0) {
							_this2.addMessageDelayed({
								sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].APP,
								body: {
									type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].TEXT,
									text: "You don't have any AE Tokens. The contract will fail without tokens."
								}
							}, _this2.defaultDelay, true);
							_this2.machine.transition('clear');
							return callback(new Error('No AE Token'));
						}
						return callback(null);
					});
				});
			}, function (callback) {
				contract.hasProof(textToProof, function (err, hasProof) {
					if (hasProof) {
						_this2.addMessageDelayed({
							sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].APP,
							body: {
								type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].LINK,
								description: "This file has already been notarized",
								title: textToProof,
								url: _this2.$router.resolve('/proofs/' + textToProof).href
							}
						}, _this2.defaultDelay, true);
						_this2.machine.transition('clear');
						return callback(new Error('Already notarized'));
					} else {
						return callback(null);
					}
				});
			}, function (callback) {
				window.globalWeb3.eth.getAccounts(function (err, accounts) {
					if (err) {
						return callback(err);
					} else if (accounts.length === 0) {
						return callback(new Error('No accounts found'));
					}
					contract.notarize.estimateGas(textToProof, comment, ipfsHash, { from: accounts[0] }, function (err, estimate) {
						return callback(err, estimate);
					});
				});
			}, function (estimate, callback) {
				window.globalWeb3.eth.getAccounts(function (err, accounts) {
					if (err) {
						return callback(err);
					} else if (accounts.length === 0) {
						return callback(new Error('No accounts found'));
					}
					console.log('estimate', estimate);
					var transactionOptions = {
						from: accounts[0],
						gas: estimate,
						gasPrice: window.globalWeb3.toWei(_this2.$store.state.gasPrice, 'gwei')
					};
					contract.notarize(textToProof, comment, ipfsHash, transactionOptions, function (err, txId) {
						return callback(err, txId);
					});
				});
			}], function (err, txId) {
				if (err) {
					_this2.machine.transition('transactionError');
				} else {
					console.log('calling', txId, textToProof);
					_this2.$store.commit('addTransaction', { txId: txId, hash: textToProof });
					_this2.proof.txId = txId;
					// this.showTransactionId(txId);
					_this2.machine.transition('showSuccess');
				}
			});
		},
		// showTransactionId: function(txId) {
		// 	this.addMessageDelayed({
		// 		sender: MessageSenderEnum.APP,
		// 		body: {
		// 			type: MessageBodyTypeEnum.LINK,
		// 			description: "This is the Transaction ID",
		// 			title: txId,
		// 			url: this.etherscanLink(txId, 'tx')
		// 		},
		// 	}, this.defaultDelay, true);
		// },
		onFileChange: function onFileChange(event) {
			var _this3 = this;

			console.log('onFileChange', event.target.files, this.machine);
			this.fileUploadFormData.set('file', event.target.files[0]);

			__WEBPACK_IMPORTED_MODULE_4_async_parallel___default()({
				dataUrl: function dataUrl(callback) {
					_this3.getImageDataUrl(_this3.fileUploadFormData.get('file'), function (err, dataUrl) {
						console.log('getImageDataUrl', err);
						if (err) {
							return callback(err);
						}
						_this3.proof.dataUrl = dataUrl;
						return callback(null, dataUrl);
					});
				},
				hasProof: function hasProof(callback) {
					_this3.generateFileHash(_this3.fileUploadFormData.get('file'), function (err, hash) {
						if (err) {
							return callback(err);
						} else {
							_this3.proof.hash = hash;
							//check proof for existence
							window.globalContract.hasProof(hash, function (err, hasProof) {
								return callback(err, hasProof);
							});
						}
					});
				}
			}, function (err, result) {
				console.log(err, result);
				if (err) {
					//TODO: error handling
				} else {
					if (result.dataUrl) {
						_this3.addMessage({
							sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].ME,
							body: {
								type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].IMAGE,
								image: result.dataUrl
							}
						});
					}
					if (result.hasProof) {
						_this3.machine.transition('proofExists');
					} else {
						_this3.machine.transition('giveName');
					}
				}
			});
		},
		preventSubmit: function preventSubmit(event) {
			event.preventDefault();
		},
		showExistingProof: function showExistingProof() {
			var hash = this.proof.hash;
			this.addMessageDelayed({
				sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].APP,
				body: {
					type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].LINK,
					description: "This file has already been notarized",
					title: hash,
					url: this.$router.resolve('/proofs/' + hash).href
				}
			}, this.defaultDelay, true);
		},
		checkImage: function checkImage() {
			var _this4 = this;

			this.generateFileHash(this.fileUploadFormData.get('file'), function (err, hash) {
				if (err) {
					_this4.addMessage({
						sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].APP,
						body: {
							type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].TEXT,
							text: 'Something went wrong D: '
						}
					});
					return false;
				}
				if (_this4.contractReady) {
					window.globalContract.hasProof(hash, function (err, hasProof) {
						if (err) {
							//TODO: handle
							console.log(err);
						} else {
							if (hasProof) {
								_this4.addMessageDelayed({
									sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].APP,
									body: {
										type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].LINK,
										description: "This file has already been notarized",
										title: hash,
										url: _this4.$router.resolve('/proofs/' + hash).href
									}
								}, _this4.defaultDelay, true);
							} else {
								_this4.addMessageDelayed({
									sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].APP,
									body: {
										type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].TEXT,
										text: "No proof found for this file! " + hash
									}
								}, _this4.defaultDelay, true);
							}
						}
					});
				} else {
					console.log('contract not ready');
				}
			});
		},
		startUpload: function startUpload(event) {
			var _this5 = this;

			if (event) {
				event.preventDefault();
			}
			this.$http.post(this.$store.state.apiBaseUrl + '/upload', this.fileUploadFormData).then(function (response) {
				console.log('yay', response);
				var hash = _this5.proof.hash;
				_this5.proof.ipfsHash = response.body.hash;
				_this5.addMessage({
					sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].APP,
					primary: true,
					body: {
						type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].TEXT,
						text: 'Note: The file will be visible to any person with access to the hash.'
					}
				});
				_this5.machine.transition('showSummary');
			}, function (response) {
				console.log('nay', response);
				_this5.addMessage({
					sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].APP,
					primary: true,
					body: {
						type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].TEXT,
						text: 'Something went wrong'
					}
				});
			});
		},
		generateFileHash: function generateFileHash(file, done) {
			var hasher = __webpack_require__("+r+W");
			hasher(file, function (err, hash) {
				return done(err, hash);
			});
		},

		addMessage: function addMessage(message) {
			this.messages.push(message);
			this.scrollDown();
		},
		showSummary: function showSummary() {
			//show order summary before transmitting transaction
			this.showGasEstimate(this.proof.hash, this.proof.description, this.proof.ipfsHash);
		},
		showGasEstimate: function showGasEstimate(textToProof, comment, ipfsHash) {
			var _this6 = this;

			console.log("showGasEstimate", textToProof, comment, ipfsHash);
			if (!ipfsHash) {
				ipfsHash = '';
			}
			if (!comment) {
				comment = '';
			}
			var contract = window.globalContract;
			if (contract) {
				window.globalWeb3.eth.getAccounts(function (err, accounts) {
					if (err || accounts.lenth === 0) {
						//TODO: error handling
					} else {
						contract.notarize.estimateGas(textToProof, comment, ipfsHash, { from: accounts[0] }, function (err, estimate) {
							console.log("showGasEstimate", err, estimate);
							if (!err) {
								var gasPriceEth = _this6.$store.state.gasPrice / 1000000000;
								var ethtimate = gasPriceEth * estimate;
								_this6.addMessageDelayed({
									sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].APP,
									body: {
										type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].TEXT,
										text: 'Estimated transaction fee: ' + ethtimate + ' eth'
									}
								}, _this6.defaultDelay, true);
							}
						});
					}
				});
			}
		},
		checkRequirements: function checkRequirements() {
			var _this7 = this;

			this.showti = true;
			if (window.globalWeb3 && this.$store.state.identity.address && this.$store.state.identity.balance > 0 && this.$store.state.identity.tokenBalance > 0) {
				return this.machine.transition('welcome');
			} else {
				//delay the check because of slow initialisation
				setTimeout(function () {
					//	check web3
					if (!window.globalWeb3) {
						return _this7.machine.transition('noWeb3');
					}
					// check unlocked
					if (_this7.$store.state.identity.address == null) {
						return _this7.machine.transition('notUnlocked');
					}
					// check ether balance TODO: get real balance
					if (_this7.$store.state.identity.balance <= 0) {
						return _this7.machine.transition('noEther');
					}
					// check token balance
					if (_this7.$store.state.identity.tokenBalance <= 0) {
						return _this7.machine.transition('noToken');
					}
					return _this7.machine.transition('welcome');
				}, 1300);
			}
		},
		showProofLink: function showProofLink(hash) {
			this.addMessageDelayed({
				sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].APP,
				body: {
					type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].PROOF,
					hash: hash
				}
			}, this.defaultDelay, true);
		},
		clearProof: function clearProof() {
			this.proof.hash = null;
			this.proof.description = null;
			this.proof.ipfsHash = null;
			this.proof.txId = null;
			this.proof.dataUrl = null;
		},
		openFilePicker: function openFilePicker() {
			this.$refs.fileButton.click();
		},
		showProofList: function showProofList() {
			this.$router.push({ path: '/proofs' });
		},
		getImageDataUrl: function getImageDataUrl(file, done) {
			if (file) {
				var reader = new FileReader();

				reader.onload = function (e) {
					return done(null, e.target.result);
				};

				reader.readAsDataURL(file);
			} else {
				return done(null, null);
			}
		}
	},
	mounted: function mounted() {
		var _this8 = this;

		this.machine.on("transition", function (data) {
			var fromState = data.fromState;
			var toState = data.toState;
			console.log("we just transitioned from " + fromState + " to " + toState);
			var questionText = _this8.machine.getCurrentQuestion().getQuestionText();
			if (questionText && questionText != '') {
				_this8.showQuestionDelayed(questionText);
			}
		});

		this.machine.on("startProof", function () {
			console.log('startProof');
			var text = _this8.proof.hash;
			var comment = _this8.proof.description;
			var ipfsHash = _this8.proof.ipfsHash ? _this8.proof.ipfsHash : '';
			_this8.startProof(text, comment, ipfsHash);
		});

		this.machine.on("showFileUpload", function (showFileUpload) {
			console.log('showFileUpload');
			_this8.showFileUpload = showFileUpload;
		});

		this.machine.on('openFilePicker', function () {
			console.log('openFilePicker');
			_this8.openFilePicker();
		});

		this.machine.on('startUpload', function () {
			console.log('startUpload');
			_this8.startUpload();
		});

		this.machine.on("showFreetext", function (showFreetext) {
			console.log('showFreetext');
			_this8.showFreetext = showFreetext;
		});

		this.machine.on("proofDescriptionGiven", function (givenDescription) {
			console.log('proofDescriptionGiven');
			_this8.proof.description = givenDescription;
		});

		this.machine.on("showSummary", function () {
			_this8.showSummary();
		});

		this.machine.on("clearProof", function () {
			_this8.clearProof();
		});

		this.machine.on("checkRequirements", function () {
			_this8.checkRequirements();
		});

		this.machine.on('proofTextGiven', function (givenText) {
			_this8.proof.hash = givenText;
		});

		this.machine.on('showExistingProof', function () {
			_this8.showExistingProof();
		});

		this.machine.on('showProofList', function () {
			_this8.showProofList();
		});

		this.machine.on('showCreatedProof', function () {
			_this8.showProofLink(_this8.proof.hash);
		});

		this.machine.on('invalidState', function (data) {
			console.log('invalidState', data);
		});

		this.machine.on('showBubble', function (text, settings) {
			_this8.addMessageDelayed({
				sender: __WEBPACK_IMPORTED_MODULE_6__MessageSenderEnum_js__["a" /* default */].APP,
				primary: settings.primary ? true : false,
				body: {
					type: __WEBPACK_IMPORTED_MODULE_7__MessageBodyTypeEnum_js__["a" /* default */].TEXT,
					text: text
				}
			}, _this8.defaultDelay, true);
		});

		this.machine.on('deleteIpfsHash', function () {
			_this8.proof.ipfsHash = null;
		});

		if (this.contractReady) {
			this.machine.setAnswer('go');
		}
		// this.showProofLink('7fa16023269fade88c2286974da405fd9309ecefd50e6cab39c2cf6da6c46c32');
		// this.showProofLink('test');
		// this.$store.commit('addTransaction', {txId: '0x0554296e6cce8bbc05dc11adc348b568e3c95721384114db8acd460058d01c0f', hash: 'test'});
	},
	watch: {
		contractReady: function contractReady() {
			this.machine.setAnswer('go');
		}
	}
});

/***/ }),

/***/ "mt4u":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "oPsS":
/***/ (function(module, exports) {

module.exports = [{"constant":false,"inputs":[{"name":"from","type":"bytes32"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"from","type":"bytes32"},{"name":"to","type":"address"},{"name":"indirectId","type":"bytes32"},{"name":"value","type":"uint256"}],"name":"icapTransfer","outputs":[],"type":"function"},{"constant":false,"inputs":[{"name":"to","type":"bytes32"}],"name":"deposit","outputs":[],"payable":true,"type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"AnonymousDeposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"bytes32"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"bytes32"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"indirectId","type":"bytes32"},{"indexed":false,"name":"value","type":"uint256"}],"name":"IcapTransfer","type":"event"}]

/***/ }),

/***/ "pf14":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "qIkd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_Answer_js__ = __webpack_require__("VqNs");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3e0c5069_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Answer_vue__ = __webpack_require__("G++b");
function injectStyle (ssrContext) {
  __webpack_require__("gb88")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3e0c5069"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_Answer_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3e0c5069_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Answer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "qq5j":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"intro screen"},[_c('div',{staticClass:"nomargin inner"},[_c('div',{staticClass:"nomargin logo img",staticStyle:{"background-image":"url(static/logo.png)"}}),_vm._v(" "),_c('div',{staticClass:"swiper-container"},[_c('div',{staticClass:"swiper-wrapper"},[_vm._m(0),_vm._v(" "),_vm._m(1),_vm._v(" "),_c('div',{staticClass:"swiper-slide"},[_c('div',{staticClass:"img",staticStyle:{"background-image":"url(static/welcome-3.png)"}}),_vm._v(" "),_c('h1',{staticClass:"center"},[_vm._v("Welcome")]),_vm._v(" "),_c('p',{staticClass:"text center"},[_vm._v("\n\t\t\t\t\tIn order to create proofs you need to identify with the Identity Manager. Please download it from the App Store and set up your identity.\n\t\t\t\t\t")]),_vm._v(" "),_c('div',{staticClass:"pink button"},[_c('router-link',{attrs:{"to":"/home"}},[_vm._v("\n\t\t\t\t\t\t\tOpen Identity Manager\n\t\t\t\t\t\t")])],1)])]),_vm._v(" "),_c('div',{staticClass:"center notice"},[_c('router-link',{attrs:{"to":"/home"}},[_vm._v("skip")])],1),_vm._v(" "),_c('div',{staticClass:"swiper-pagination"})])]),_vm._v(" "),(this.$store.state.hasParentWeb3)?_c('div',{staticClass:"quickIdPlaceholder"}):_vm._e()])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"swiper-slide"},[_c('div',{staticClass:"img",staticStyle:{"background-image":"url(static/welcome-1.png)"}}),_vm._v(" "),_c('h1',{staticClass:"center"},[_vm._v("Welcome")]),_vm._v(" "),_c('p',{staticClass:"text center"},[_vm._v("\n\t\t\t\t\tThis is the æxistence. This æpp enables you to proof the existance of digital files on the æternity blockchain and share it with other poeple.\n\t\t\t\t\t")]),_vm._v(" "),_c('div',{staticClass:"pink next button"},[_vm._v("\n\t\t\t\t\t\tNext\n\t\t\t\t\t")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"swiper-slide"},[_c('div',{staticClass:"img",staticStyle:{"background-image":"url(static/welcome-2.png)"}}),_vm._v(" "),_c('h1',{staticClass:"center"},[_vm._v("Proofs")]),_vm._v(" "),_c('p',{staticClass:"text center"},[_vm._v("\n\t\t\t\t\tProofs are unchallengeable evidence that a file existed at a specific time in the past. They are immutable and resistent to manipulation.\n\t\t\t\t\t")]),_vm._v(" "),_c('div',{staticClass:"pink next button"},[_vm._v("\n\t\t\t\t\t\tNext\n\t\t\t\t\t")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "rlol":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Identity_vue__ = __webpack_require__("NsM9");

/* harmony default export */ __webpack_exports__["a"] = ({
	template: '#home',
	components: {
		'identity': __WEBPACK_IMPORTED_MODULE_0__Identity_vue__["a" /* default */]
	}
});

/***/ }),

/***/ "sHmX":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sw+o":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_ProofsList_js__ = __webpack_require__("9spv");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0fe996d0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ProofsList_vue__ = __webpack_require__("Kw7J");
function injectStyle (ssrContext) {
  __webpack_require__("LeEj")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0fe996d0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_ProofsList_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0fe996d0_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_ProofsList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "uslO":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "3CJN",
	"./af.js": "3CJN",
	"./ar": "3MVc",
	"./ar-dz": "tkWw",
	"./ar-dz.js": "tkWw",
	"./ar-kw": "j8cJ",
	"./ar-kw.js": "j8cJ",
	"./ar-ly": "wPpW",
	"./ar-ly.js": "wPpW",
	"./ar-ma": "dURR",
	"./ar-ma.js": "dURR",
	"./ar-sa": "7OnE",
	"./ar-sa.js": "7OnE",
	"./ar-tn": "BEem",
	"./ar-tn.js": "BEem",
	"./ar.js": "3MVc",
	"./az": "eHwN",
	"./az.js": "eHwN",
	"./be": "3hfc",
	"./be.js": "3hfc",
	"./bg": "lOED",
	"./bg.js": "lOED",
	"./bn": "aM0x",
	"./bn.js": "aM0x",
	"./bo": "w2Hs",
	"./bo.js": "w2Hs",
	"./br": "OSsP",
	"./br.js": "OSsP",
	"./bs": "aqvp",
	"./bs.js": "aqvp",
	"./ca": "wIgY",
	"./ca.js": "wIgY",
	"./cs": "ssxj",
	"./cs.js": "ssxj",
	"./cv": "N3vo",
	"./cv.js": "N3vo",
	"./cy": "ZFGz",
	"./cy.js": "ZFGz",
	"./da": "YBA/",
	"./da.js": "YBA/",
	"./de": "DOkx",
	"./de-at": "8v14",
	"./de-at.js": "8v14",
	"./de-ch": "Frex",
	"./de-ch.js": "Frex",
	"./de.js": "DOkx",
	"./dv": "rIuo",
	"./dv.js": "rIuo",
	"./el": "CFqe",
	"./el.js": "CFqe",
	"./en-au": "Sjoy",
	"./en-au.js": "Sjoy",
	"./en-ca": "Tqun",
	"./en-ca.js": "Tqun",
	"./en-gb": "hPuz",
	"./en-gb.js": "hPuz",
	"./en-ie": "ALEw",
	"./en-ie.js": "ALEw",
	"./en-nz": "dyB6",
	"./en-nz.js": "dyB6",
	"./eo": "Nd3h",
	"./eo.js": "Nd3h",
	"./es": "LT9G",
	"./es-do": "7MHZ",
	"./es-do.js": "7MHZ",
	"./es.js": "LT9G",
	"./et": "XlWM",
	"./et.js": "XlWM",
	"./eu": "sqLM",
	"./eu.js": "sqLM",
	"./fa": "2pmY",
	"./fa.js": "2pmY",
	"./fi": "nS2h",
	"./fi.js": "nS2h",
	"./fo": "OVPi",
	"./fo.js": "OVPi",
	"./fr": "tzHd",
	"./fr-ca": "bXQP",
	"./fr-ca.js": "bXQP",
	"./fr-ch": "VK9h",
	"./fr-ch.js": "VK9h",
	"./fr.js": "tzHd",
	"./fy": "g7KF",
	"./fy.js": "g7KF",
	"./gd": "nLOz",
	"./gd.js": "nLOz",
	"./gl": "FuaP",
	"./gl.js": "FuaP",
	"./gom-latn": "+27R",
	"./gom-latn.js": "+27R",
	"./he": "Nzt2",
	"./he.js": "Nzt2",
	"./hi": "ETHv",
	"./hi.js": "ETHv",
	"./hr": "V4qH",
	"./hr.js": "V4qH",
	"./hu": "xne+",
	"./hu.js": "xne+",
	"./hy-am": "GrS7",
	"./hy-am.js": "GrS7",
	"./id": "yRTJ",
	"./id.js": "yRTJ",
	"./is": "upln",
	"./is.js": "upln",
	"./it": "FKXc",
	"./it.js": "FKXc",
	"./ja": "ORgI",
	"./ja.js": "ORgI",
	"./jv": "JwiF",
	"./jv.js": "JwiF",
	"./ka": "RnJI",
	"./ka.js": "RnJI",
	"./kk": "j+vx",
	"./kk.js": "j+vx",
	"./km": "5j66",
	"./km.js": "5j66",
	"./kn": "gEQe",
	"./kn.js": "gEQe",
	"./ko": "eBB/",
	"./ko.js": "eBB/",
	"./ky": "6cf8",
	"./ky.js": "6cf8",
	"./lb": "z3hR",
	"./lb.js": "z3hR",
	"./lo": "nE8X",
	"./lo.js": "nE8X",
	"./lt": "/6P1",
	"./lt.js": "/6P1",
	"./lv": "jxEH",
	"./lv.js": "jxEH",
	"./me": "svD2",
	"./me.js": "svD2",
	"./mi": "gEU3",
	"./mi.js": "gEU3",
	"./mk": "Ab7C",
	"./mk.js": "Ab7C",
	"./ml": "oo1B",
	"./ml.js": "oo1B",
	"./mr": "5vPg",
	"./mr.js": "5vPg",
	"./ms": "ooba",
	"./ms-my": "G++c",
	"./ms-my.js": "G++c",
	"./ms.js": "ooba",
	"./my": "F+2e",
	"./my.js": "F+2e",
	"./nb": "FlzV",
	"./nb.js": "FlzV",
	"./ne": "/mhn",
	"./ne.js": "/mhn",
	"./nl": "3K28",
	"./nl-be": "Bp2f",
	"./nl-be.js": "Bp2f",
	"./nl.js": "3K28",
	"./nn": "C7av",
	"./nn.js": "C7av",
	"./pa-in": "pfs9",
	"./pa-in.js": "pfs9",
	"./pl": "7LV+",
	"./pl.js": "7LV+",
	"./pt": "ZoSI",
	"./pt-br": "AoDM",
	"./pt-br.js": "AoDM",
	"./pt.js": "ZoSI",
	"./ro": "wT5f",
	"./ro.js": "wT5f",
	"./ru": "ulq9",
	"./ru.js": "ulq9",
	"./sd": "fW1y",
	"./sd.js": "fW1y",
	"./se": "5Omq",
	"./se.js": "5Omq",
	"./si": "Lgqo",
	"./si.js": "Lgqo",
	"./sk": "OUMt",
	"./sk.js": "OUMt",
	"./sl": "2s1U",
	"./sl.js": "2s1U",
	"./sq": "V0td",
	"./sq.js": "V0td",
	"./sr": "f4W3",
	"./sr-cyrl": "c1x4",
	"./sr-cyrl.js": "c1x4",
	"./sr.js": "f4W3",
	"./ss": "7Q8x",
	"./ss.js": "7Q8x",
	"./sv": "Fpqq",
	"./sv.js": "Fpqq",
	"./sw": "DSXN",
	"./sw.js": "DSXN",
	"./ta": "+7/x",
	"./ta.js": "+7/x",
	"./te": "Nlnz",
	"./te.js": "Nlnz",
	"./tet": "gUgh",
	"./tet.js": "gUgh",
	"./th": "XzD+",
	"./th.js": "XzD+",
	"./tl-ph": "3LKG",
	"./tl-ph.js": "3LKG",
	"./tlh": "m7yE",
	"./tlh.js": "m7yE",
	"./tr": "k+5o",
	"./tr.js": "k+5o",
	"./tzl": "iNtv",
	"./tzl.js": "iNtv",
	"./tzm": "FRPF",
	"./tzm-latn": "krPU",
	"./tzm-latn.js": "krPU",
	"./tzm.js": "FRPF",
	"./uk": "ntHu",
	"./uk.js": "ntHu",
	"./ur": "uSe8",
	"./ur.js": "uSe8",
	"./uz": "XU1s",
	"./uz-latn": "/bsm",
	"./uz-latn.js": "/bsm",
	"./uz.js": "XU1s",
	"./vi": "0X8Q",
	"./vi.js": "0X8Q",
	"./x-pseudo": "e/KL",
	"./x-pseudo.js": "e/KL",
	"./yo": "YXlc",
	"./yo.js": "YXlc",
	"./zh-cn": "Vz2w",
	"./zh-cn.js": "Vz2w",
	"./zh-hk": "ZUyn",
	"./zh-hk.js": "ZUyn",
	"./zh-tw": "BbgG",
	"./zh-tw.js": "BbgG"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "uslO";

/***/ }),

/***/ "v4YQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_Topbar_js__ = __webpack_require__("bb87");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5e6a5f49_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Topbar_vue__ = __webpack_require__("v4qy");
function injectStyle (ssrContext) {
  __webpack_require__("sHmX")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5e6a5f49"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_Topbar_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5e6a5f49_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Topbar_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "v4qy":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.thisclass},[_c('header',[_c('div',{staticClass:"action left"},[_c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.showBurger),expression:"showBurger"}],on:{"click":_vm.toggleopen}},[_c('svg',{staticClass:"burger",attrs:{"width":"20","height":"14","viewBox":"0 0 20 14","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"fill":"#4A4A4A","fill-rule":"evenodd","d":"M0 0h20v2H0zM0 6h20v2H0zM0 12h20v2H0z"}})])]),_vm._v(" "),_c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.showBack),expression:"showBack"}],on:{"click":function($event){_vm.$router.push("/proofs")}}},[_c('svg',{staticClass:"back",attrs:{"width":"11","height":"18","viewBox":"0 0 11 18","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M11 2L9 0 0 9l9 9 2-2-7-7z","fill":"#4A4A4A","fill-rule":"evenodd"}})])])]),_vm._v(" "),_c('div',{staticClass:"title center"},[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('div',{staticClass:"action right"},[_c('router-link',{directives:[{name:"show",rawName:"v-show",value:(_vm.showAdd),expression:"showAdd"}],attrs:{"to":"/chat"}},[_c('svg',{attrs:{"width":"20","height":"20","viewBox":"0 0 20 20","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"fill":"#4A4A4A","fill-rule":"evenodd"}},[_c('path',{attrs:{"d":"M0 9h20v2H0z"}}),_c('path',{attrs:{"d":"M11 0v20H9V0z"}})])])])],1)]),_vm._v(" "),(_vm.showQuickId)?_c('identity'):_vm._e(),_vm._v(" "),_c('nav',[_c('div',{staticClass:"inner"},[_c('div',{staticClass:"center"},[_c('avatar',{attrs:{"address":_vm.identity.address}}),_vm._v(" "),_c('div',{staticClass:"name"},[_vm._v("\n\t\t\t\t\t"+_vm._s(_vm.identity.name)+"\n\t\t\t\t")])],1),_vm._v(" "),_vm._l((_vm.entris),function(entry){return _c('menu-entry',{attrs:{"link":entry.link,"label":entry.label}})})],2)])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),

/***/ "wnF+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MessageSenderEnum_js__ = __webpack_require__("FyjB");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__MessageBodyTypeEnum_js__ = __webpack_require__("+D7v");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_helper__ = __webpack_require__("j27a");



/* harmony default export */ __webpack_exports__["a"] = ({
	name: 'speech',
	props: ['body', 'sender', 'primary'],
	mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_helper__["a" /* default */]],
	data: function data() {
		return {
			proof: {
				loading: true,
				data: {
					contract: null,
					owner: null,
					created: null,
					block: null,
					title: null,
					fileSha256: null,
					ipfsHash: null,
					txId: null
				}
			}
		};
	},
	computed: {
		thisclass: function thisclass() {
			return {
				'app': this.sender === __WEBPACK_IMPORTED_MODULE_0__MessageSenderEnum_js__["a" /* default */].APP,
				'me': this.sender === __WEBPACK_IMPORTED_MODULE_0__MessageSenderEnum_js__["a" /* default */].ME,
				'body-type-image ': this.body.type === __WEBPACK_IMPORTED_MODULE_1__MessageBodyTypeEnum_js__["a" /* default */].IMAGE,
				'body-type-text ': this.body.type === __WEBPACK_IMPORTED_MODULE_1__MessageBodyTypeEnum_js__["a" /* default */].TEXT || this.body.type === __WEBPACK_IMPORTED_MODULE_1__MessageBodyTypeEnum_js__["a" /* default */].LINK,
				'body-type-proof ': this.body.type === __WEBPACK_IMPORTED_MODULE_1__MessageBodyTypeEnum_js__["a" /* default */].PROOF,
				'speech': true,
				'primary': this.primary ? true : false
			};
		},
		style: function style() {
			return {
				backgroundImage: this.body.type === __WEBPACK_IMPORTED_MODULE_1__MessageBodyTypeEnum_js__["a" /* default */].IMAGE ? "url('" + this.body.image + "')" : null
			};
		},
		contractReady: function contractReady() {
			return this.$store.state.contractReady;
		},
		proofImage: function proofImage() {
			if (this.proof.data.ipfsHash) {
				return this.$store.state.apiBaseUrl + '/uploads/' + this.proof.data.ipfsHash;
			} else {
				return null;
			}
		}
	},
	methods: {
		loadProof: function loadProof() {
			var _this = this;

			var contract = window.globalContract;
			if (contract) {
				contract.getProof(this.body.hash, function (err, rawProof) {
					console.log(err, rawProof);
					if (!err && rawProof) {
						_this.proof.data.contract = _this.$store.state.contractAddress;
						_this.proof.data.owner = rawProof[0];
						_this.proof.data.created = rawProof[1];
						_this.proof.data.block = rawProof[2];
						_this.proof.data.title = rawProof[3];
						_this.proof.data.ipfsHash = rawProof[4];
						_this.proof.data.fileSha256 = rawProof[5];
						_this.proof.loading = false;
					} else {
						var txId = _this.$store.getters.getTxByHash(_this.body.hash);
						if (txId) {
							_this.proof.data.txId = txId;
						}
						_this.proof.loading = false;
					}
				});
			}

			setTimeout(function () {
				_this.proof.loading = false;
			}, 2000);
		}
	},
	mounted: function mounted() {
		if (this.body.type === __WEBPACK_IMPORTED_MODULE_1__MessageBodyTypeEnum_js__["a" /* default */].PROOF) {
			if (this.contractReady) {
				this.loadProof();
			}
		}
	},
	watch: {
		contractReady: function contractReady(val) {
			if (val === true) {
				if (this.body.type === __WEBPACK_IMPORTED_MODULE_1__MessageBodyTypeEnum_js__["a" /* default */].PROOF) {
					this.loadProof();
				}
			}
		}
	}
});

/***/ }),

/***/ "xa4f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_Intro_js__ = __webpack_require__("QghM");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6dd82791_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Intro_vue__ = __webpack_require__("qq5j");
function injectStyle (ssrContext) {
  __webpack_require__("pf14")
}
var normalizeComponent = __webpack_require__("VU/8")
/* script */
/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_Intro_js__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6dd82791_hasScoped_false_transformToRequire_video_src_source_src_img_src_image_xlink_href_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Intro_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ "yDwQ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "yHou":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"menu-entry"},[_c('router-link',{attrs:{"to":_vm.link}},[_c('svg',{attrs:{"width":"24","height":"18","viewBox":"0 0 24 18","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"stroke-width":".7","transform":"translate(1)","stroke":"#F03C6E","fill":"none","fill-rule":"evenodd"}},[_c('path',{attrs:{"d":"M8.615 7.653L11.371 6.5c.525-.219 1.32-.219 1.841 0l2.012.841c.295.125.84.125 1.14 0l2.01-.84c.523-.22 1.315-.22 1.837 0l2.752 1.152M8.615 9.702l2.756-1.152c.525-.22 1.32-.22 1.841 0l2.012.84c.295.126.84.126 1.14 0l2.01-.84c.523-.22 1.315-.22 1.837 0l2.752 1.152M8.615 11.547l2.756-1.152c.525-.22 1.32-.22 1.841 0l2.012.84c.295.126.84.126 1.14 0l2.01-.84c.523-.22 1.315-.22 1.837 0l2.752 1.152","stroke-linecap":"round"}}),_vm._v(" "),_c('circle',{attrs:{"cx":"8.404","cy":"9","r":"8.404"}}),_vm._v(" "),_c('circle',{attrs:{"cx":"8.404","cy":"9","r":"6.751"}})])]),_vm._v("\n\t\t"+_vm._s(_vm.label)+"\n\t")])],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

},["NHnr"]);
//# sourceMappingURL=app.dede4c0f6e445a4d38d9.js.map