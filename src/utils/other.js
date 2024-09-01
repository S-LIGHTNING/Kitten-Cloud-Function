"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.None = void 0;
exports.equal = equal;
exports.merge = merge;
exports.None = null;
function equal(a, b) {
    if (a === b) {
        return true;
    }
    if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor != b.constructor) {
            return false;
        }
        if (Array.isArray(a)) {
            if (a.length != b.length) {
                return false;
            }
            for (var i = 0; i < a.length; i++) {
                if (!equal(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        }
        var keys = Object.keys(a);
        if (keys.length != Object.keys(b).length) {
            return false;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (!(key in b) || !equal(a[key], b[key])) {
                return false;
            }
        }
        return true;
    }
    return false;
}
function merge(target, source) {
    for (var key in source) {
        if (typeof source[key] == "object" && source[key] != exports.None) {
            if (!(key in target)) {
                target[key] = {};
            }
            if (typeof target[key] == "object" && target[key] != exports.None) {
                merge(target[key], source[key]);
            }
        }
        else if (!(key in target)) {
            target[key] = source[key];
        }
    }
    return target;
}
