// 电话号码的字母组合
// 输入：digits = "23"
// 输出：["ad","ae","af","bd","be","bf","cd","ce","cf"]

var letterCombinations = function (digits) {
  if (!digits.length) return [];

  const res = [];
  const temp = [];
  const maps = [
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

  function dfs(idx) {
    if (temp.length === digits.length) {
      res.push(temp.join(""));
      return;
    }
    for (v of maps[digits[idx]]) {
      temp.push(v);
      dfs(idx + 1);
      temp.pop();
    }
  }

  dfs(0);
  return res;
};

console.log(letterCombinations("23"));
console.log(letterCombinations("2"));
