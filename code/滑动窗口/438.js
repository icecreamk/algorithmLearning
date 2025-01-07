// 找到字符串中所有字母异位词

// 定长
var findAnagrams = function (s, p) {
  const cntP = new Array(26).fill(0);
  const cntS = new Array(26).fill(0);
  const startCode = "a".charCodeAt();
  const pLen = p.length;
  const res = [];
  for (const c of p) {
    cntP[c.charCodeAt() - startCode]++;
  }

  for (let left = (right = 0); right < s.length; right++) {
    cntS[s[right].charCodeAt() - startCode]++;

    if (right - pLen + 1 < 0) {
      continue;
    }

    if (cntP.join("") === cntS.join("")) {
      res.push(left);
    }

    cntS[s[left].charCodeAt() - startCode]--;
    left++;
  }
  return res;
};

console.log(findAnagrams("abdb", "ab"));

// // 不定长窗口
// var findAnagrams1 = function (s, p) {
//   const ans = [];
//   const cnt = new Array(26).fill(0); // 统计 p 的每种字母的出现次数
//   for (const c of p) {
//     cnt[c.charCodeAt() - "a".charCodeAt()]++;
//   }
//   let left = 0;
//   console.log(cnt)
//   for (let right = 0; right < s.length; right++) {
//     const c = s[right].charCodeAt() - "a".charCodeAt();
//     cnt[c]--; // 右端点字母进入窗口
//     while (cnt[c] < 0) {
//       // 字母 c 太多了
//       cnt[s[left].charCodeAt() - "a".charCodeAt()]++; // 左端点字母离开窗口
//       left++;
//     }
//     if (right - left + 1 === p.length) {
//       // s' 和 p 的每种字母的出现次数都相同
//       ans.push(left); // s' 左端点下标加入答案
//     }
//   }
//   return ans;
// };
