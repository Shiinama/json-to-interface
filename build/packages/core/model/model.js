"use strict";
/*
 * @Description:
 * @Date: 2022-12-12 19:29:31
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeGroup = void 0;
var TypeGroup;
(function (TypeGroup) {
    TypeGroup[TypeGroup["Array"] = 0] = "Array";
    TypeGroup[TypeGroup["Object"] = 1] = "Object";
    TypeGroup[TypeGroup["Primitive"] = 2] = "Primitive";
})(TypeGroup = exports.TypeGroup || (exports.TypeGroup = {}));
var json = {
    arr: [{ a: 1, b: 2 }, { g: 1, d: 2 }, [1, { a: 1, b: 2 }]]
};
//# sourceMappingURL=model.js.map