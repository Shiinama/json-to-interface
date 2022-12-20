"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.out = exports.switchQuoteType = void 0;
/*
 * @Description:
 * @Date: 2022-12-18 16:24:48
 */
var index_1 = require("../../until/index");
var outArr = [];
var HashValueMap = {};
var HashNameMap = {};
var isArrayObject = false;
// 处理首字母大写
function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
// 处理重复interface value
function repetite(key) {
    var arr = Object.values(HashValueMap).filter(function (i) { return i === HashValueMap[key]; });
    if (arr.length > 1) {
        return {
            isReped: true,
            // 取首个命名
            key: Object.keys(HashValueMap).find(function (key) { return HashValueMap[key] === arr[0]; })
        };
    }
    else {
        return { isReped: false, key: key };
    }
}
// 处理空值判断
function createKey(value, key) {
    var copyKey = value === null ? "  ".concat(key, "?") : '  ' + key;
    return copyKey;
}
// 处理对象
function dealObj(_a) {
    var types = _a.types, key = _a.key;
    var typeStr = '';
    for (var i = 0; i < types.length; i++) {
        typeStr += switchQuoteType(types[i]);
    }
    var interfaceString = "interface ".concat(capitalize(key), " {\n");
    interfaceString += typeStr;
    interfaceString += '}';
    outArr.push(interfaceString);
}
function dealArray(_a) {
    var types = _a.types, key = _a.key, value = _a.value;
    var isObjectArray = value.reduce(function (a, b) { return a && (0, index_1.isObject)(b); }, true);
    if (isObjectArray) {
    }
    else {
        var typeSet = new Set();
        for (var i = 0; i < types.length; i++) {
            if (['Object', 'Array'].includes(types[i].type)) {
                types[i].key = key;
                switchQuoteType(types[i]);
                isArrayObject = true;
                typeSet.add(capitalize(key));
            }
            else {
                typeSet.add(types[i].type);
            }
        }
        var typeStr = typeSet.size > 1
            ? '(' + Array.from(typeSet).join(' | ') + ')'
            : Array.from(typeSet).join('|');
        return typeStr;
    }
}
function switchQuoteType(intermediateData) {
    // 先干掉空格
    intermediateData.key = intermediateData.key.replace(/\s/g, '');
    var type = intermediateData.type, key = intermediateData.key, types = intermediateData.types, value = intermediateData.value;
    switch (type) {
        case 'Object':
            // 处理重复name
            if (HashNameMap[key]) {
                HashNameMap[key]++;
                key = "".concat(key).concat(HashNameMap[key]);
            }
            else {
                HashNameMap[key] = 1;
            }
            // 仅仅给引用类型添加id
            HashValueMap[key] = (0, index_1.Hash)(JSON.stringify(intermediateData.value));
            // 处理重复value
            var repetiteObj = repetite(key);
            if (!repetiteObj.isReped) {
                if (!isArrayObject) {
                    dealObj({ types: types, key: key });
                }
                else {
                    console.log('另外个方法');
                }
            }
            return "  ".concat(createKey(intermediateData.value, intermediateData.key), ": ").concat(capitalize(repetiteObj.key), "; \n");
        case 'Array':
            var keyStr = dealArray({ types: types, key: key, value: value });
            return "  ".concat(createKey(intermediateData.value, intermediateData.key), ": ").concat(keyStr, "[]; \n");
        default:
            return "  ".concat(createKey(intermediateData.value, key), ": ").concat(type, "; \n");
    }
}
exports.switchQuoteType = switchQuoteType;
function out(midData) {
    HashValueMap = {};
    HashNameMap = {};
    outArr = [];
    switchQuoteType(midData);
    return outArr;
}
exports.out = out;
//# sourceMappingURL=create-interface.js.map