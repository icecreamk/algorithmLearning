// 其实async函数就是Generator加自动执行器的语法糖，可以理解为从语言层面支持了Generator的自动执行。
// <---------------------><---------------------> 基于Generator 实现async-await  <---------------------><--------------------->
// 定义一个模拟fetch请求的函数
const fetch = (data = "") => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data || "Hello World"), 1000);
  });
};

function asyncFunc(generatorFunc) {
  const iterator = generatorFunc();
  const next = (data) => {
    let { value, done } = iterator.next(data);
    if (done) return;
    value.then((data) => {
      next(data);
    });
  };
  next();
}

// 测试
asyncFunc(function* () {
  const data1 = yield fetch("data1");
  console.log(data1);
  const data2 = yield fetch("data2");
  console.log(data2);
});


// <---------------------><---------------------> async-await转化成Generator  <---------------------><--------------------->

function asyncToGenerator(generatorFunc) {
  return function () {
    // 先调用generator函数生成迭代器
    // 对应 var gen = testG()
    let gen = generatorFunc.apply(this, arguments);

    // 返回一个promise
    // 因为外部用使用await或then方式获取这个函数的返回值
    // var test = asyncToGenerator(testG)
    // test().then(res => console.log(res))

    return new Promise((resolve, reject) => {
      // step用来跨越yield
      // key 分为 next 和 throw 两种
      // arg 参数将promise.resolve 出来的值传给下一个yield
      function step(key, arg) {
        let generatorResult;

        // 如果报错直接reject
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }

        const { value, done } = generatorResult;

        if (done) {
          return resolve(value);
        }
        // 如果没有done，说明yield后面是promise，
        // 那么就等待promise resolve出来，再次调用step函数

        // 对应
        // gen.next().value.then(
        //   (data) => {
        //     gen.next(data).value.then((data2) => {
        //       gen.next();
        //       //  此时done为true，整个promise被resolve
        //       //  最外部 test().then(res => console.log(res)) 开始执行了
        //     });
        //   },
        //   (err) => step("throw", err)
        // );

        return Promise.resolve(value).then(
          (val) => step("next", val),
          (err) => step("throw", err)
        );
      }
      step("next");
    });
  };
}

// 测试

// 定义一个 async 函数
async function fetchData(url) {
  const response = await fetch("你好");
  const data = await fetch();
  return [url, response, data];
}

// 将 async 函数转换为生成器函数
function* fetchDataGenerator(url) {
  const response = yield fetch("你好");
  const data = yield fetch();
  return [url, response, data];
}

const fetchDataWrapped = asyncToGenerator(fetchDataGenerator);

// 测试 fetchDataWrapped 函数
async function testFetchData() {
  try {
    const url = "http://xxx.com";
    const data = await fetchDataWrapped(url);
    console.log("Fetched data:", data);
    // [ "http://xxx.com", "你好", "Hello World" ]
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
