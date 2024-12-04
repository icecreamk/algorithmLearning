// <---------------------><--------------------->instanceof<---------------------><--------------------->
// 获取对象的原型：获取对象的原型链。
// 获取构造函数的原型：获取构造函数的原型。
// 遍历原型链：遍历对象的原型链，检查是否与构造函数的原型相等。
function myInstanceof(obj, constructor) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }

  // 获取对象的原型
  let proto = Object.getPrototypeOf(obj);

  // 获取构造函数的原型
  let prototype = constructor.prototype;

  // 遍历原型链
  while (proto !== null) {
    if (proto === prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}

// 测试示例
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function (year, month) {
  console.log(this.name, ":", year, month);
};

var person1 = new Person("Alice", 30);

console.log(myInstanceof(person1, Person)); // 输出: true
console.log(myInstanceof(person1, Function)); // 输出: false
console.log(myInstanceof(person1, Object)); // 输出: true
console.log(myInstanceof([], Array)); // 输出: true
console.log(myInstanceof({}, Object)); // 输出: true
