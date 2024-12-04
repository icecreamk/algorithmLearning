// 无限链式调用：
// 关键在于重写toString方法，对象的toString方法，当该对象被表示为一个文本值，
// 或者该对象以预期的字符串方式引用时候，会自动调用

// <---------------------><--------------------->add<---------------------><--------------------->

// 实现add
// add(1)(2)(3)(4)(); // 10
// add(1, 2)(3); // 6

function add(...args) {
  let fn = function (...newArgs) {
    return add.apply(null, args.concat(newArgs));
  };

  fn.toString = function () {
    return args.reduce((a, b) => a + b);
  };

  return fn;
}

alert(add(1)(2)(3)); // 6
add(1, 2)(3).toString(); // 6

function add1(x) {
  let sum = x;
  let fn = function (y) {
    sum += y;
    return fn;
  };

  fn.toString = function () {
    return sum;
  };

  return fn;
}

alert(add1(1)(2)(3));

// 实现add(2).minus(1)

// <---------------------><--------------------->obj.add(1).minus(2)<---------------------><--------------------->
class Calculator {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num;
    return this; // 返回当前实例，支持链式调用
  }

  minus(num) {
    this.result -= num;
    return this; // 返回当前实例，支持链式调用
  }

  toString() {
    return this.result.toString(); // 返回结果的字符串形式
  }
}

const calc = new Calculator();
console.log(calc.add(1).minus(2).toString()); // 输出: -1

// <---------------------><--------------------->number.add(1).minus(2)<---------------------><--------------------->

// (5).add(3).minus(2)
Number.prototype.add = function (num) {
    return this.valueOf() + num;
};
Number.prototype.minus = function (num) {
    return this.valueOf() - num;
};

Number.prototype.add = function (num) {
    return this.valueOf() + num;
};
Number.prototype.minus = function (num) {
    return this.valueOf() - num;
};

(5).add(3).minus(2) // 6