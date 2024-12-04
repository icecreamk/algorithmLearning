class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null; // 头节点
    this.size = 0; //长度
  }

  //   添加 O(n)
  add(index, element) {
    // 向末尾添加
    if (arguments.length === 1) {
      element = index; // 当前元素等于传递的第一项
      index = this.size; // 索引指向最后一个元素
    }

    if (index < 0 && index > this.size) {
      throw new Error("索引不合法");
    }

    if (index === 0) {
      // 直接把头节点改掉
      this.head = new Node(element, this.head);
    } else {
      // 获取当前头指针
      let current = this.head;
      // 添加索引是1，就找到第0个的next赋值
      for (let i = 0; i < index - 1; i++) {
        current = current.next;
      }

      current.next = new Node(element, current.next);
    }

    this.size++;
  }
  //   删除 O(n)

  remove(index) {
    if (index < 0 && index >= this.size) {
      throw new Error("索引不合法");
    }

    this.size--;
    if (index === 0) {
      let head = this.head;
      this.head = this.head.next;
      return head; // 返回删除的元素
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        //index - 1 找到前一个
        current = current.next;
      }
      let returnVal = current.next; //返回删除的
      current.next = current.next.next;
      return returnVal;
    }
  }
  //   查找 O(n)

  get(index) {
    if (index < 0 && index >= this.size) {
      throw new Error("索引不合法");
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }

    return current;
  }

  // 递归反转列表
  reverse() {
    const reverse = (head) => {

      // 递归的出口
      if (head === null || head.next === null) {
        return head;
      }
      let newHead = reverse(head.next);

      // 让下一个元素的next指向自己，自己先指向null
      head.next.next = head;
      head.next = null;
      return newHead;
    };
    return reverse(this.head);
  }
}

var ll = new LinkedList();
ll.add(0, 100); // {element: 100, next: null}
ll.add(0, 200); // {element: 200, next: {element: 100, next: null}}
ll.add(1, 500); // {element: 200, next: {element: 500, next: {element: 100, next: null}}}
ll.add(300); // {element: 200, next: {element: 500, next: {element: 100, next: {element: 300, next: null}}}}
ll.remove(0); // {element: 500, next: {element: 100, next: {element: 300, next: null}}}

// 反转例子
var ll1 = new LinkedList();
ll1.add(1);
ll1.add(2);
ll1.add(3);
console.log('reverse', ll1.reverse());

// <---------------------><--------------------->队列<---------------------><--------------------->

class Queue {
  constructor() {
    this.ll = new LinkedList();
  }
  // 入队
  offer(item) {
    this.ll.add(item);
  }

  peek() {
    // 查看第一个
    return this.ll.get(0);
  }

  remove() {
    // 队列从对头删除
    return this.ll.remove(0);
  }
}

var queue = new Queue();
queue.offer(1);
queue.offer(2);
queue.offer(3);
var removeVal = queue.remove();
console.log("ll", queue.ll);
console.log("r", removeVal);
console.log("peek", queue.peek());
