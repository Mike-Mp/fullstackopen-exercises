"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var baseUrl = "/api/persons";

var getAll = function getAll() {
  var result = _axios["default"].get(baseUrl);

  return result.then(function (res) {
    return res.data;
  });
};

var updatePerson = function updatePerson(id, updatedPerson) {
  var result = _axios["default"].put("".concat(baseUrl, "/").concat(id), updatedPerson).then(function (res) {
    return res.data;
  });

  return result;
};

var postPerson = function postPerson(newPerson) {
  var result = _axios["default"].post(baseUrl, newPerson);

  return result.then(function (res) {
    return res.data;
  });
};

var deletePerson = function deletePerson(id) {
  var result = _axios["default"]["delete"]("".concat(baseUrl, "/").concat(id));

  return result;
};

var _default = {
  getAll: getAll,
  updatePerson: updatePerson,
  postPerson: postPerson,
  deletePerson: deletePerson
};
exports["default"] = _default;