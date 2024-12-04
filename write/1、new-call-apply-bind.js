// <---------------------><--------------------->new<---------------------><--------------------->
function myNew(constructor, ...args) {
  // 创建一个新对象，原型为构造函数的 prototype
  const obj = Object.create(constructor.prototype);
  // 调用构造函数，并将 this 绑定到新对象上
  const result = constructor.apply(obj, args);
  // 如果构造函数返回的是一个对象，则返回该对象；否则返回新创建的对象
  return result instanceof Object ? result : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
  // return { test: "1" };
  // 如果构造函数return一个对象，则返回该对象，否则返回this
  // 且该对象无法获取到Person原型上的属性和方法
}

Person.prototype.say = function () {
  console.log(this.name + " is " + this.age + " years old.");
};

const person = myNew(Person, "Alice", 30);
console.log(person);

// <---------------------><--------------------->call<---------------------><--------------------->

// 获取目标对象：从参数中获取目标对象。
// 保存原始函数：将当前函数保存到目标对象的一个临时属性上。
// 调用函数：通过目标对象调用该临时属性。
// 删除临时属性：调用完成后删除目标对象上的临时属性。

Function.prototype.myCall = function (context, ...args) {
  // 如果没有传入 context，默认为 window
  context = context || window;

  // this就是当前函数， 将当前函数保存到 context 的一个临时属性上
  context.fn = this;

  // 通过 context 调用该临时属性
  const result = context.fn(...args);

  // 删除 context 上的临时属性
  delete context.fn;

  // 返回函数调用的结果
  return result;
};

function sayHello(year, month) {
  console.log(`${this.name}, ${year}, ${month}.`);
}

var person1 = {
  name: "Alice",
};

sayHello.myCall(person1, "1995", "11");

// <---------------------><--------------------->apply<---------------------><--------------------->

Function.prototype.myApply = function (context, args) {
  // 如果没有传入 context，默认为 window
  context = context || window;

  // this就是当前函数， 将当前函数保存到 context 的一个临时属性上
  context.fn = this;

  // 处理参数数组
  let result;
  if (args && Array.isArray(args)) {
    result = context.fn(...args);
  } else {
    result = context.fn();
  }

  // 删除 context 上的临时属性
  delete context.fn;

  // 返回函数调用的结果
  return result;
};

function sayHello(year, month) {
  console.log(`${this.name}, ${year}, ${month}.`);
}

var person1 = {
  name: "Alice",
};

sayHello.myApply(person1, ["2023", "12"]);

// <---------------------><--------------------->bind<---------------------><--------------------->
// 获取目标对象：从参数中获取目标对象。
// 保存原始函数：将当前函数保存起来。
// 创建新函数：创建一个新的函数，该函数在被调用时会将 this 设置为目标对象，并且可以传入预设的参数。
// 处理 new 调用：确保新函数可以被 new 调用时正确工作。
Function.prototype.myBind = function (context, ...presetArgs) {
  // 保存当前函数
  const fn = this;

  // 创建一个新的函数
  const boundFn = function (...callArgs) {
    // 合并预设参数和调用时传入的参数
    const args = presetArgs.concat(callArgs);

    // 判断是否通过 new 调用
    if (this instanceof boundFn) {
      // 通过 new 调用时，this 应该是新创建的对象
      return fn.apply(this, args);
    } else {
      // 普通调用时，this 应该是传入的 context
      return fn.apply(context, args);
    }
  };

  // 使新函数的原型链与原函数的原型链一致
  boundFn.prototype = Object.create(fn.prototype);

  // 返回新函数
  return boundFn;
};

// 测试
// 普通函数
function sayHello(year, month) {
  console.log(`${this.name}, ${year}, ${month}.`);
}
var boundSayHello = sayHello.myBind(person1, "2024");
boundSayHello("11");

// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function (year, month) {
  console.log(this.name, ":", year, month);
};

var person1 = {
  name: "Alice",
  age: "18",
};

var boundPerson = Person.myBind(person1, "Alice");
var person2 = new boundPerson("18");
console.log(person2);
person2.say("2024", "11");
