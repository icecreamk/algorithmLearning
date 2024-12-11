function add(a, b, callback) {
  setTimeout(() => {
    callback(null, a + b);
  }, 100);
}

function promiseAdd(a, b) {
  return new Promise((resolve, reject) => {
    add(a, b, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

async function serial(...args) {
  return args.reduce((task, now) => {
    return task.then((res) => {
      return promiseAdd(res, now)
    });
  }, Promise.resolve(0));
}

async function parallel(...args) {
  const list = []
  args.forEach(num => {
    list.push(promiseAdd(0, num))
  })
  return Promise.all(list).then(res => {
    return res.reduce((a, b) => a + b);
  });
}

(async function test() {
  const startTime = Date.now();
  const res1 = await serial(1, 2, 3, 4, 5, 6, 7, 8, 9);
  console.log(res1, Date.now() - startTime);

  const startTime1 = Date.now();
  const res2 = await parallel(1, 2, 3, 4, 5, 6, 7, 8, 9);
  console.log(res2, Date.now() - startTime1);
})();
