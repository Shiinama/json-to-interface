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
function toOptionalKey(key) {
    return key.endsWith('?') ? key : "".concat(key, "?");
}
// 处理首字母大写
function capitalize(name) {
    name = name.endsWith('?') ? name.substring(0, name.length - 1) : name;
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
    var copyKey = value === null ? "  ".concat(toOptionalKey(key)) : '  ' + key;
    return copyKey;
}
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
function margeTypesFn(array, margenLen) {
    var commonObj = {};
    var commonKeys = [];
    var obj = {};
    array.forEach(function (_a) {
        var key = _a.key;
        commonObj[key] ? commonObj[key]++ : (commonObj[key] = 1);
        if (commonObj[key] === margenLen) {
            commonKeys.push(key);
        }
    });
    var result = array.reduce(function (p, c) {
        if (obj[c.key]) {
            obj[c.key].type = Array.from(new Set([obj[c.key].type]).add(c.type)).join(' | ');
        }
        else {
            obj[c.key] = c;
            !commonKeys.includes(c.key) && (c.key = "".concat(c.key, "?"));
            p.push(c);
        }
        return p;
    }, []);
    return result;
}
function incrementKey(key) {
    var count = 0;
    var originKey = key;
    function fn() {
        console.log(count);
        var newKey = count ? "".concat(originKey).concat(count) : originKey;
        count++;
        return newKey;
    }
    return fn;
}
function dealArray(_a) {
    var types = _a.types, key = _a.key, value = _a.value;
    var isObjectArray = value.reduce(function (a, b) { return a && (0, index_1.isObject)(b); }, true);
    if (isObjectArray) {
        var merageTypes = [];
        var merageValue = {};
        var margenLen = 0;
        for (var i = 0; i < types.length; i++) {
            margenLen++;
            merageTypes.push.apply(merageTypes, types[i].types);
            Object.assign(merageValue, types[i].value);
        }
        if (merageTypes.length > 0) {
            merageTypes = margeTypesFn(merageTypes, margenLen);
            switchQuoteType({
                type: 'Object',
                types: merageTypes,
                key: key,
                value: merageValue
            });
        }
        return "".concat(capitalize(key), "[]");
    }
    else {
        // 非对象数组的key需要递增
        var KeySet = new Set();
        var increment = incrementKey(key);
        for (var i = 0; i < types.length; i++) {
            if (types[i].type === 'Object') {
                types[i].key = increment();
                KeySet.add(capitalize(types[i].key));
                switchQuoteType(types[i], true);
            }
            else if (types[i].type === 'Array') {
                types[i].type = 'Object';
                types[i].key = increment();
                KeySet.add(dealArray(types[i]));
            }
            else {
                KeySet.add(types[i].type);
            }
        }
        increment = null;
        var typeStr = "( ".concat(Array.from(KeySet).join(' | '), " )[]");
        return typeStr;
    }
}
function switchQuoteType(intermediateData, needOptimize) {
    if (needOptimize === void 0) { needOptimize = false; }
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
            console.log(HashNameMap);
            // 仅仅给引用类型添加id
            HashValueMap[key] = (0, index_1.Hash)(JSON.stringify(intermediateData.value));
            // 处理重复value
            var repetiteObj = repetite(key);
            if (!repetiteObj.isReped || needOptimize) {
                dealObj({ types: types, key: key });
            }
            return "  ".concat(createKey(intermediateData.value, intermediateData.key), ": ").concat(capitalize(repetiteObj.key), "; \n");
        case 'Array':
            var keyStr = dealArray({ types: types, key: key, value: value });
            return "  ".concat(createKey(intermediateData.value, intermediateData.key), ": ").concat(keyStr, "; \n");
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