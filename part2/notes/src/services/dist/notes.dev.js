"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseUrl = "/api/notes";

var getAll = function getAll() {
  var request = _axios["default"].get(baseUrl);

  var nonExisting = {
    id: 10000,
    content: "This is not saved to server",
    date: "2019-05-30T17L30L31.098Z",
    important: true
  };
  return request.then(function (res) {
    return res.data.concat(nonExisting);
  });
};

var create = function create(newObject) {
  var request = _axios["default"].post(baseUrl, newObject);

  return request.then(function (res) {
    return res.data;
  });
};

var update = function update(id, changedObject) {
  var request = _axios["default"].put("".concat(baseUrl, "/").concat(id), changedObject);

  return request.then(function (res) {
    return res.data;
  });
};

var _default = {
  getAll: getAll,
  create: create,
  update: update
};
exports["default"] = _default;