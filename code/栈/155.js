// 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

// 实现 MinStack 类:

// MinStack() 初始化堆栈对象。
// void push(int val) 将元素val推入堆栈。
// void pop() 删除堆栈顶部的元素。
// int top() 获取堆栈顶部的元素。
// int getMin() 获取堆栈中的最小元素。

// 示例 1:

// 输入：
// ["MinStack","push","push","push","getMin","pop","top","getMin"]
// [[],[-2],[0],[-3],[],[],[],[]]

// 输出：
// [null,null,null,null,-3,null,0,-2]


// 一个二维数组
// class MinStack {
//   constructor() {
//     // 这里的 0 写成任意数都可以，反正用不到
//     this.st = [[0, Infinity]]; // 栈底哨兵
//   }

//   push(val) {
//     this.st.push([val, Math.min(this.getMin(), val)]);
//   }

//   pop() {
//     this.st.pop();
//   }

//   top() {
//     return this.st[this.st.length - 1][0];
//   }

//   getMin() {
//     return this.st[this.st.length - 1][1];
//   }
// }

// var minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(1);
// minStack.push(-3);

// // (2) [0, Infinity]
// // (2) [-2, -2]
// // (2) [0, -2]
// // (2) [1, -2]
// // (2) [-3, -3]

// console.log(minStack.getMin());   // 返回 -3.
// minStack.pop();
// console.log(minStack.top());      // 返回 0.
// console.log(minStack.getMin());   // 返回 -2.


// 两个一维数组
var MinStack = function () {
  this.x_stack = [];
  this.min_stack = [Infinity];
};

MinStack.prototype.push = function (x) {
  this.x_stack.push(x);
  this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
};

MinStack.prototype.pop = function () {
  this.x_stack.pop();
  this.min_stack.pop();
};

MinStack.prototype.top = function () {
  return this.x_stack[this.x_stack.length - 1];
};

MinStack.prototype.getMin = function () {
  return this.min_stack[this.min_stack.length - 1];
};

var minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(1);
minStack.push(-3);

// min_stack [Infinity, -2, -2, -2, -3]
// x_stack [-2, 0, 1, -3]

console.log(minStack.getMin()); // 返回 -3.
minStack.pop();
console.log(minStack.top()); // 返回 0.
console.log(minStack.getMin()); // 返回 -2.
