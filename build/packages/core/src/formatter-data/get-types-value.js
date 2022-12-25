"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypesValue = void 0;
/*
 * @Description:
 * @Date: 2022-12-12 19:26:05
 */
var model_1 = require("../../model/model");
var index_1 = require("../../until/index");
function dealObj(obj) {
    var seprateArr = Object.entries(obj).reduce(function (pre, _a) {
        var key = _a[0], value = _a[1];
        var _b = getTypesValue(value), types = _b.types, type = _b.type;
        var param = {
            type: type,
            types: types,
            key: key,
            value: value
        };
        pre.push(param);
        return pre;
    }, []);
    return seprateArr;
}
// 检测器，类型的处理器
function getTypesValue(value) {
    var valueBtype = (0, index_1.getJsonType)(value);
    var typeValue;
    switch (valueBtype) {
        case model_1.TypeGroup.Array:
            typeValue = dealObj(value);
            return {
                type: 'Array',
                types: typeValue
            };
        case model_1.TypeGroup.Object:
            typeValue = dealObj(value);
            return {
                type: 'Object',
                types: typeValue
            };
        case model_1.TypeGroup.Primitive:
            typeValue = (0, index_1.getPrimtiveTypeStr)(value);
            return {
                type: typeValue
            };
    }
}
exports.getTypesValue = getTypesValue;
//# sourceMappingURL=get-types-value.js.map