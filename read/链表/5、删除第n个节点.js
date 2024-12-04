// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
// 进阶：你能尝试使用一趟扫描实现吗？

// 输入：head = [1,2,3,4,5], n = 2 输出：[1,2,3,5]
// 示例 2：
// 输入：head = [1], n = 1 输出：[]
// 示例 3：
// 输入：head = [1,2], n = 1 输出：[1]

// 双指针的经典应用，如果要删除倒数第n个节点，让fast移动n步，然后让fast和slow同时移动，直到fast指向链表末尾。删掉slow所指向的节点就可以了。
// 首先这里我推荐大家使用虚拟头结点，这样方便处理删除实际头结点的逻辑

// 快慢指针
var removeNthFromEnd = function (head, n) {
  // 创建哨兵节点，简化解题逻辑
  let dummyHead = new ListNode(0, head);
  let fast = dummyHead;
  let slow = dummyHead;
  while (n--) fast = fast.next;
  while (fast.next !== null) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return dummyHead.next;
};

// 计算节点总数法
function removeNthFromEnd1(head, n) {
  let curNode = head;
  let listSize = 0;
  while (curNode) {
    curNode = curNode.next;
    listSize++;
  }
  if (listSize === n) {
    head = head.next;
  } else {
    curNode = head;
    for (let i = 0; i < listSize - n - 1; i++) {
      curNode = curNode.next;
    }
    curNode.next = curNode.next.next;
  }
  return head;
}

// 递归倒退n法
function removeNthFromEnd(head, n) {
  let newHead = new ListNode(0, head);
  let cnt = 0;
  function recur(node) {
    if (node === null) return;
    recur(node.next);
    cnt++;
    if (cnt === n + 1) {
      node.next = node.next.next;
    }
  }
  recur(newHead);
  return newHead.next;
}
