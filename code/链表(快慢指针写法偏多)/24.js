// 两两交换链表中的节点

var swapPairs = function (head) {
  let ret = new ListNode(0, head);
  let temp = ret;

  while (temp.next && temp.next.next) {
    let pre = temp.next;
    let cur = temp.next.next;
    pre.next = cur.next;
    cur.next = pre;
    temp.next = cur;

    temp = pre;
  }

  return ret.next;
};

// 1,2,3,4
a = new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4))));
console.log(swapPairs(a));
