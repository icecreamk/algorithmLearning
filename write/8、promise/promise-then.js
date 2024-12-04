function resolvePromise(promise2, x, resolve, reject) {
  // 规范 2.3.1 x 不能和 promise2 相等，避免循环引用
  if (x === promise2) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  // 规范 2.3.2
  // 如果 x 为 Promise 且 状态 pendding 则需要继续等待否则执行
  // 感觉这里没必要，交给后面的执行就好了，因为下面判断类型，如果是基础类型，就会直接resolve
  // if (x instanceof MyPromise) {
  //   console.log(
  //     "----------------------------- x.state -----------------------------",
  //     x.state
  //   );

  //   if (x.state === PENDING) {
  //     x.then(function (value) {
  //       // 再次调用为了确认 x resolve 的参数是什么类型，
  //       // 如果是基础类型，就再次resolve，把值传给下一个then
  //       resolvePromise(promise2, value, resolve, reject);
  //     }, reject);
  //   } else {
  //     x.then(resolve, reject);
  //   }
  //   return;
  // }

  // 规范2.3.3.3.3 reject 和 resolve 其中一个执行过的话，忽略其他的
  let called;
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 规范2.3.3.2 如果不能取出then的话，就reject
    try {
      // 解析promise的值是成功还是失败，传递给下层then
      let then = x.then;
      if (typeof then === "function") {
        // 规范2.3.3.3
        // 如果then是函数，用x作为this调用它

        // 需要绑定this，才能获取到对应的then
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (error) => {
            if (called) return;
            called = true;
            reject(error);
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      // 一旦失败直接失败
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    // 规范2.3.4 x为基本类型不是promise
    resolve(x);
  }
}
// <---------------------><--------------------->promise<---------------------><--------------------->
// promise 本质上是一个状态机，状态一旦改变就不可修改
// 由于状态不可更改，所以then每次都需要返回一个新的实例

var PENDING = "pending";
var RESOLVED = "resolved";
var REJECTED = "rejected";

function MyPromise(fn) {
  let self = this;
  self.state = PENDING;
  self.value = undefined;
  self.reason = undefined;
  // 用于保存then中的回调，且每个实例最多缓存一个回调
  self.onFulfilledCallbacks = []; // 存储成功回调
  self.onRejectedCallbacks = []; // 存储失败回调

  self.resolve = function (value) {
    if (value instanceof MyPromise) {
      // 如果value是一个promise，则递归实行
      return value.then(self.resolve, self.reject);
    }

    // 异步执行保证执行顺序
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = RESOLVED;
        self.value = value;
        self.onFulfilledCallbacks.forEach((cb) => cb());
      }
    });
  };

  self.reject = function (reason) {
    setTimeout(() => {
      if (self.state === PENDING) {
        self.state = REJECTED;
        self.reason = reason;
        self.onRejectedCallbacks.forEach((cb) => cb());
      }
    });
  };

  // 用于处理 new myPromise(() => { throw new Error() });
  try {
    fn(self.resolve, self.reject);
  } catch (error) {
    self.reject(error);
  }
}

MyPromise.prototype.then = function (onResolved, onRejected) {
  const self = this;
  // 规范2.2.7 then 必须返回一个新的promise
  var promise2;

  // 规范2.2
  // onResolved onRejected 都是可选参数
  // 如果不是函数类型也可以继续执行，且要能透传
  // Promise.resolve(1).then().then(v => console.log(v)) // 能够打印出1
  onResolved = typeof onResolved === "function" ? onResolved : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (error) => {
          throw error;
        };

  if (self.state === RESOLVED) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      // 规范2.2.4 保证 onResolved 和 onRejected 异步执行
      setTimeout(function () {
        try {
          let x = onResolved(self.value);
          resolvePromise(promise2, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      });
    }));
  }

  if (self.state === REJECTED) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      setTimeout(function () {
        try {
          let x = onRejected(self.reason);
          resolvePromise(promise2, x, resolve, reject);
        } catch {
          reject(error);
        }
      });
    }));
  }

  // 用户还未调用resolve或者reject方法
  if (self.state === PENDING) {
    return (promise2 = new MyPromise(function (resolve, reject) {
      self.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          // 可能会报错，用trycatch包起来
          try {
            let x = onResolved(self.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });

      self.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      });
    }));
  }
};

// 测试示例
var p1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 3000);
});

var p2 = new MyPromise((resolve, reject) => {
  resolve("start");
  resolve("start1");
  resolve("start2");
});

p2.then((val) => {
  console.log(val);
  return p1;
}).then((val) => {
  console.log(val);
  console.log("done");
});
