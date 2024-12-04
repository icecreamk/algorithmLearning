// <---------------------><---------------------> 实现 Object.extends  <---------------------><--------------------->
function Parent(name) {
  this.name = name;
}

function Child(name, age) {
  // 将Parent.prototype赋值给Child.prototype
  Object.setPrototypeOf(Child, Parent);

  // 将Child的实例作为this调用Parent,得到继承Parent之后实例， 相当于super（也就是super可以这样实现）
  Object.getPrototypeOf(Child).call(this, name);

  this.age = age;
  return this;
}

let child = new Child("child", 18);
console.log(child);

// <---------------------><---------------------> 实现 Object.create  <---------------------><--------------------->

// Object.create()： 创建一个新对象，使得新对象的原型__proto__指向参数指定的对象

function create(protoObj) {
  function F() {}
  F.prototype = protoObj;
  return new F();
}

// <---------------------><---------------------> 实现 Object.freeze  <---------------------><--------------------->

// Object.freeze()： 冻结对象，使其不可修改（添加/删除）属性，也不能修改该对象已有属性的可枚举性、可配置性、可写性，
// 也不能修改已有属性的值和他的原型属性，最后返回一个和传入参数相同的对象

function myFreeze(obj) {
  if (obj instanceof Object) {
    Object.seal(obj); // 封闭对象
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        Object.defineProperty(obj, key, {
          writable: false, // 设置只读
        });
        // 递归子对象
        myFreeze(obj[key]);
      }
    }
  }
}

// <---------------------><---------------------> 实现 Object.is  <---------------------><--------------------->
// NaN 在 === 中不想等，而在Object.is相等
// +0 -0 在 === 中想等，而在Object.is不相等

function myIs(a, b) {
  if (x === y) {
    // 当前下只有 +0 -0 的情况
    // 如果 x !== 0 返回true
    // 如果 x === 0 用 1/+0 Infinity === 1/-0 -Infity 判断
    return x !== 0 || 1 / x === 1 / y;
  }

  // x !== y 的情况，只要判断NaN,如果x!==x 说明x是NaN
  // 那么，x和y同时为NaN的时候返回true
  return x !== x && y !== y;
}

// <---------------------><---------------------> 实现 compose  <---------------------><--------------------->

function compose(...fns) {
  if (!fns.length) {
    return (val) => val;
  }
  if (fns.length === 1) {
    return fns[0];
  }

  // 当前是从右往左执行，若从左往右
  // 将reduce 改成 reduceRight 或者 a(b(...args)) 改成 b(a(...args))
  return fns.reduce((a, b) => {
    return (...args) => a(b(...args));
  });
}

function fn1(x) {
  console.log("fn1");
  return x + 1;
}
function fn2(x) {
  console.log("fn2");
  return x + 2;
}
function fn3(x) {
  console.log("fn3");
  return x + 3;
}

const a = compose(fn1, fn2, fn3); // function () { return fn1(fn2(fn3(1))) }
console.log(a, a(1)); // 1+3+2+1 = 7
