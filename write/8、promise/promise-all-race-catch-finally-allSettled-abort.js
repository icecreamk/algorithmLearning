class CustomPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    let resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    let reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (error) => {
            throw error;
          };

    let promise2 = new CustomPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.state === "rejected") {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }

      if (this.state === "pending") {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (value) => {
        return CustomPromise.resolve(onFinally()).then(() => value);
      },
      (reason) => {
        return CustomPromise.resolve(onFinally()).then(() => {
          throw reason;
        });
      }
    );
  }

  static resolve(value) {
    if (value instanceof CustomPromise) {
      return value;
    }
    return new CustomPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new CustomPromise((_, reject) => reject(reason));
  }

  static all(promises) {
    return new CustomPromise((resolve, reject) => {
      const results = new Array(promises.length);
      let resolvedCount = 0;

      if (promises.length === 0) {
        return resolve(results);
      }

      promises.forEach((promise, index) => {
        // 为什么不直接 promise.then(resolve)，因为 promise 有可能是一个函数不是promise，所以包一层

        CustomPromise.resolve(promise).then(
          (value) => {
            results[index] = value;
            resolvedCount++;
            if (resolvedCount === promises.length) {
              resolve(results);
            }
          },
          (reason) => reject(reason)
        );
      });
    });
  }

  static allSettled(promises) {
    return new CustomPromise((resolve) => {
      const results = promises.map((promise, index) => ({
        status: "pending",
        index,
      }));

      let settledCount = 0;

      promises.forEach((promise, index) => {
        CustomPromise.resolve(promise).then(
          (value) => {
            results[index].status = "fulfilled";
            results[index].value = value;
            settledCount++;
            if (settledCount === promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            results[index].status = "rejected";
            results[index].reason = reason;
            settledCount++;
            if (settledCount === promises.length) {
              resolve(results);
            }
          }
        );
      });
    });
  }

  static race(promises) {
    return new CustomPromise((resolve, reject) => {
      promises.forEach((promise) => {
        CustomPromise.resolve(promise).then(
          (value) => resolve(value),
          (reason) => reject(reason)
        );
      });
    });
  }

  abort() {
    if (this.state === "pending") {
      this.state = "aborted";
      this.reason = new Error("Promise aborted");
      this.onRejectedCallbacks.forEach((fn) => fn());
    }
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  let called;
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      if (typeof then === "function") {
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
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
}


// 测试 resolve 和 then
const testResolveThen = () => {
  const promise = new CustomPromise((resolve) => {
    setTimeout(() => resolve('成功'), 1000);
  });

  promise.then((value) => {
    console.log(value); // 应输出 '成功'
  });
};

// 测试 reject 和 catch
const testRejectCatch = () => {
  const promise = new CustomPromise((_, reject) => {
    setTimeout(() => reject('失败'), 1000);
  });

  promise.catch((reason) => {
    console.log(reason); // 应输出 '失败'
  });
};

// 测试 finally
const testFinally = () => {
  const promise = new CustomPromise((resolve) => {
    setTimeout(() => resolve('成功'), 1000);
  });

  promise.finally(() => {
    console.log('finally 被调用');
  }).then((value) => {
    console.log(value); // 应输出 '成功'
  });
};

// 测试 all
const testAll = () => {
  const promise1 = new CustomPromise((resolve) => {
    setTimeout(() => resolve(1), 1000);
  });

  const promise2 = new CustomPromise((resolve) => {
    setTimeout(() => resolve(2), 500);
  });

  CustomPromise.all([promise1, promise2]).then((values) => {
    console.log(values); // 应输出 [1, 2]
  });
};

// 测试 allSettled
const testAllSettled = () => {
  const promise1 = new CustomPromise((resolve) => {
    setTimeout(() => resolve(1), 1000);
  });

  const promise2 = new CustomPromise((_, reject) => {
    setTimeout(() => reject('失败'), 500);
  });

  CustomPromise.allSettled([promise1, promise2]).then((results) => {
    console.log(results); // 应输出 [{status: "fulfilled", value: 1}, {status: "rejected", reason: "失败"}]
  });
};

// 测试 race
const testRace = () => {
  const promise1 = new CustomPromise((resolve) => {
    setTimeout(() => resolve(1), 1000);
  });

  const promise2 = new CustomPromise((resolve) => {
    setTimeout(() => resolve(2), 500);
  });

  CustomPromise.race([promise1, promise2]).then((value) => {
    console.log(value); // 应输出 2
  });
};

// 测试 abort
const testAbort = () => {
  const promise = new CustomPromise((resolve, reject) => {
    setTimeout(() => resolve('成功'), 1000);
  });

  promise.abort();

  promise.catch((reason) => {
    console.log(reason.message); // 应输出 'Promise aborted'
  });
};

// 运行所有测试
testResolveThen();
testRejectCatch();
testFinally();
testAll();
testAllSettled();
testRace();
testAbort();