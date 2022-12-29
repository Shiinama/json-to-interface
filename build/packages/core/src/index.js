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
var get_types_value_1 = require("./formatter-data/get-types-value");
var create_interface_1 = require("./ts-interface/create-interface");
var es7_shim_1 = require("es7-shim/es7-shim");
var parser_1 = require("@babel/parser");
(0, es7_shim_1.shim)();
var defaultOptions = {
    fKey: 'originKey'
};
function JsonToTS(json, options) {
    var finallyOptions = __assign(__assign({}, defaultOptions), options);
    var comments, newJson = JSON.parse(JSON.stringify(json));
    if (typeof newJson === 'string') {
        //筛选出注释数据
        comments = (0, parser_1.parse)("let ".concat(finallyOptions.fKey, " = ").concat(newJson), {
            sourceType: 'unambiguous'
        });
        //去掉注释
        var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g;
        try {
            newJson = JSON.parse(newJson.replace(reg, function (value) {
                return /^\/{2,}/.test(value) || /^\/\*/.test(value) ? '' : value;
            }));
        }
        catch (_a) {
            throw new Error('Non-standard  Json format | 非标准JSON格式');
        }
    }
    if (!(0, until_1.isObject)(newJson)) {
        throw new Error('Only Object are supported | 仅支持对象');
    }
    // 返回数组结构的types
    var typesValue = (0, get_types_value_1.getTypesValue)(newJson);
    typesValue['key'] = finallyOptions.fKey;
    var data = (0, create_interface_1.out)(typesValue);
    return data;
}
exports.default = JsonToTS;
JsonToTS.default = JsonToTS;
module.exports = JsonToTS;
//# sourceMappingURL=index.js.map