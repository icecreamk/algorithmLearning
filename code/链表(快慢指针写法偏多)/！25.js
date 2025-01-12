// K 个一组翻转链表

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {
  // k等于1相当于不翻转或者head为null，都直接返回head
  if (k <= 1 || !head) {
    return head;
  }
  // 计算第一段链表是否满足长度k
  let count = 1;
  let current = head;
  while (count < k && current.next) {
    current = current.next;
    count++;
  }
  // 第一段链表满足长度k则进行翻转并递归
  if (count === k) {
    let tail = current;
    current = head;
    let prev = null;
    // 翻转第一段链表，翻转后第二段链表表头为current
    while (prev !== tail) {
      const ne = current.next;
      current.next = prev;
      prev = current;
      current = ne;
    }
    // 翻转后此时head为表尾，连接上第二段链表的表头
    head.next = reverseKGroup(current, k);
    // 返回第一段链表的表头
    return prev;
  } else {
    // 第一段不满足长度k时直接返回表头，无需翻转
    return head;
  }
};

a = new ListNode(
  1,
  new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
);
console.log(reverseKGroup(a, 2));
