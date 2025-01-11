// 删除链表的倒数第 N 个结点

var removeNthFromEnd = function (head, n) {
  if (!head || !head.next) {
    return null;
  }
  let slow = (fast = head);
  let pre = slow;
  while (n-- > 0) {
    fast = fast.next;
  }

  //   已经走到最后一个，直接删除第一个
  if (!fast) {
    return head.next;
  }

  while (fast) {
    pre = slow;
    slow = slow.next;
    fast = fast.next;
  }
  pre.next = slow.next;
  return head;
};
