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
console.log(add(0.1, 0.2)); //0.3
console.log(multiply(1.15, 100)); //115
```

# js/Date.js 日期格式化

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

# arraySpanMethod.js el-table 合并单元格

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

1.文件流下载 2.文件地址下载
3.base64 流下载 4.图片 Url 下载

# commonSelect 下拉框组件，基于 vue2+element-ui 封装的下拉框组件

```
const options = [
  {
    value:1,
    label:'正常'
  }
];
  <common-select
    v-model="status"
    :options="options">
    </common-select>
```

# commonTable 基于 vue2+element-ui 封装的 el-table

# NewTemplateDialog 基于 vue2+element-ui 封装的 el-dialog

# uploadImage 基于 vue2+element-ui 封装的图片上传组件

# directive/index.js 自定义指令

# copyToClipboard.js 复制文本到剪贴板

# filterPane 搜索条件组件封装

用法

```js
filterData: [
        {
          name: "采购内容",
          key: "summary",
          tag: "input",
          inputProps: {
            style: "width:130px",
          },
        },
        {
          name: "上游版权",
          key: "seller_company",
          tag: "input",
          inputProps: {
            style: "width:130px",
          },
        },
        {
          name: "意向编号",
          key: "id",
          tag: "input",
          inputProps: {
            style: "width:130px",
          },
        },
        {
          name: "拟签约方",
          key: "sub_company",
          tag: "select",
          selectProps: {
            options: [],
            style: "width:130px",
          },
        },
        {
          name: "签约进度",
          key: "progress",
          tag: "select",
          selectProps: {
            options: [],
            style: "width:130px",
          },
        },
        {
          name: "采购模式",
          key: "plan_type",
          tag: "select",
          selectProps: {
            options: [],
            style: "width:130px",
          },
        },
      ],
```

# 尝试从网页、Excel 或其它软件复制一段表格数据，粘贴在这里,生成表格数据 js/handleResolveContent.js

```js
handleResolveContent(`序号	产品ID(必填)	节目名称	剧集类型	集数	总时长/分钟	客户授权开始	客户授权截止	(保底)单价	(保底)总价	计价方式	客户授权方式	客户授权描述	客户授权权利	节目状态	站点限制
	1120	YYYYYYY	经典片库	1	10	2017-06-05	2023-01-29	500	5000	/分钟	独家	含转授	全球	正常	定向优酷
	1121	XXXXXXX	院线新片(电影)	10	40	2017-06-05	2023-01-29	1000	10000	/集	非独家	不含转授	全球	正常	限B站
	1122	ZZZ	非院线电影	10	40	2017-06-05	2023-01-29	0	0	/集	其他	其他描    述信息	中国大陆	正常	`);
```

# dynamicLoadScript.js 用法

```js
import load from "./dynamicLoadScript";
const tinymceCDN =
  "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";
load(tinymceCDN, (err) => {
  if (err) {
    this.$message.error(err.message);
    return;
  }
});
```

# 用于显示一个目录选择器，以允许用户选择一个目录。

```js
document
  .getElementById("openFilePicker")
  .addEventListener("click", async () => {
    const directoryHandle = await window.showDirectoryPicker();
    for await (const entry of directoryHandle.values()) {
      if (entry.kind === "file") {
        const file = await entry.getFile();
        console.log("[ file ] >", file);
        // const contents = await file.text();
        // console.log(`File: ${entry.name}, Contents: ${contents}`);
      }
    }
  });
```

# 复制对象属性

```js
// 定义源对象和目标对象
const source = {
  name: "Alice",
  age: "25",
  heightInCm: "170"
};

const target = {
  name: "",
  age: 0,
  height: 0
};

// 定义键映射和类型转换器
const keyMap = {
  height: "heightInCm"
};

const typeConverters = {
  age: (value) => parseInt(value, 10),
  height: (value) => parseFloat(value)
};

// 使用 copyProp 函数
const result = copyProp(target, source, keyMap, typeConverters);

console.log(result);
// 输出: { name: 'Alice', age: 25, height: 170 }
```

# 观察者模式

1.观察者模式有观察者（Observer）和被观察者（Subject）两种角色。 2.观察者直接订阅别观察者，当被观察者发生变化后，直接通知所有观察者。 3.被观察者主动通知观察者，观察者被动接受通知。

```js
// Observer.js
```

# 发布订阅模式

1. 发布订阅模式有发布者、订阅者和代理三种角色。 2.发布者和订阅者通过代理进行通信，彼此不认识。 3.发布者将消息发布给代理，代理再把消息发送给订阅者。

```js
// puhlishSubscribe.js
```
