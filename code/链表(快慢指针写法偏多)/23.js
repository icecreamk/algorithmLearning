// 合并 K 个升序链表
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */

// 双指针法 + 两两合并
// 时间复杂度：O(kn)(k为链表个数，n为当前两个合并中链表的长度)
// 空间复杂度：O(1)
var mergeKLists = function (lists) {
  let mergeTwoLists = (l1, l2) => {
    let preHead = new ListNode(-1);
    let preNode = preHead;
    while (l1 && l2) {
      if (l1.val <= l2.val) {
        preNode.next = l1;
        l1 = l1.next;
      } else {
        preNode.next = l2;
        l2 = l2.next;
      }
      preNode = preNode.next;
    }
    preNode.next = l1 ? l1 : l2;
    return preHead.next;
  };

  let n = lists.length;
  if (n == 0) return null;
  let res = lists[0];
  for (let i = 1; i < n; i++) {
    if (lists[i]) {
      res = mergeTwoLists(res, lists[i]);
    }
  }
  return res;
};

// 递归 + 分治
// 时间复杂度：O(nlogK)
// k为链表总数
// n为合并两个链表所用时间
// 空间复杂度：O(n)

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  let n = lists.length;
  if (n == 0) return null;
  let mergeTwoLists = (l1, l2) => {
    if (l1 == null) return l2;
    if (l2 == null) return l1;
    if (l1.val <= l2.val) {
      l1.next = mergeTwoLists(l1.next, l2);
      return l1;
    } else {
      l2.next = mergeTwoLists(l1, l2.next);
      return l2;
    }
  };
  let merge = (left, right) => {
    if (left == right) return lists[left];
    const mid = (left + right) >> 1;
    let l1 = merge(left, mid);
    let l2 = merge(mid + 1, right);
    return mergeTwoLists(l1, l2);
  };
  return merge(0, n - 1);
};
