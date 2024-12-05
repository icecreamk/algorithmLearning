// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

// 1    2    3
//     abc  def
// 4    5    6
// ghi jkl  mno
// 7    8    9
// pqrs tuv wxyz

// 输入："23"
// 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

// 时间复杂度: O(3^m * 4^n)，其中 m 是对应三个字母的数字个数，n 是对应四个字母的数字个数
// 空间复杂度: O(3^m * 4^n)

var letterCombinations = function (digits) {
  const k = digits.length;
  const map = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];
  if (!k) return [];
  if (k === 1) return map[digits].split("");

  const res = [],
    path = [];
  backtracking(digits, k, 0);
  return res;

  function backtracking(n, k, a) {
    if (path.length === k) {
      res.push(path.join(""));
      return;
    }
    console.log('map[n[a]]', map[n[a]])
    for (const v of map[n[a]]) {
      path.push(v);
      backtracking(n, k, a + 1);
      path.pop();
    }
  }
};


console.log(letterCombinations("23"))