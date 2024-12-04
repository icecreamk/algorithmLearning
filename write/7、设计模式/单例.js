// ---------------------------------------------- 使用立即执行函数表达式 (IIFE) --------------------------------------------

const Singleton1 = (function () {
  let instance;

  function createInstance() {
    const obj = new Object({ name: "Singleton1" });
    return obj;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const instance1 = Singleton1.getInstance();
const instance2 = Singleton1.getInstance();

console.log(instance1 === instance2); // 输出: true

// ---------------------------------------------- （ES6） --------------------------------------------

class Singleton {
  static instance;

  constructor(name) {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.name = name;
    Singleton.instance = this;
  }

  getName() {
    return this.name;
  }
}

const instance3 = new Singleton("Instance 1");
const instance4 = new Singleton("Instance 2");

console.log(instance3 === instance4); // 输出: true
console.log(instance3.getName()); // 输出: Instance 1
console.log(instance4.getName()); // 输出: Instance 1

// ---------------------------------------------- 闭包 --------------------------------------------

function getSingleton(name) {
  let instance;

  function createInstance() {
    const obj = new Object({ name });
    return obj;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
}

const singletonFactory = getSingleton("Singleton");

const instance5 = singletonFactory.getInstance();
const instance6 = singletonFactory.getInstance();

console.log(instance5 === instance6); // 输出: true

// ---------------------------------------------- 模块 --------------------------------------------

const Singleton = (function () {
  const instance = { name: "Singleton" };

  return {
    getInstance: function () {
      return instance;
    },
  };
})();

const instance7 = Singleton.getInstance();
const instance8 = Singleton.getInstance();

console.log(instance7 === instance8); // 输出: true

// ---------------------------------------------- proxy和闭包 --------------------------------------------

// Proxy 对象拦截对构造函数的 new 调用，确保每次调用 new 时都返回同一个实例。
// Reflect.construct 方法用于调用构造函数并返回新创建的对象。

function proxyTest(func) {
  let instance;
  let handler = {
    construct: function (target, args) {
      if (!instance) {
        instance = Reflect.construct(func, args);
      }
      return instance;
    },
  };

  return new Proxy(func, handler);
}

function MyClass(name) {
  this.name = name;
}

const SingletonMyClass = proxyTest(MyClass);

const instance9 = new SingletonMyClass("Instance 1");
const instance11 = new SingletonMyClass("Instance 2");

console.log(instance9 === instance11); // 输出: true
console.log(instance9.name); // 输出: Instance 1
console.log(instance11.name); // 输出: Instance 1
