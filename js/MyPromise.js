class MyPromise {
  constructor(executor) {
    this.state = "pending"; // 初始状态
    this.value = undefined; // 存储成功的值
    this.reason = undefined; // 存储失败的原因
    this.onFulfilledCallbacks = []; // 存储成功的回调函数
    this.onRejectedCallbacks = []; // 存储失败的回调函数

    const resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };
    const reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback());
      }
    };
    executor(resolve, reject);
  }
  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        const result = onFulfilled(this.value);
        resolve(result);
      }
      if (this.state === "rejected") {
        const result = onRejected(this.reason);
        resolve(result);
      }
      if (this.state === "pending") {
        this.onFulfilledCallbacks.push(() => {
          const result = onFulfilled(this.value);
          resolve(result);
        });
        this.onRejectedCallbacks.push(() => {
          const result = onRejected(this.reason);
          resolve(result);
        });
      }
    });
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }
  finally(onFinally) {
    return this.then(
      (value) => {
        return MyPromise.resolve(onFinally()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(onFinally()).then(() => {
          throw reason;
        });
      }
    );
  }
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }
}
