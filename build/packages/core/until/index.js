"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonType = exports.isDate = exports.isBlooen = exports.getPrimtiveTypeStr = exports.isArray = exports.isObject = void 0;
/*
 * @Description:
 * @Date: 2022-12-12 19:12:51
 */
var model_1 = require("../model/model");
function isObject(value) {
    return (Object.prototype.toString.call(value) === '[object Object]' &&
        value !== null);
}
exports.isObject = isObject;
function isArray(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
}
exports.isArray = isArray;
function getPrimtiveTypeStr(value) {
    if (value === null) {
        return 'null';
    }
    else if (isDate(value)) {
        return 'Date';
    }
    else {
        return typeof value;
    }
}
exports.getPrimtiveTypeStr = getPrimtiveTypeStr;
function isBlooen(value) {
    return Object.prototype.toString.call(value) === '[object Boolean]';
}
exports.isBlooen = isBlooen;
function isDate(value) {
    return value instanceof Date;
}
exports.isDate = isDate;
function getJsonType(Json) {
    if (isObject(Json)) {
        return model_1.TypeGroup.Object;
    }
    else if (isArray(Json)) {
        return model_1.TypeGroup.Array;
    }
    else {
        return model_1.TypeGroup.Primitive;
    }
}
exports.getJsonType = getJsonType;
//# sourceMappingURL=index.js.map