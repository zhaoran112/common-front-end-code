// 异步剪贴板API

// 在构建网站时，一个非常常见的需求是能够通过单击一个按钮将文本复制到剪贴板。如果您只需要支持现代浏览器，强烈建议使用异步剪贴板API。
// 所有现代浏览器都支持它，并提供了一种简单而安全的方式来更新剪贴板的内容。

// 你只需要确保Navigator, Navigator。clipboard和Navigator.clipboard.writeText为真值，然后调用clipboard.writetext()将值复制到clipboard。
// 如果出现任何问题，你可以使用promise.reject()来返回一个立即拒绝的承诺，并保持返回类型一致。

const copyToClipboard = str => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str);
    return Promise.reject('The Clipboard API is not available.');
};

//兼容版本
const copyToClipboard2 = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};