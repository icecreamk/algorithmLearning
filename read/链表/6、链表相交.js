// 给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表没有交点，返回 null 。

// 简单来说，就是求两个链表交点节点的指针。 这里同学们要注意，交点不是数值相等，而是指针相等。
// 为了方便举例，假设节点元素数值相等，则节点指针相等。

// curA指向链表A的头结点，curB指向链表B的头结点：
// 然后让curA移动到，和curB 末尾对齐的位置
// 比较curA和curB是否相同，如果不相同，同时向后移动curA和curB，如果遇到curA == curB，则找到交点。
//           curA
// 1,   2,   3,   4,   5
//           curB
//           3,   4,   5

var getListLen = function (head) {
  let len = 0,
    cur = head;
  while (cur) {
    len++;
    cur = cur.next;
  }
  return len;
};
var getIntersectionNode = function (headA, headB) {
  let curA = headA,
    curB = headB,
    lenA = getListLen(headA), // 求链表A的长度
    lenB = getListLen(headB);
  if (lenA < lenB) {
    // 让curA为最长链表的头，lenA为其长度
    // 交换变量注意加 “分号” ，两个数组交换变量在同一个作用域下时
    // 如果不加分号，下面两条代码等同于一条代码: [curA, curB] = [lenB, lenA]
    [curA, curB] = [curB, curA];
    [lenA, lenB] = [lenB, lenA];
  }
  let i = lenA - lenB; // 求长度差
  while (i-- > 0) {
    // 让curA和curB在同一起点上（末尾位置对齐）
    curA = curA.next;
  }
  while (curA && curA !== curB) {
    // 遍历curA 和 curB，遇到相同则直接返回
    curA = curA.next;
    curB = curB.next;
  }
  return curA;
};

// 时间复杂度：O(n + m)
// 空间复杂度：O(1)