// 双指针法
// 时间复杂度: O(n)
// 空间复杂度: O(1)
var reverseList1 = function(head) {
    if(!head || !head.next) return head;
    let temp = null, pre = null, cur = head;
    while(cur) {
        temp = cur.next;
        cur.next = pre;
        pre = cur;
        cur = temp;
    }
    // temp = cur = null;
    return pre;
};


// 试下我这个行不行？
// pre = null
// cur = head
// temp = cur.next
// while (temp) {
//     cur.next = pre
//     pre = cur
//     cur = temp
//     temp = temp.next
// }

// return pre


// 递归法相对抽象一些，但是其实和双指针法是一样的逻辑，同样是当cur为空的时候循环结束，不断将cur指向pre的过程。
// 时间复杂度: O(n), 要递归处理链表的每个节点
// 空间复杂度: O(n), 递归调用了 n 层栈空间


// 递归1：
var reverse1 = function(pre, head) {
    if(!head) return pre;
    const temp = head.next;
    head.next = pre;
    pre = head
    return reverse1(pre, temp);
}

var reverseList1 = function(head) {
    return reverse1(null, head);
};

// 递归2
var reverse2 = function(head) {
    if(!head || !head.next) return head;
    // 从后往前翻
    const pre = reverse2(head.next);
    head.next = pre.next;
    pre.next = head;
    return head;
}

var reverseList2 = function(head) {
    let cur = head;
    while(cur && cur.next) {
        cur = cur.next;
    }
    reverse2(head);
    return cur;
};