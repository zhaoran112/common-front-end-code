function typeOf(obj) {
    const toString = Object.prototype.toString;
    const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object'
    };
    return map[toString.call(obj)];
}
// deepCopy
function deepCopy(data) {
    const t = typeOf(data);
    let o;

    if (t === 'array') {
        o = [];
    } else if (t === 'object') {
        o = {};
    } else {
        return data;
    }

    if (t === 'array') {
        for (let i = 0; i < data.length; i++) {
            o.push(deepCopy(data[i]));
        }
    } else if (t === 'object') {
        for (let i in data) {
            o[i] = deepCopy(data[i]);
        }
    }
    return o;
}
function handleResolveContent(content) {
    let rows = [];
    if (content !== '' && content !== undefined) {
        rows = content.split((/[\n\u0085\u2028\u2029]|\r\n?/g)).map(row => {
            return row.split('\t');
        });
    }

    const errorIndex = handleGetErrorIndex(rows);

    const tableData = contentToTable(rows);

    // this.tableColumns = tableData.columns;
    // this.tableData = tableData.data;

    if (errorIndex.length) {
        // this.$emit('on-error', tableData, errorIndex);
    } else {
        // this.$emit('on-success', tableData);
    }
}

// 检查除第一行的每一行列数是否与第一行相同
function handleGetErrorIndex(rows) {
    const array = deepCopy(rows);

    const errorIndex = [];
    if (array.length) {
        const colLen = array[0].length;

        array.forEach((item, index) => {
            if (item.length !== colLen) errorIndex.push(index);
        });
    }

    return errorIndex;
}
function contentToTable(rows) {
    const array = deepCopy(rows);

    let columns = [];
    let tableData = [];

    if (array.length > 1) {
        let titles = array.shift();
        columns = titles.map((item, index) => {
            return {
                title: item,
                key: `key${index}`
            };
        });

        tableData = array.map(item => {
            const res = {};
            item.forEach((col, i) => {
                res[`key${i}`] = col;
            });
            return res;
        });
    }

    return {
        columns,
        data: tableData
    };
}

// 调用
handleResolveContent(`序号	产品ID(必填)	节目名称	剧集类型	集数	总时长/分钟	客户授权开始	客户授权截止	(保底)单价	(保底)总价	计价方式	客户授权方式	客户授权描述	客户授权权利	节目状态	站点限制
	1120	YYYYYYY	经典片库	1	10	2017-06-05	2023-01-29	500	5000	/分钟	独家	含转授	全球	正常	定向优酷
	1121	XXXXXXX	院线新片(电影)	10	40	2017-06-05	2023-01-29	1000	10000	/集	非独家	不含转授	全球	正常	限B站
	1122	ZZZ	非院线电影	10	40	2017-06-05	2023-01-29	0	0	/集	其他	其他描    述信息	中国大陆	正常	`)