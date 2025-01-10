/**
 * Definition for singly-linked list.
 *
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
var reverseList = function (head) {
  let pre = null
  let temp = null;

  while (head) {
    temp = head.next;
    head.next = pre;
    pre = head;
    head = temp;
  }
  return pre;
};

const a = new ListNode(1, new ListNode(2, null));
console.log(a, reverseList(a));
