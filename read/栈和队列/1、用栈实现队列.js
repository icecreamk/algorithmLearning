// 使用栈实现队列的下列操作：
// push(x) -- 将一个元素放入队列的尾部。
// pop() -- 从队列首部移除元素。
// peek() -- 返回队列首部的元素。
// empty() -- 返回队列是否为空。

// MyQueue queue = new MyQueue();
// queue.push(1);
// queue.push(2);
// queue.peek();  // 返回 1
// queue.pop();   // 返回 1
// queue.empty(); // 返回 false

// 时间复杂度: push和empty为O(1), pop和peek为O(n)
// 空间复杂度: O(n)

// 使用两个数组的栈方法（push, pop） 实现队列
/**
 * Initialize your data structure here.
 */
var MyQueue = function () {
  this.stackIn = [];
  this.stackOut = [];
};

/**
 * Push element x to the back of queue.
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.stackIn.push(x);
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  const size = this.stackOut.length;
  if (size) {
    return this.stackOut.pop();
  }
  while (this.stackIn.length) {
    this.stackOut.push(this.stackIn.pop());
  }
  return this.stackOut.pop();
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  const x = this.pop();
  this.stackOut.push(x);
  return x;
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return !this.stackIn.length && !this.stackOut.length;
};

// class MyQueue {
//   private stackIn: number[]
//   private stackOut: number[]
//   constructor() {
//       this.stackIn = [];
//       this.stackOut = [];
//   }

//   push(x: number): void {
//       this.stackIn.push(x);
//   }

//   pop(): number {
//       if (this.stackOut.length === 0) {
//           while (this.stackIn.length > 0) {
//               this.stackOut.push(this.stackIn.pop()!);
//           }
//       }
//       return this.stackOut.pop()!;
//   }

//   peek(): number {
//       let temp: number = this.pop();
//       this.stackOut.push(temp);
//       return temp;
//   }

//   empty(): boolean {
//       return this.stackIn.length === 0 && this.stackOut.length === 0;
//   }
// }

// #
