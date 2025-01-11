// 输入：l1 = [1,2,4], l2 = [1,3,4]
// 输出：[1,1,2,3,4,4]

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const head = {
    next: null,
  };
  let temp = head;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      temp.next = list1;
      list1 = list1.next;
    } else {
      temp.next = list2;
      list2 = list2.next;
    }
    temp = temp.next;
  }
  temp.next = list1 === null ? list2 : list1;
  return head.next;
};

var mergeTwoLists = function (l1, l2) {
  if (l1 === null) {
    return l2;
  } else if (l2 === null) {
    return l1;
  } else if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l1, l2.next);
    return l2;
  }
};

const a = new ListNode(1, new ListNode(2, new ListNode(3)));
const b = new ListNode(1, new ListNode(2, new ListNode(4)));
console.log(mergeTwoLists(a, b));
