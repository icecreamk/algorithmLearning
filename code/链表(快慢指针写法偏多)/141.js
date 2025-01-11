// 环形链表
// 输入：head = [3,2,0,-4], pos = 1
// 输出：true
// 解释：链表中有一个环，其尾部连接到第二个节点。

// 1.cur1 每遍历到一个节点，就让 cur2 从头遍历之前所有节点
// 如果 cur2 走到 cur1，所用的步数二者一样，则相遇点不是入环点
// 如果 cur2 走到 cur1，用的步数二者不一样，则相遇点是入环点，cur1比 cur2多走一个环

// 哈希 时间复杂度为 O(n)，空间复杂度为 O(n)
var hasCycle = (head) => {
  let map = new Map();
  while (head) {
    if (map.has(head)) return true;
    map.set(head, true); // 存的是节点的地址引用，而不是节点值
    head = head.next;
  }
  return false;
};

// 2、快慢指针
var hasCycle = (head) => {
  let fast = head;
  let slow = head;
  while (fast) {
    if (fast.next === null) return false;
    fast = fast.next.next;
    slow = slow.next;
    if (fast === slow) return true;
  }
  return false;
};

const a = new ListNode(1);
const b = new ListNode(2);
const c = new ListNode(3);

a.next = b;
b.next = c;
c.next = a;

console.log(hasCycle(a));
