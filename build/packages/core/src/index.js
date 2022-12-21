"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description:
 * @Date: 2022-12-12 16:29:59
 */
var until_1 = require("../until");
var model_1 = require("../model/model");
var get_types_value_1 = require("./formatter-data/get-types-value");
var create_interface_1 = require("./ts-interface/create-interface");
var es7_shim_1 = require("es7-shim/es7-shim");
(0, es7_shim_1.shim)();
var defaultOptions = {
    fKey: 'originKey'
};
function JsonToTS(json, options) {
    var finallyOptions = __assign(__assign({}, defaultOptions), options);
    var JsonType = (0, until_1.getJsonType)(json);
    if (JsonType === model_1.TypeGroup.Primitive) {
        throw new Error('仅支持对象和数组');
    }
    // 返回数组结构的types
    var typesValue = (0, get_types_value_1.getTypesValue)(json, finallyOptions);
    typesValue['key'] = finallyOptions.fKey;
    var data = (0, create_interface_1.out)(typesValue);
    return data;
}
exports.default = JsonToTS;
//# sourceMappingURL=index.js.map