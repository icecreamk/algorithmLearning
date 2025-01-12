// 排序链表

// 输入：head = [4,2,1,3]
// 输出：[1,2,3,4]

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 方法1: 归并（分治） ： 自顶向下计算，需要 O(logn) 的递归栈开销。

// 876. 链表的中间结点（快慢指针）
function middleNode(head) {
  let slow = head,
    fast = head;
  // 先找到链表的中间结点的【前一个节点】
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  const mid = slow.next; // 下一个节点就是链表的中间结点 mid
  slow.next = null; // 断开 mid 的前一个节点和 mid 的连接
  return mid;
}

// 21. 合并两个有序链表（双指针）
function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(); // 用哨兵节点简化代码逻辑
  let cur = dummy; // cur 指向新链表的末尾
  while (list1 && list2) {
    if (list1.val < list2.val) {
      cur.next = list1; // 把 list1 加到新链表中
      list1 = list1.next;
    } else {
      // 注：相等的情况加哪个节点都是可以的
      cur.next = list2; // 把 list2 加到新链表中
      list2 = list2.next;
    }
    cur = cur.next;
  }
  cur.next = list1 ?? list2; // 拼接剩余链表
  return dummy.next;
}

var sortList = function (head) {
  // 如果链表为空或者只有一个节点，无需排序
  if (head === null || head.next === null) {
    return head;
  }
  // 找到中间节点，并断开 head2 与其前一个节点的连接
  // 比如 head=[4,2,1,3]，那么 middleNode 调用结束后 head=[4,2] head2=[1,3]
  let head2 = middleNode(head);
  // 分治
  head = sortList(head);
  head2 = sortList(head2);
  // 合并
  return mergeTwoLists(head, head2);
};





a = new ListNode(4, new ListNode(2, new ListNode(1, new ListNode(3))));
console.log(sortList(a));


