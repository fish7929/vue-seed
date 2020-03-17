export default class Underscore {
    static grep(arr, cb) {
        var result = [];
        Underscore.each(arr, function (i, item) {
            if (cb(item)) result.push(item);
        });
        return result;
    }
    static sum(arr, getter) {
        var result = 0;
        Underscore.each(arr, function (i, item) {
            result += parseFloat(getter(item));
        });
        return result;
    }
    static map(arr, cb) {
        var result = [];
        Underscore.each(arr, function (i, item) {
            result.push(cb(item, i));
        });
        return result;
    }
    static reduce(arr, initValue, accumulator) {
        var res = initValue;
        Underscore.each(arr, (i, item) => {
            res = accumulator(res, item);
        });
        return res;
    }
    static each(arr, cb) {
        var i = 0, len = arr.length, res;
        while (i < len) {
            res = cb(i, arr[i]);
            if (res === false) break;
            i++;
        }
    }
    static any(arr, cb) {
        var i = 0, len = arr.length, res = false;
        while (i < len) {
            res = cb(arr[i]);
            if (res === true) break;
            i++;
        }
        return res;
    }
    static find(arr, cb) {
        var i = 0, len = arr.length, res = null;
        while (i < len) {
            if (cb(arr[i]) === true) {
                res = arr[i];
                break;
            }
            i++;
        }
        return res;
    }
    static min(arr, cb) {
        var res;
        Underscore.each(arr, (i, item) => {
            var v = cb(item);
            if (res == undefined || v < res) res = v;
        });
        return res;
    }
    static sort(arr, keyer, desc) {
        arr.sort(function (a, b) {
            var res;
            var ka = keyer(a);
            var kb = keyer(b);
            if (ka > kb) res = 1;
            else if (ka < kb) res = -1;
            else res = 0;
            if (desc) res *= -1;
            return res;
        });
        return arr;
    }
}
