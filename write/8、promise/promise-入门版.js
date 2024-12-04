// <---------------------><--------------------->promise 简单版 不支持链式调用<---------------------><--------------------->
// var p = new myPromise((resolve, reject) => {
//   resolve(123);
// });

// p.then((val) => {
//   console.log(val);
// });

// 函数实现
function mySimplePromise(fn) {
  let self = this;
  self.state = "pending"; // 初始状态为 pending
  self.value = undefined; // 成功后的值
  self.reason = undefined; // 失败的原因

  function resolve(value) {
    if (self.state === "pending") {
      self.state = "fulfilled";
      self.value = value;
    }
  }

  function reject() {
    if (self.state === "pending") {
      self.state = "rejected";
      self.reason = reason;
    }
  }

  try {
    fn(resolve, reject);
  } catch (error) {
    reject(error);
  }
}

mySimplePromise.prototype.then = function (onFulfilled, onRejected) {
  let self = this;
  switch (self.state) {
    case "fulfilled":
      onFulfilled(self.value);
      break;
    case "rejected":
      onRejected(self.value);
      break;
    default:
      break;
  }
};

// 类实现
class mySimplePromise {
  constructor(fn) {
    this.state = "pending"; // 初始状态为 pending
    this.value = undefined; // 成功后的值
    this.reason = undefined; // 失败的原因
    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;
    }
  }

  reject(reason) {
    if (this.state === "pending") {
      this.state = "rejected";
      this.reason = reason;
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === "fulfilled") {
      onFulfilled(this.value);
    }
    if (this.state === "rejected") {
      onRejected(this.value);
    }
  }
}



