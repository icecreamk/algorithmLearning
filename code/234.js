/**
 * @param {ListNode} head
 * @return {boolean}
 */

// 快慢指针
// 快慢指针，假设是回文链表，快指针结束的时候，慢指针应该在中间位置；
// 此时断开链表，head为前半部分，slow是后半部分；
// 翻转slow后半部分；
// 对比head和翻转后的slow；
var isPalindrome = function (head) {
  if (!head || !head.next) return true;
  let fast = (slow = head);
  let pre;

  while (fast && fast.next) {
    pre = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  pre.next = null;
  let head2 = null;

  while (slow) {
    const temp = slow.next;
    slow.next = head2;
    head2 = slow;
    slow = temp;
  }

  while (head && head2) {
    if (head.val !== head2.val) {
      return false;
    }
    head = head.next;
    head2 = head2.next;
  }
  return true;
};

console.log(
  isPalindrome(
    new ListNode(1, new ListNode(2, new ListNode(2, new ListNode(1))))
  )
);
