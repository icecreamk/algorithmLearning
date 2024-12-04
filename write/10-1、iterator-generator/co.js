// <---------------------><---------------------> 生成器 结合 promisify <---------------------><--------------------->
const fs = require("fs");
const path = require("path");

// 以上代码在promisify.js 文件中存在
var promisify = (fn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  };
};

let asyncReadFile = promisify(fs.readFile);

function* read() {
  let content1 = yield asyncReadFile(
    path.join(__dirname, "./promisify.js"),
    "utf8"
  );
  let content2 = yield asyncReadFile(
    path.join(__dirname, "./data/" + content1),
    "utf8"
  );
  return content2;
}

// 这样写不够灵活，以下引入co优化
let re = read();
let { value, done } = re.next();
value.then(
  (data) => {
    let { value, done } = re.next(data);
    value.then((d) => {
      let { value, done } = re.next(d);
      console.log(value, done);
    });
  },
  (err) => {
    console.log(err);
  }
);

// co实现原理
function co(gen) {
  // gen 迭代器

  return new Promise(function (resolve, reject) {
    function next(data) {
      let { value, done } = gen.next(data);

      if (done) {
        resolve(value);
      } else {
        // Promise.resolve(value)
        //   .then((data) => next(data))
        //   .catch((err) => reject(err));
        // 简写
        Promise.resolve(value).then(next, reject);
      }
    }

    // 首次调用
    next();
  });
}

co(read())
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

// 参考这个应该能搞懂 生成器 promise async/await
// https://juejin.cn/post/6844904133577670664
