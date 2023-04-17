const checkDigit = {
    bind: function (el, binding) {
        if (el.tagName.toLowerCase() !== "input") {
            el = el.getElementsByTagName("input")[0];
        }
        let {
            precision: val,
            min = -Infinity,
            max = Infinity,
            type,
        } = binding.value;
        if (val === undefined) {
            return;
        }
        if (val !== 0) {
            val += 1;
        }
        addListener(el, "keyup", () => {
            if (type == "+") {
                el.value = el.value.replace(/-/g, "");
            }
            if (type == "-" && el.value.charAt(0) !== "-") {
                el.value = el.value.replace(/\d/g, "");
            }
            el.value = el.value
                .replace(/[^\d.-]/g, "")
                .replace(/^\./g, "")
                .replace(/\.{2,}/g, ".")
                .replace(".", "$#$")
                .replace(/\./g, "")
                .replace("$#$", ".")
                .replace("-", "$@$")
                .replace(/-/g, "")
                .replace("$@$", "-")
                .replace(/^[-]\.*$/g, "-")
                .replace(/^[-][0]\d+$/g, "-0")
                .replace(/^[0]\d*$/g, "0");
            if (el.value.indexOf("-") !== 0) {
                el.value = el.value.replace(/-/g, "");
            }
            if (el.value.indexOf(".") !== -1) {
                el.value = el.value.substring(0, el.value.indexOf(".") + val); //保留几位小数
            }
            el.dispatchEvent(new Event("input"));
            //通过dispatchEvent再次手动触发input事件
        });
        addListener(el, "blur", () => {
            if (el.value < min) {
                el.value = min;
            }
            if (el.value > max) {
                el.value = max;
            }
            if (isNaN(parseFloat(el.value))) {
                el.value = "";
            }
            if (parseFloat(el.value) === 0) {
                el.value = 0;
            }
            el.dispatchEvent(new Event("input"));
            //通过dispatchEvent再次手动触发input事件
        });
    },
};