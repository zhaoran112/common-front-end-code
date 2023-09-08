// 文件流下载
// 根据后台接口文件流下载

export function downloadByData(data, filename, mime, bom) {
    const blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
    const blob = new Blob(blobData, { type: mime || 'application/octet-stream' });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const blobURL = window.URL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
}

downloadByData('text content', 'testName.txt');//调用

//   文件地址下载-根据文件地址下载文件

export function downloadByUrl({
    url,
    target = '_blank',
    fileName,
}) {
    const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1;

    if (/(iP)/g.test(window.navigator.userAgent)) {
        console.error('Your browser does not support download!');
        return false;
    }
    if (isChrome || isSafari) {
        const link = document.createElement('a');
        link.href = url;
        link.target = target;

        if (link.download !== undefined) {
            link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length);
        }

        if (document.createEvent) {
            const e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }
    if (url.indexOf('?') === -1) {
        url += '?download';
    }

    openWindow(url, { target });
    return true;
}
downloadByUrl({
    url: 'https://vebn.oss-cn-beijing.aliyuncs.com/vben/logo.png',
    target: '_self',
});

function dataURLtoBlob(base64Buf) {
    const arr = base64Buf.split(",");
    const typeItem = arr[0];
    const mime = typeItem.match(/:(.*?);/)[1];
    const bstr = window.atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

// base64流下载
export function downloadByBase64(buf, filename, mime, bom) {
    const base64Buf = dataURLtoBlob(buf);
    downloadByData(base64Buf, filename, mime, bom);
}
export function downloadByData(data, filename, mime, bom) {
    const blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
    const blob = new Blob(blobData, { type: mime || 'application/octet-stream' });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const blobURL = window.URL.createObjectURL(blob);
        const tempLink = document.createElement('a');
        tempLink.style.display = 'none';
        tempLink.href = blobURL;
        tempLink.setAttribute('download', filename);
        if (typeof tempLink.download === 'undefined') {
            tempLink.setAttribute('target', '_blank');
        }
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(blobURL);
    }
}
downloadByBase64(imgBase64, 'logo.png');//调用

// 图片Url下载-图片Url下载,如果有跨域问题，需要处理图片跨域
export function urlToBase64(url, mineType) {
    return new Promise((resolve, reject) => {
        let canvas = document.createElement('CANVAS');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.crossOrigin = '';
        img.onload = function () {
            if (!canvas || !ctx) {
                return reject();
            }
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL(mineType || 'image/png');
            canvas = null;
            resolve(dataURL);
        };
        img.src = url;
    });
}
export function downloadByOnlineUrl(url, filename, mime, bom) {
    urlToBase64(url).then((base64) => {
        downloadByBase64(base64, filename, mime, bom);
    });
}

downloadByOnlineUrl(
    'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5944817f47b8408e9f1442ece49d68ca~tplv-k3u1fbpfcp-watermark.image',
    'logo.png'
);//调用