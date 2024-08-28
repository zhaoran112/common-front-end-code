// 节流
function throttle(callback, delay) {
  let timeoutId = null;
  return function (...args) {
    if (!timeoutId) {
      callback.apply(this, args);
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    }
  };
}

const throttleFn = throttle((value) => {
  console.log(value);
}, 3000);

throttleFn(1);
throttleFn(2);
throttleFn(3);
throttleFn(4);
