// 环形链表
// 输入：head = [3,2,0,-4], pos = 1
// 输出：1
// 解释：链表中有一个环，其尾部连接到第二个节点。

// 返回起始环的索引

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 哈希
var detectCycle = function (head) {
  const m = new Map();
  let idx = 0;
  while (head) {
    if (m.has(head)) {
      return m.get(head);
    }
    m.set(head, head);
    idx++;
    head = head.next;
  }
  return null;
};

// 快慢指针

var detectCycle = function (head) {
  if (!head || head.next === head) return head;
  let slow = (fast = head);

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast == slow) {
      // 由于x = z，也就是进入环的距离等于未走完环的距离，相遇时，就是起始点
      slow = head;
      while (fast !== slow) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow;
    }
  }
  return null;
};
const a = new ListNode(1);
const b = new ListNode(2);

a.next = b;
a.next = a;
console.log(detectCycle(a));
