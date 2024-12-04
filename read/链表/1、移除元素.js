// 题意：删除链表中等于给定值 val 的所有节点。
// 示例 1： 输入：head = [1,2,6,3,4,5,6], val = 6 输出：[1,2,3,4,5]
// 示例 2： 输入：head = [], val = 1 输出：[]
// 示例 3： 输入：head = [7,7,7,7], val = 7 输出：[]

// 让节点next指针直接指向下下一个节点就可以了，
// 那么因为单链表的特殊性，只能指向下一个节点，刚刚删除的是链表的中第二个，和第四个节点，那么如果删除的是头结点又该怎么办呢？
// 这里就涉及如下链表操作的两种方式：
// 直接使用原来的链表来进行删除操作。
// 设置一个虚拟头结点在进行删除操作。

class ListNode {
  constructor(val, next = null) {
    this.val = val; // 节点的值
    this.next = next; // 指向下一个节点的指针，默认为 null
  }
}

// 原来的链表
// 时间复杂度: O(n)
// 空间复杂度: O(1)
function removeElements1(head, val) {
  // 删除头部节点
  while (head !== null && head.val === val) {
    head = head.next;
  }
  if (head === null) return head;
  let pre = head,
    cur = head.next;
  // 删除非头部节点
  while (cur) {
    if (cur.val === val) {
      pre.next = cur.next;
    } else {
      pre = pre.next;
    }
    cur = cur.next;
  }
  return head;
}

// 添加虚拟节点
// 时间复杂度: O(n)
// 空间复杂度: O(1)
function removeElements2(head, val) {
  // 添加虚拟节点
  const data = new ListNode(0, head);
  let pre = data,
    cur = data.next;
  while (cur) {
    if (cur.val === val) {
      pre.next = cur.next;
    } else {
      pre = cur;
    }
    cur = cur.next;
  }
  return data.next;
}

// 也可以通过递归的思路解决本题:
// 基础情况：对于空链表，不需要移除元素。
// 递归情况：首先检查头节点的值是否为 val，如果是则移除头节点，答案即为在头节点的后续节点上递归的结果；
// 如果头节点的值不为 val，则答案为头节点与在头节点的后续节点上递归得到的新链表拼接的结果。
// class Solution {
//     public:
//         ListNode* removeElements(ListNode* head, int val) {
//             // 基础情况：空链表
//             if (head == nullptr) {
//                 return nullptr;
//             }
//             // 递归处理
//             if (head->val == val) {
//                 ListNode* newHead = removeElements(head->next, val);
//                 delete head;
//                 return newHead;
//             } else {
//                 head->next = removeElements(head->next, val);
//                 return head;
//             }
//         }
//     };

// 辅助函数：将数组转换为链表
function arrayToLinkedList(arr) {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// 辅助函数：将链表转换为数组
function linkedListToArray(head) {
  let result = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

// 测试示例
const examples = [
  { input: { arr: [1, 2, 6, 3, 4, 5, 6], val: 6 }, expected: [1, 2, 3, 4, 5] },
  { input: { arr: [], val: 1 }, expected: [] },
  { input: { arr: [7, 7, 7, 7], val: 7 }, expected: [] },
  { input: { arr: [1, 2, 3, 4, 5], val: 3 }, expected: [1, 2, 4, 5] },
  { input: { arr: [1, 2, 3, 4, 5], val: 1 }, expected: [2, 3, 4, 5] },
  { input: { arr: [1, 2, 3, 4, 5], val: 5 }, expected: [1, 2, 3, 4] },
];

examples.forEach(({ input, expected }, index) => {
  const head = arrayToLinkedList(input.arr);
  const resultHead = removeElements1(head, input.val);
  const resultArray = linkedListToArray(resultHead);
  console.log(
    `Example ${index + 1}:`,
    resultArray.toString() === expected.toString() ? "Passed" : "Failed"
  );
});
