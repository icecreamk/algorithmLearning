// ---------------------------------------------- 模拟require --------------------------------------------

// 基础概念：
// fs.readFileSync 读取到的是字符串，需要通过eval或者new Function转化成可执行代码
// eval("const a = '123';console.log(a)")
// const sumFunction = new Function('a', 'b', 'return a + b;');sumFunction(1,2)
// eval和new Function都可以执行js代码，但是他们容易被不属于他们的变量影响，即无法拥有自身的独立运行空间
// 例如：const a = 1; const str = 'console.log(a)'; eval(str)
// eval读取str时候，不应该访问到a

// 解决：node存在vm虚拟环境的概念，可以运行额外的js文件，保证代码执行的独立性
// 例子：
// const vm = require("vm");
// const hello = "hello";
// const str = "console.log(hello)";
// vm.runInThisContext(str); // 报错

// 步骤
// 抽离Module._load方法，用于加载模块
// Module.resolveFilename方法 根据相对路径，转换成绝对路径
// 缓存模块  Module._cache 同一个模块不重复加载，提升性能。
// 创建模块id： 保存的内容是export = {}  相当于this
// 利用 tryModuleLoad(module, filename) 尝试加载模块
// Module._extensions使用读取文件
// Module.wrap 包裹一个函数
// runInThisContext 运行字符串
// 让字符串执行并将this改编成exports

const fs = require("fs");
const path = require("path");
const vm = require("vm");

function MyRequire(modulePath) {
  // 解析模块路径
  let absPathname = path.resolve(__dirname, modulePath);

  // 添加后缀
  const exNames = Object.keys(Module._extensions);

  let index = 0;
  //  存原始文件路径
  const oldPath = absPathname;
  function findExt(absPathname) {
    if (index >= exNames.length) {
      throw new Error(`文件不存在`);
    }

    try {
      fs.accessSync(absPathname);
      return absPathname;
    } catch (error) {
      const ext = exNames[index++];
      return findExt(oldPath + ext);
    }
  }

  //  首次调用查找文件
  absPathname = findExt(absPathname);

  //  缓存中存在
  if (Module._cache[absPathname]) {
    return Module._cache[absPathname].exports;
  }

  //   创建模块，新建Module实例
  const module = new Module(absPathname);
  //   添加缓存
  Module._cache[absPathname] = module;
  //   加载模块
  tryModuleLoad(module, absPathname);
  return module.exports;
}

// Module 类
// id是模块的绝对路径
// 给模块创建exports对象，执行tryModuleLoad方法，将内容加到exports中
function Module(id) {
  this.id = id;
  //   读取到的文件内存存放在exports中
  this.exports = {};
}

Module._cache = {};

// 第一个参数是模块中常用的全局变量，注意这里传入的Requier是自己定义的MyRequire
// 第二个参数就是函数的结束部分
// wrapper的作用是，包裹了一层函数，实现了私有作用域
Module.wrapper = [
  "(function (exports, module, MyRequire, __filename, __dirname) {",
  "\n});",
];

// 根据不同模块使用不同的加载方式
// 使用call执行，第一个参数改变运行的this，我们传入的module.exports
// 后面的参数就是函数外面包裹的参数exports, module, MyRequire, __filename, __dirname
Module._extensions = {
  ".js"(module) {
    const content = fs.readFileSync(module.id, "utf8");
    //   读取文件，并执行
    const fnStr = Module.wrapper[0] + content + Module.wrapper[1];
    const fn = vm.runInThisContext(fnStr);

    //  执行函数，并传入参数
    fn.call(
      module.exports,
      module.exports,
      module,
      MyRequire,
      __filename,
      __dirname
    );
  },
  ".json"(module) {
    const content = fs.readFileSync(module.id, "utf8");
    module.exports = JSON.parse(content);
  },
};

// 接受模块对象，通过path.extname获取后缀名，然后Module._extensions来加载模块
function tryModuleLoad(module) {
  const extension = path.extname(module.id);
  Module._extensions[extension](module);
}


let json = MyRequire("./test.json");
let js = MyRequire("./test.js");
console.log(json)
console.log(js.test())