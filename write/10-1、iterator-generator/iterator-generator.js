// 迭代器：
// Symbol.iterator，这是 JavaScript 中用于定义可迭代对象的一个内置符号。
// 通过实现 Symbol.iterator 方法，可以使一个对象成为可迭代对象，从而可以使用 for...of 循环等迭代机制。

// 生成器：
// 生成器是一种特殊的函数，可以用来生成迭代器对象。
// 生成器函数使用 function* 语法定义，并且可以使用 yield 关键字来生成一系列的值。

// <---------------------><---------------------> 类 实现 迭代器<---------------------><--------------------->

class MyIterable {
  constructor(items) {
    this.items = items;
  }

  // 实现 Symbol.iterator 方法
  [Symbol.iterator]() {
    let index = 0;
    const items = this.items;

    return {
      next: () => {
        if (index < items.length) {
          return { value: items[index++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  }
}

// 创建一个 MyIterable 实例
const myIterable = new MyIterable([1, 2, 3, 4, 5]);
// 使用 for...of 循环遍历
for (const item of myIterable) {
  console.log(item);
}

// <---------------------><---------------------> 普通函数 实现 迭代器<---------------------><--------------------->

var list = [1, 2, 3];
list[Symbol.iterator] = function () {
  let index = 0;
  return {
    next: () => {
      if (index < this.length) {
        return { value: this[index++], done: false };
      } else {
        return { done: true };
      }
    },
  };
};
for (let item of list) {
  console.log(item);
}

// <---------------------><---------------------> 生成器（类） 实现 迭代器<---------------------><--------------------->

class MyIterable {
  constructor(items) {
    this.items = items;
  }

  // 使用生成器实现 Symbol.iterator 方法
  *[Symbol.iterator]() {
    for (const item of this.items) {
      yield item;
    }
  }
}

// 创建一个 MyIterable 实例
const myIterable1 = new MyIterable([1, 2, 3, 4, 5]);
// 使用 for...of 循环遍历
for (const item of myIterable1) {
  console.log(item);
}

// <---------------------><---------------------> 生成器（普通函数） 实现 迭代器<---------------------><--------------------->

var list = [1, 2, 3];
list[Symbol.iterator] = function* () {
  let index = 0;
  while (index < this.length) {
    yield this[index++];
  }
};
for (let item of list) {
  console.log(item);
}
