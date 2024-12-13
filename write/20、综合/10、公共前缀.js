const strs = ["flower", "flow", "flight"];
// fl

const longestCommonPrefix = function (strs) {
  let res = "";
  for (let i = 0; i < strs[0].length; i++) {
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== strs[0][i]) {
        return res;
      }
    }
    res += strs[0][i];
  }
};

const longestCommonPrefix1 = function (strs) {
  let index = 0;

  while (index < strs[0].length) {
    for (let i = 1; i < strs.length; i++) {
      if (strs[i - 1][index] !== strs[i][index]) {
        return strs[0].slice(0, index)
      }
    }
    index++;
  }
};

console.log(longestCommonPrefix(strs));
console.log(longestCommonPrefix1(strs));
