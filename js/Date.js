/**
* 方法1
* @description 对Date的扩展，将 Date 转换为指定格式的String
*  月(MM)、日(dd)、小时(HH)、分(mm)、秒(ss)固定用两个占位符
*  年(yyyy)固定用4个占位符
* @param fmt
* @example    *   (new Date()).format("yyyy-MM-dd HH:mm:ss") // 2018-07-31 20:09:04
*   (new Date()).format("yyyy-MM-dd") // 2018-07-31 20:08
* @returns {*}
*/
Date.prototype.format = function (pattern) {
    function zeroize(num) {
        return num < 10 ? "0" + num : num;
    }
    var pattern = pattern;    // YYYY-MM-DD或YYYY-MM-DD HH:mm:ss
    var dateObj = {
        "y": this.getFullYear(),
        "M": zeroize(this.getMonth() + 1),
        "d": zeroize(this.getDate()),
        "H": zeroize(this.getHours()),
        "m": zeroize(this.getMinutes()),
        "s": zeroize(this.getSeconds())
    };
    return pattern.replace(/yyyy|MM|dd|HH|mm|ss/g, function (match) {
        switch (match) {
            case "yyyy":
                return dateObj.y;
            case "MM":
                return dateObj.M;
            case "dd":
                return dateObj.d;
            case "HH":
                return dateObj.H;
            case "mm":
                return dateObj.m;
            case "ss":
                return dateObj.s;
        }
    });
};

// console.log((new Date()).format('yyyy-MM-dd'));