// 排序链表

// 输入：head = [4,2,1,3]
// 输出：[1,2,3,4]

// 方法2: 归并（迭代） ： 自底向上计算，空间复杂度优化成 O(1)。

// 自底向上的意思是：
// 首先，归并长度为 1 的子链表。例如 [4,2,1,3]，把第一个节点和第二个节点归并，第三个节点和第四个节点归并，得到 [2,4,1,3]。
// 然后，归并长度为 2 的子链表。例如 [2,4,1,3]，把前两个节点和后两个节点归并，得到 [1,2,3,4]。
// 然后，归并长度为 4 的子链表。
// 依此类推，直到归并的长度大于等于链表长度为止，此时链表已经是有序的了。

// 作者：灵茶山艾府
// 链接：https://leetcode.cn/problems/sort-list/solutions/2993518/liang-chong-fang-fa-fen-zhi-die-dai-mo-k-caei/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。


// 获取链表长度
function getListLength(head) {
  let length = 0;
  while (head) {
    length++;
    head = head.next;
  }
  return length;
}

// 分割链表
// 如果链表长度 <= size，不做任何操作，返回空节点
// 如果链表长度 > size，把链表的前 size 个节点分割出来（断开连接），并返回剩余链表的头节点
function splitList(head, size) {
  // 先找到 nextHead 的前一个节点
  let cur = head;
  for (let i = 0; i < size - 1 && cur; i++) {
    cur = cur.next;
  }

  // 如果链表长度 <= size
  if (cur === null || cur.next === null) {
    return null; // 不做任何操作，返回空节点
  }

  const nextHead = cur.next;
  cur.next = null; // 断开 nextHead 的前一个节点和 nextHead 的连接
  return nextHead;
}

// 21. 合并两个有序链表（双指针）
// 返回合并后的链表的头节点和尾节点
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
  while (cur.next) {
    cur = cur.next;
  }
  // 循环结束后，cur 是合并后的链表的尾节点
  return [dummy.next, cur];
}

var sortList = function (head) {
  const length = getListLength(head); // 获取链表长度
  const dummy = new ListNode(0, head); // 用哨兵节点简化代码逻辑
  // step 为步长，即参与合并的链表长度
  for (let step = 1; step < length; step *= 2) {
    let newListTail = dummy; // 新链表的末尾
    let cur = dummy.next; // 每轮循环的起始节点
    while (cur) {
      // 从 cur 开始，分割出两段长为 step 的链表，头节点分别为 head1 和 head2
      const head1 = cur;
      const head2 = splitList(head1, step);
      cur = splitList(head2, step); // 下一轮循环的起始节点
      // 合并两段长为 step 的链表
      const [head, tail] = mergeTwoLists(head1, head2);
      // 合并后的头节点 head，插到 newListTail 的后面
      newListTail.next = head;
      newListTail = tail; // tail 现在是新链表的末尾
    }
  }
  return dummy.next;
};

a = new ListNode(4, new ListNode(2, new ListNode(1, new ListNode(3))));
console.log(sortList(a));
