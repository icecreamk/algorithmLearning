// 使用队列实现栈的下列操作：
// push(x) -- 元素 x 入栈
// pop() -- 移除栈顶元素
// top() -- 获取栈顶元素
// empty() -- 返回栈是否为空

// 时间复杂度: pop为O(n)，top为O(n)，其他为O(1)
// 空间复杂度: O(n)

// 使用两个队列实现
var MyStack = function () {
  this.queue1 = [];
  this.queue2 = [];
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  this.queue1.push(x);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack.prototype.pop = function () {
  // 减少两个队列交换的次数， 只有当queue1为空时，交换两个队列
  if (!this.queue1.length) {
    [this.queue1, this.queue2] = [this.queue2, this.queue1];
  }

  // 把queue1前length1-1个移到queue2，然后剩下最后一个返回
  while (this.queue1.length > 1) {
    this.queue2.push(this.queue1.shift());
  }
  return this.queue1.shift();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack.prototype.top = function () {
  const x = this.pop();
  this.queue1.push(x);
  return x;
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return !this.queue1.length && !this.queue2.length;
};

// 使用一个队列实现
/**
 * Initialize your data structure here.
 */
var MyStack1 = function () {
  this.queue = [];
};

/**
 * Push element x onto stack.
 * @param {number} x
 * @return {void}
 */
MyStack1.prototype.push = function (x) {
  this.queue.push(x);
};

/**
 * Removes the element on top of the stack and returns that element.
 * @return {number}
 */
MyStack1.prototype.pop = function () {
  let size = this.queue.length;
  while (size-- > 1) {
    // 不断把队列中第一个放到末尾，直到最后一个，模拟栈的后入先出
    this.queue.push(this.queue.shift());
  }
  return this.queue.shift();
};

/**
 * Get the top element.
 * @return {number}
 */
MyStack1.prototype.top = function () {
  const x = this.pop();
  this.queue.push(x);
  return x;
};

/**
 * Returns whether the stack is empty.
 * @return {boolean}
 */
MyStack1.prototype.empty = function () {
  return !this.queue.length;
};


const stack = new MyStack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop());
console.log(stack.pop());