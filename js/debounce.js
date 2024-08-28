//防抖函数

function debounce(callback, delay) {
  let timeId = null;
  return function (...rest) {
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      callback.apply(this, rest);
    }, delay);
  };
}

const debouncedFunction = debounce(() => {
  console.log("Function executed!");
}, 300);

// 例如，在窗口大小调整时调用
window.addEventListener("resize", debouncedFunction);
