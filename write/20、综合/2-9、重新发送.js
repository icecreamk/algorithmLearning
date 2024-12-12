class CancelPromise {
  constructor() {
    this.pendingPromise = null;
  }
  request(reqFn) {
    if (this.pendingPromise) {
      this.cancel("取消");
    }

    const cancelPromise = new Promise((_, reject) => {
      this.reject = reject;
    });
    this.pendingPromise = Promise.race([cancelPromise, reqFn]);
    return this.pendingPromise;
  }

  cancel(reason) {
    this.reject(reason);
    this.pendingPromise = null;
  }
}

const cancelPromise = new CancelPromise();
const testRequest = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

cancelPromise.request(testRequest({ id: 1 })).then((res) => {
  console.log(res);
});
cancelPromise.request(testRequest({ id: 2 })).then((res) => {
  console.log(res);
});
cancelPromise.request(testRequest({ id: 3 })).then((res) => {
  console.log(res);
});
