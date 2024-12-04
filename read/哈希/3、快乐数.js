// 编写一个算法来判断一个数 n 是不是快乐数。
// 「快乐数」定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。如果 可以变为  1，那么这个数就是快乐数。
// 如果 n 是快乐数就返回 True ；不是，则返回 False 。
// 示例：
// 输入：19
// 输出：true
// 解释：
// 1^2 + 9^2 = 82
// 8^2 + 2^2 = 68
// 6^2 + 8^2 = 100
// 1^2 + 0^2 + 0^2 = 1

// 这道题目看上去貌似一道数学问题，其实并不是！
// 题目中说了会 无限循环，那么也就是说求和的过程中，sum会重复出现，这对解题很重要！
// 正如：关于哈希表，当我们遇到了要快速判断一个元素是否出现集合里的时候，就要考虑哈希法了。
// 所以这道题目使用哈希法，来判断这个sum是否重复出现，如果重复了就是return false， 否则一直找到sum为1为止。
// 判断sum是否重复出现就可以使用unordered_set。
// 还有一个难点就是求和的过程，如果对取数值各个位上的单数操作不熟悉的话，做这道题也会比较艰难。

// 时间复杂度: O(logn)
// 空间复杂度: O(logn)

var isHappy = function (n) {
  let m = new Map();
  const getSum = (num) => {
    let sum = 0;
    while (n) {
      sum += (n % 10) ** 2;
      n = Math.floor(n / 10);
    }
    return sum;
  };

  while (true) {
    // n出现过，证明已陷入无限循环
    if (m.has(n)) return false;
    if (n === 1) return true;
    m.set(n, 1);
    n = getSum(n);
  }
};

// 方法二：使用环形链表的思想 说明出现闭环 退出循环( 这个方法也能称之为快慢指针)
var isHappy = function (n) {
  if (getN(n) == 1) return true;
  let a = getN(n),
    b = getN(getN(n));
  // 如果 a === b
  while (b !== 1 && getN(b) !== 1 && a !== b) {
    a = getN(a);
    b = getN(getN(b));
  }
  return b === 1 || getN(b) === 1;
};

// 方法三：使用Set()更简洁
/**
 * @param {number} n
 * @return {boolean}
 */

var getSum = function (n) {
  let sum = 0;
  while (n) {
    sum += (n % 10) ** 2;
    n = Math.floor(n / 10);
  }
  return sum;
};
var isHappy = function (n) {
  let set = new Set(); // Set() 里的数是惟一的
  // 如果在循环中某个值重复出现，说明此时陷入死循环，也就说明这个值不是快乐数
  while (n !== 1 && !set.has(n)) {
    set.add(n);
    n = getSum(n);
  }
  return n === 1;
};

// 方法四：使用Set()，求和用reduce
var isHappy = function (n) {
  let set = new Set();
  let totalCount;
  while (totalCount !== 1) {
    let arr = ("" + (totalCount || n)).split("");
    totalCount = arr.reduce((total, num) => {
      return total + num * num;
    }, 0);
    if (set.has(totalCount)) {
      return false;
    }
    set.add(totalCount);
  }
  return true;
};
