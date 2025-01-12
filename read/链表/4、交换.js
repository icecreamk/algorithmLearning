// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
// [1,2,3,4]
// [2,1,4,3]

// 建议使用虚拟头结点，这样会方便很多，要不然每次针对头结点（没有前一个指针指向头结点），还要单独处理。

class LinkNode {
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

// 双指针
var swapPairs = function (head) {
  let ret = new ListNode(0, head),
    temp = ret;
  while (temp.next && temp.next.next) {
    let cur = temp.next.next,
      pre = temp.next;
    
    pre.next = cur.next;
    cur.next = pre;
    temp.next = cur;
    temp = pre;
  }
  return ret.next;
};

//   temp   pre  cur
//   null，  1，   2，   3    4

// 递归
var swapPairs1 = function (head) {
  if (head == null || head.next == null) {
    return head;
  }

  let after = head.next;
  head.next = swapPairs1(after.next);
  after.next = head;

  return after;
};



//   head   after
//   1，     2，    3    4