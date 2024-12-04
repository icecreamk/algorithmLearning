// <---------------------><---------------------> promisify 实现1 (node 环境) <---------------------><--------------------->
const fs = require("fs");
const path = require("path");

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

const read = promisify(fs.readFile);
read(path.join(__dirname, "./promisify.js"), "utf8").then((d) =>
  console.log(d)
);

const promisifyAll = (target) => {
  Reflect.ownKeys(target).forEach((key) => {
    if (typeof target[key] === "function") {
      target[key + "Async"] = promisify(target[key]);
    }
  });
  return target;
};

const fs2 = promisifyAll(fs);
fs2
  .readFileAsync(path.join(__dirname, "./promisify.js"), "utf8")
  .then((d) => console.log(d));

// <---------------------><---------------------> promisify 实现2 <---------------------><--------------------->
var promisify = (func, ctx) => {
  // 返回一个新的function
  return function () {
    // 初始化this作用域
    var ctx = ctx || this;
    // 新方法返回的promise
    return new Promise((resolve, reject) => {
      // 调用原来的非promise方法func，绑定作用域，传参，以及callback（callback为func的最后一个参数）
      func.call(ctx, ...arguments, function () {
        // 将回调函数中的的第一个参数error单独取出
        var args = Array.prototype.map.call(arguments, (item) => item);
        var err = args.shift();
        // 判断是否有error
        if (err) {
          reject(err);
        } else {
          // 没有error则将后续参数resolve出来
          args = args.length > 1 ? args : args[0];
          resolve(args);
        }
      });
    });
  };
};

// nodeCallback方法func1
var func1 = function (a, b, c, callback) {
  // 例子1
  // callback(null, a+b+c);
  // 例子2
  // callback(()=> {
  //     console.log('error')
  // }, a+b+c);
};
// promise化后的func2
var func2 = promisify(func1);
// 调用后输出6
func1(1, 2, 3, (err, resuslt) => {
  if (!err) {
    console.log(resuslt); //输出6
  }
});
func2(1, 2, 3).then(console.log); //输出6
