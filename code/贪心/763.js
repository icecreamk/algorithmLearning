// 划分字母区间

/**
 * @param {string} s
 * @return {number[]}
 */
var partitionLabels = function (s) {
  if (!s.length) return [];
  const memo = new Map();
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (memo.has(c)) {
      const v = memo.get(c);
      memo.set(c, [v[0], i]);
    } else {
      memo.set(c, [i, i]);
    }
  }

  const res = [];
  const stack = [];
  for (const [, v] of memo) {
    if (stack.length) {
      const last = stack[stack.length - 1];
      if (v[0] < last[1]) {
        stack[stack.length - 1][1] = Math.max(last[1], v[1]);
        continue;
      }
      stack.push(v);
    } else {
      stack.push(v);
    }
  }
  //   console.log(stack, memo);
  for (let j = 0; j < stack.length; j++) {
    const e = stack[j];
    res.push(e[1] - e[0] + 1);
  }
  return res;
};

/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = (S) => {
  const maxPos = {};
  for (let i = 0; i < S.length; i++) {
    // 存放字母与它的最远位置
    maxPos[S[i]] = i;
  }

  const res = [];
  let start = 0; // 待切割的起始位置
  let scannedCharMaxPos = 0; // 已扫描的字符中最远的位置

  for (let i = 0; i < S.length; i++) {
    const curCharMaxPos = maxPos[S[i]]; // 当前扫描的字符的最远位置
    scannedCharMaxPos = Math.max(scannedCharMaxPos, curCharMaxPos); // 更新「已扫描的字符中最远的位置」
    if (i == scannedCharMaxPos) {
      // 正好扫描到「已扫描的字符的最远位置」，到达切割点
      res.push(i - start + 1);
      start = i + 1; // 更新，下一个待切割的字符串的起始位置
    }
  }
  return res;
};

console.log(partitionLabels("ababcbacadefegdehijhklij"));
