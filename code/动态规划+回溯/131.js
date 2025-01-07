//                                      abcd
//             a|bcd                    ab|cd         abc|d   abcd
//        /       \     
//     a|b|cd     a|b|cd|  a|bc|d| a|bcd|       ab|c|d| ab|cd|  abc|d|   abcd|
//   a|b|cd|
// a|b|c|d|

//             aab
//      a|ab   aa|b    aab
//   a|a|b

// 01 12 23 34 24 13 34 14 02 23 34 24 03 34 04

function dfs(temp, start) {
  if (start === s.length) {
    return;
  }

  for (let i = start; i < s.length; i++) {
    const val = s.substring(start, i + 1);
    temp.push(val);
    dfs(temp, i + 1);
    temp.pop();
  }
}

dfs([], start);

function partition(s) {
  const dp = Array.from(Array(s.length), () => Array(s.length).fill(false));
  const res = [];

  for (let j = 0; j < s.length; j++) {
    for (let i = 0; i <= j; i++) {
      if (i === j) {
        dp[i][j] = true;
      } else if (j - i < 2 && s[i] === s[j]) {
        dp[i][j] = true;
      } else if (dp[i + 1][j - 1] && s[i] === s[j]) {
        dp[i][j] = true;
      }
    }
  }

  function dfs(temp, start) {
    if (start === s.length) {
      res.push(temp.slice());
      return;
    }
    for (let i = start; i < s.length; i++) {
      const val = s.substring(start, i + 1);
      temp.push(val);
      console.log(
        "pushpushpushpushpush",
        start,
        i + 1,
        JSON.parse(JSON.stringify(temp))
      );
      dfs(temp, i + 1);
      temp.pop();
      if (dp[start][i]) {
      }
    }
  }

  dfs([], 0);
  return res;
}

console.log(partition("abcd"));
