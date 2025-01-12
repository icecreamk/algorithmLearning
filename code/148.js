// 排序链表

// 输入：head = [4,2,1,3]
// 输出：[1,2,3,4]

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  let ret = new ListNode(undefined, head);
  let temp = ret;

  while (temp.next && temp.next.next) {
    let pre = temp.next;
    let cur = temp.next.next;
    if (pre.val <= cur.val) {
      temp = temp.next;
      continue;
    }

    pre.next = cur.next;
    cur.next = pre;
    temp = cur;

    temp = temp.next;
  }

  return ret.next;
};
a = new ListNode(4, new ListNode(2, new ListNode(1, new ListNode(3))));
console.log(sortList(a));
