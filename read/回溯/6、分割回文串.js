// 给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。
// 返回 s 所有可能的分割方案。
// 示例: 输入: "aab" 输出: [ ["aa","b"], ["a","a","b"]

// 1、切割问题，有不同的切割方式
// 2、判断回文

// 这种题目，想用for循环暴力解法，可能都不那么容易写出来，所以要换一种暴力的方式，就是回溯。
// 我们来分析一下切割，其实切割问题类似组合问题。

// 例如对于字符串abcdef：
// 组合问题：选取一个a之后，在bcdef中再去选取第二个，选取b之后在cdef中再选取第三个.....。
// 切割问题：切割一个a之后，在bcdef中再去切割第二段，切割b之后在cdef中再切割第三段.....。

const isPalindrome = (s, l, r) => {
  for (let i = l, j = r; i < j; i++, j--) {
    if (s[i] !== s[j]) return false;
  }
  return true;
};

var partition = function (s) {
  const res = [],
    path = [],
    len = s.length;
  backtracking(0);
  return res;
  function backtracking(startIndex) {
    if (startIndex >= len) {
      res.push(Array.from(path));
      return;
    }
    // console.log(path, startIndex);
    for (let i = startIndex; i < len; i++) {
      if (!isPalindrome(s, startIndex, i)) continue;
      console.log(startIndex, i,  s.slice(startIndex, i + 1))
      path.push(s.slice(startIndex, i + 1));
      backtracking(i + 1);
      path.pop();
    }
  }
};

console.log(partition("aaabb"));
