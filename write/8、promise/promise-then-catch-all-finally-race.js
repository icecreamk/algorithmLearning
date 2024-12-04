// Promise.all() 在其中任何一个 Promise 被拒绝时就会被拒绝，而 Promise.allSettled() 则会在所有 Promise 实例都完成(无论成功还是失败)时才完成。
// Promise.all() 返回的是一个数组，数组中的值是传入的 Promise 实例的结果值,而 Promise.allSettled() 返回的是一个数组，数组中的值是对象，每个对象表示对应的 Promise 实例的状态和结果值。
// 当你需要获取所有异步操作的结果时，无论是成功还是失败，应该使用 Promise.allSettled()。如果只关心所有操作都成功的情况，可以使用 Promise.all()。


const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
const CANCELLED = "cancelled";

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.cancelled = false;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    this.onCancelledCallbacks = [];

    const resolve = (value) => {
      if (this.cancelled) return;
      if (value instanceof MyPromise) {
        return value.then(resolve, reject);
      }
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = RESOLVED;
          this.value = value;
          this.onFulfilledCallbacks.forEach((cb) => cb());
        }
      });
    };

    const reject = (reason) => {
      if (this.cancelled) return;
      setTimeout(() => {
        if (this.state === PENDING) {
          this.state = REJECTED;
          this.reason = reason;
          this.onRejectedCallbacks.forEach((cb) => cb());
        }
      });
    };

    const cancel = () => {
      if (this.state === PENDING) {
        this.state = CANCELLED;
        this.onCancelledCallbacks.forEach((cb) => cb());
      }
    };

    this.cancel = cancel;

    try {
      executor(resolve, reject, cancel);
    } catch (error) {
      reject(error);
    }
  }

  then(onResolved, onRejected) {
    const self = this;
    onResolved = typeof onResolved === "function" ? onResolved : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (error) => {
            throw error;
          };

    return new MyPromise((resolve, reject, cancel) => {
      const handleFulfilled = () => {
        setTimeout(() => {
          try {
            let x = onResolved(self.value);
            resolvePromise(this, x, resolve, reject, cancel);
          } catch (error) {
            reject(error);
          }
        });
      };

      const handleRejected = () => {
        setTimeout(() => {
          try {
            let x = onRejected(self.reason);
            resolvePromise(this, x, resolve, reject, cancel);
          } catch (error) {
            reject(error);
          }
        });
      };

      const handleCancelled = () => {
        setTimeout(() => {
          cancel();
        });
      };

      if (self.state === RESOLVED) {
        handleFulfilled();
      } else if (self.state === REJECTED) {
        handleRejected();
      } else if (self.state === PENDING) {
        self.onFulfilledCallbacks.push(handleFulfilled);
        self.onRejectedCallbacks.push(handleRejected);
        self.onCancelledCallbacks.push(handleCancelled);
      } else if (self.state === CANCELLED) {
        handleCancelled();
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    return this.then(
      (value) => MyPromise.resolve(callback()).then(() => value),
      (reason) => MyPromise.resolve(callback()).then(() => { throw reason })
    ).catch((error) => {
      if (this.state === CANCELLED) {
        throw new Error("Promise cancelled");
      }
      throw error;
    });
  }

  static all(promises) {
    return new MyPromise((resolve, reject, cancel) => {
      const results = [];
      let completedCount = 0;

      function processResult(index, value) {
        results[index] = value;
        completedCount++;
        if (completedCount === promises.length) {
          resolve(results);
        }
      }

      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (value) => processResult(i, value),
          (reason) => reject(reason),
          () => cancel()
        );
      }
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject, cancel) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (value) => resolve(value),
          (reason) => reject(reason),
          () => cancel()
        );
      }
    });
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  static allSettled(promises) {
    return new MyPromise((resolve, reject, cancel) => {
      const results = [];
      let completedCount = 0;

      function processResult(index, promise) {
        promise.then(
          (value) => {
            results[index] = { status: 'fulfilled', value };
            checkCompletion();
          },
          (reason) => {
            results[index] = { status: 'rejected', reason };
            checkCompletion();
          },
          () => {
            results[index] = { status: 'cancelled' };
            checkCompletion();
          }
        );
      }

      function checkCompletion() {
        completedCount++;
        if (completedCount === promises.length) {
          resolve(results);
        }
      }

      for (let i = 0; i < promises.length; i++) {
        processResult(i, promises[i]);
      }
    });
  }
}

function resolvePromise(promise2, x, resolve, reject, cancel) {
  if (x === promise2) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  let called;
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    try {
      let then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject, cancel);
          },
          (error) => {
            if (called) return;
            called = true;
            reject(error);
          },
          () => {
            if (called) return;
            called = true;
            cancel();
          }
        );
      } else {
        resolve(x);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

// 测试示例
var p1 = new MyPromise((resolve, reject, cancel) => {
  setTimeout(() => {
    resolve(123);
  }, 1000);

  setTimeout(() => {
    cancel();
  }, 500);
});

var p2 = MyPromise.resolve(456);
var p3 = MyPromise.reject(new Error("Error"));

MyPromise.all([p1, p2]).then((values) => {
  console.log(values); // 不会输出，因为 p1 被取消了
}).catch((error) => {
  console.error(error); // 不会输出，因为 p1 被取消了
});

MyPromise.race([p1, p3]).then((value) => {
  console.log(value); // 不会输出，因为 p1 被取消了
}).catch((error) => {
  console.error(error); // 不会输出，因为 p1 被取消了
});

MyPromise.allSettled([p1, p2, p3]).then((results) => {
  console.log(results); // 输出 [{ status: 'cancelled' }, { status: 'fulfilled', value: 456 }, { status: 'rejected', reason: Error: Error }]
});