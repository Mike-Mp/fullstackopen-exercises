"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _axios=_interopRequireDefault(require("axios"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var baseUrl="http://localhost:3001/notes",getAll=function(){var e=_axios.default.get(baseUrl),t={id:1e4,content:"This is not saved to server",date:"2019-05-30T17L30L31.098Z",important:!0};return e.then(function(e){return e.data.concat(t)})},create=function(e){return _axios.default.post(baseUrl,e).then(function(e){return e.data})},update=function(e,t){return _axios.default.put("".concat(baseUrl,"/").concat(e),t).then(function(e){return e.data})},_default={getAll:getAll,create:create,update:update};exports.default=_default;