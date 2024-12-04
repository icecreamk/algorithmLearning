// <---------------------><--------------------->实现一个生成迭代器的函数<---------------------><--------------------->
// for of 循环本质上是对next方法对反复调用

const arr = [1, 2, 3];
for (item of arr) {
  console.log(item);
}

const arr1 = [1, 2, 3];
const iterator1 = arr1[Symbol.iterator]();
iterator1.next();
iterator1.next();
iterator1.next();

// 封装到函数里面
function iterator(arr) {
  const iterator = arr[Symbol.iterator]();

  let now = { done: false };
  while (!now.done) {
    now = iterator.next();
    console.log(now.value);
  }
}

iterator([11, 22, 33]);

// es6中已经有生成迭代器的函数（生成器）：

function* gen(arr = []) {
  for (let i = 0; i < arr.length; i++) {
    yield i;
  }
}

const iterator2 = gen([4, 5, 6]);
iterator2.next();
iterator2.next();
iterator2.next();

// es5中实现如下：

function myIteratorGenerator(arr) {
  let index = 0;
  let len = arr.length;
  return {
    next: function () {
      if (index < len) {
        return { value: arr[index++], done: false };
      } else {
        return { done: true, value: undefined };
      }
    },
  };
}

myIteratorGenerator([4, 5, 6]);
iterator2.next();
iterator2.next();
iterator2.next();
