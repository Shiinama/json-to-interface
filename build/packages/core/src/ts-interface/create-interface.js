"use strict";
/*
 * @Description:
 * @Date: 2022-12-18 16:24:48
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.out = exports.switchQuoteType = void 0;
var outArr = [];
// 处理首字母大写
function capitalize(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
function createKey(value, key) {
    var copyKey = value === null ? "  ".concat(key, "?") : '  ' + key;
    return copyKey;
}
function dealObj(_a) {
    var types = _a.types, key = _a.key, type = _a.type;
    var typeStr = '';
    for (var i = 0; i < types.length; i++) {
        typeStr += switchQuoteType(types[i]);
    }
    var interfaceString = "interface ".concat(capitalize(key), " {\n");
    interfaceString += typeStr;
    interfaceString += '}';
    outArr.push(interfaceString);
    return typeStr;
}
function switchQuoteType(intermediateData) {
    var types = intermediateData.types, type = intermediateData.type, key = intermediateData.key;
    switch (type) {
        case 'Object':
            dealObj(intermediateData);
            return "  ".concat(createKey(intermediateData.value, key), ": ").concat(capitalize(key), "; \n");
        case 'Array':
        default:
            return "  ".concat(createKey(intermediateData.value, key), ": ").concat(type, "; \n");
    }
}
exports.switchQuoteType = switchQuoteType;
function out(JSON) {
    switchQuoteType(JSON);
    return outArr;
}
exports.out = out;
//# sourceMappingURL=create-interface.js.map