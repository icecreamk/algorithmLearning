function timeoutWrap(p, timout) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject("超时了");
    }, timout);
  });
  return (...args) => {
    const p1 = p(...args);
    return Promise.race([timeoutPromise, p1]);
  };
}

const test = (data) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(data);
    }, 1500);
  });
};

const r1 = timeoutWrap(test, 1000)({ id: 1 });
r1.then((response) => {
  console.log("response", response);
}).catch((e) => {
  console.log("e", e);
});
