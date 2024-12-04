// 题意： 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
// 为了表示给定链表中的环，使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。
// 说明：不允许修改给定的链表。

// 可以使用快慢指针法，分别定义 fast 和 slow 指针，从头结点出发，fast指针每次移动两个节点，slow指针每次移动一个节点，如果 fast 和 slow指针在途中相遇 ，说明这个链表有环。
// 为什么fast 走两个节点，slow走一个节点，有环的话，一定会在环内相遇呢，而不是永远的错开呢
// 首先第一点：fast指针一定先进入环中，如果fast指针和slow指针相遇的话，一定是在环中相遇，这是毋庸置疑的。
// 那么来看一下，为什么fast指针和slow指针一定会相遇呢？
// 可以画一个环，然后让 fast指针在任意一个节点开始追赶slow指针。

// 假设从头结点到环形入口节点 的节点数为x。 环形入口节点到 fast指针与slow指针相遇节点 节点数为y。 从相遇节点 再到环形入口节点节点数为 z。 如图所示：
// 那么相遇时： slow指针走过的节点数为: x + y， fast指针走过的节点数：x + y + n (y + z)
// 因为fast指针是一步走两个节点，slow指针一步走一个节点， 所以 fast指针走过的节点数 = slow指针走过的节点数 * 2：
// (x + y) * 2 = x + y + n (y + z)
// 两边消掉一个（x+y）: x + y = n (y + z)
// 因为要找环形的入口，那么要求的是x，因为x表示 头结点到 环形入口节点的的距离。
// 所以要求x ，将x单独放在左面：x = n (y + z) - y ,
// 再从n(y+z)中提出一个 （y+z）来，整理公式之后为如下公式：x = (n - 1) (y + z) + z 注意这里n一定是大于等于1的，因为 fast指针至少要多走一圈才能相遇slow指针。
// 这个公式说明什么呢？
// 当 n为1的时候，公式就化解为 x = z，
// 意味着fast指针在环形里转了一圈之后，就遇到了 slow指针了。

// 时间复杂度: O(n)，快慢指针相遇前，指针走的次数小于链表长度，快慢指针相遇后，两个index指针走的次数也小于链表长度，总体为走的次数小于 2n
// 空间复杂度: O(1)

// 两种循环实现方式
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 先判断是否是环形链表
var detectCycle1 = function (head) {
  if (!head || !head.next) return null;
  let slow = head.next,
    fast = head.next.next;
  while (fast && fast.next && fast !== slow) {
    slow = slow.next;
    fast = fast.next.next;
  }
  if (!fast || !fast.next) return null;
  slow = head;
  while (fast !== slow) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
};

var detectCycle2 = function (head) {
  if (!head || !head.next) return null;
  let slow = head.next,
    fast = head.next.next;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (fast == slow) {
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
