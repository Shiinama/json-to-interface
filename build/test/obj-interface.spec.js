"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Description:
 * @Date: 2022-12-19 20:32:48
 */
var assert = require("assert");
var index_1 = require("../packages/core/src/index");
var clearWhiteSpace = function (str) { return str.replace(/\s/g, ''); };
describe('对象interface测试', function () {
    it('常规对象', function () {
        var json = {
            a: {
                b: 42
            }
        };
        var testTypes = [
            "interface OriginKey {\n        a: A;\n      }",
            "interface A {\n        b: number;\n      }"
        ].map(clearWhiteSpace);
        (0, index_1.default)(json).forEach(function (i) {
            var noWhiteSpaceInterface = clearWhiteSpace(i);
            assert(testTypes.includes(noWhiteSpaceInterface));
        });
    });
    it('重复对象', function () {
        var json = {
            a: 1,
            b: 2,
            c: {
                d: 1
            },
            f: {
                d: 1
            }
        };
        var testTypes = [
            "interface OriginKey {\n        a: number;\n        b: number;\n        c: C;\n        f: C;\n      }",
            "interface C {\n        d: number;\n      }"
        ].map(clearWhiteSpace);
        (0, index_1.default)(json).forEach(function (i) {
            var noWhiteSpaceInterface = clearWhiteSpace(i);
            assert(testTypes.includes(noWhiteSpaceInterface));
        });
    });
    it('重复对象,父子key重叠', function () {
        var json = {
            f: {
                f: {
                    d: 1,
                    g: 2,
                    f: {
                        d: 1,
                        g: 2
                    }
                }
            },
            h: {
                f: {
                    d: 1,
                    g: 2,
                    f: {
                        d: 1,
                        g: 2
                    }
                }
            }
        };
        var testTypes = [
            "interface OriginKey {\n        f: F;\n        h: F;\n      }",
            "interface F {\n          f: F2;\n      }",
            "interface F2 {\n          d: number;\n          g: number;\n          f: F3;\n      }",
            "interface F3 {\n        d: number;\n        g: number;\n      }"
        ].map(clearWhiteSpace);
        (0, index_1.default)(json).forEach(function (i) {
            var noWhiteSpaceInterface = clearWhiteSpace(i);
            assert(testTypes.includes(noWhiteSpaceInterface));
        });
    });
});
//# sourceMappingURL=obj-interface.spec.js.map