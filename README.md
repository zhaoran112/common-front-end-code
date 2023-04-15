# common-front-end-code
# 前端工作中常用代码

# js\index.js 加减乘除精度问题解决
```js
function add(num1, num2) {
    return Number(math.add(math.bignumber(num1), math.bignumber(num2)));
  }
  // 乘
  function multiply(num1, num2) {
    return Number(math.multiply(math.bignumber(num1), math.bignumber(num2)));
  }
  // 减
  function subtract(num1, num2) {
    return Number(math.subtract(math.bignumber(num1), math.bignumber(num2)));
  }
  // 除
  function divide(num1, num2) {
    return Number(math.divide(math.bignumber(num1), math.bignumber(num2)));
  }
console.log(add(0.1, 0.2));//0.3
  console.log(multiply(1.15, 100));//115
```
# js/Date.js  日期格式化

```js
/**
* 方法1
* @description 对Date的扩展，将 Date 转换为指定格式的String
*  月(MM)、日(dd)、小时(HH)、分(mm)、秒(ss)固定用两个占位符
*  年(yyyy)固定用4个占位符
* @param fmt
* @example    *   (new Date()).format("yyyy-MM-dd HH:mm:ss") // 2018-07-31 20:09:04
*   (new Date()).format("yyyy-MM-dd") // 2018-07-31
* @returns {*}
*/
```

# arraySpanMethod.js  el-table 合并单元格
```js

function arraySpanMethod({ row, column, rowIndex, columnIndex }) {
    const fields = ["name1", "name2", "name3"];
    const cellValue = row[column.property];
    if (cellValue && fields.includes(column.property)) {
        const prevRow = this.tableData[rowIndex - 1];
        let nextRow = this.tableData[rowIndex + 1];
        if (prevRow && prevRow[column.property] === cellValue) {
            return { rowspan: 0, colspan: 0 };
        } else {
            let countRowspan = 1;
            while (nextRow && nextRow[column.property] === cellValue) {
                nextRow = this.tableData[++countRowspan + rowIndex];
            }
            if (countRowspan > 1) {
                return { rowspan: countRowspan, colspan: 1 };
            }
        }
    }
}
```

# 前端文件下载
1.文件流下载
2.文件地址下载
3.base64流下载
4.图片Url下载