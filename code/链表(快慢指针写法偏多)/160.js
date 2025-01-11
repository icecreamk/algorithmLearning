// 相交链表

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */

// 哈希集合
var getIntersectionNode = function (headA, headB) {
  const s = new Set();
  let temp = headA;
  while (temp) {
    s.add(temp);
    temp = temp.next;
  }

  let head = null;
  temp = headB;
  while (temp) {
    if (s.has(temp)) {
      head = temp;
      break;
    }
    temp = temp.next;
  }
  return head;
};

// 用到数学
// 链表 headA 和 headB 的长度分别是 m 和 n。假设链表 headA 的不相交部分有 a 个节点，链表 headB 的不相交部分有 b 个节点，两个链表相交的部分有 c 个节点，则有 a+c=m，b+c=n。
// 在指针 pA 移动了 a+c+b 次、指针 pB 移动了 b+c+a 次之后，两个指针会同时到达两个链表相交的节点

// 快慢指针，空间复杂度降为1
var getIntersectionNode = function (headA, headB) {
  if (headA === null || headB === null) {
    return null;
  }
  let pA = headA,
    pB = headB;
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }
  return pA;
};

// 1 2 3 4 5 6
// 7 8 4 5 6
