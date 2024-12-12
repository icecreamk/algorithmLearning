class CancelPromise {
  constructor(limit) {
    this.limit = limit || 3;
    this.conut = 0;
    this.pendingPromise = null;
  }
  request(reqFn, data) {
    if (this.conut >= this.limit) {
      return;
    }
    this.conut++;
    new Promise((res) => {
      res(reqFn(data));
    }).catch((e) => {
      console.log("e", e);
      this.request(reqFn, data);
      throw new Error(e);
    });
  }
}

const cancelPromise = new CancelPromise();
const testRequest = (data) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      console.log("data", data);
      reject("错误");
    }, 1000);
  });
};

cancelPromise.request(testRequest, {id: 1});
