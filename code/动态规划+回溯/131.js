// 回溯
// var partition = function (s) {
//   const res = [];

//   function dfs(temp, start) {
//     if (start == s.length) {
//       res.push(temp.slice());
//       return;
//     }
//     for (let i = start; i < s.length; i++) {
//       console.log(start, i);
//       if (isPali(s, start, i)) {
//         temp.push(s.substring(start, i + 1));
//         dfs(temp, i + 1);
//         temp.pop();
//       }
//     }
//   }
//   dfs([], 0);
//   return res;
// };

// function isPali(s, l, r) {
//   while (l < r) {
//     if (s[l] != s[r]) {
//       return false;
//     }
//     l++;
//     r--;
//   }
//   return true;
// }
// console.log(partition("abcd"));

// 记忆
var partition = function (s) {
  const res = [];
  const memo = new Array(s.length);
  for (let i = 0; i < memo.length; i++) {
    memo[i] = new Array(s.length);
  }

  console.log(JSON.parse(JSON.stringify(memo)));

  function dfs(temp, start) {
    if (start == s.length) {
      res.push(temp.slice());
      return;
    }
    for (let i = start; i < s.length; i++) {
      if (memo[start][i] === false) {
        continue;
      }

      if (memo[start][i] || isPali(s, start, i, memo)) {
        temp.push(s.substring(start, i + 1));
        dfs(temp, i + 1);
        temp.pop();
      }
    }
  }
  dfs([], 0);
  return res;
};

function isPali(s, l, r, memo) {
  while (l < r) {
    if (s[l] != s[r]) {
      memo[l][r] = false;
      return false;
    }
    l++;
    r--;
  }
  memo[l][r] = true;
  return true;
}
console.log(partition("abcccba"));

//                                      abcd
//             a|bcd                    ab|cd         abc|d   abcd
//          /       \
//     a|b|cd     a|b|cd|(5)  a|bc|d      ab|c|d| ab|cd|  abc|d|   abcd|
//   a|b|c|d                  /     \
// a|b|c|d|(1-4)         a|bc|d|(6) a|bcd|(7)

//             aab
//      a|ab   aa|b    aab
//   a|a|b

// 01 12 23 34 24 13 34 14 02 23 34 24 03 34 04

// 结合dp
// function partition(s) {
//   const dp = Array.from(Array(s.length), () => Array(s.length).fill(false));
//   const res = [];

//   for (let j = 0; j < s.length; j++) {
//     for (let i = 0; i <= j; i++) {
//       if (i === j) {
//         dp[i][j] = true;
//       } else if (j - i < 2 && s[i] === s[j]) {
//         dp[i][j] = true;
//       } else if (dp[i + 1][j - 1] && s[i] === s[j]) {
//         dp[i][j] = true;
//       }
//     }
//   }

//   function dfs(temp, start) {
//     if (start === s.length) {
//       res.push(temp.slice());
//       return;
//     }
//     for (let i = start; i < s.length; i++) {
//       if (dp[start][i]) {
//         const val = s.substring(start, i + 1);
//         temp.push(val);
//         console.log(
//           "pushpushpushpushpush",
//           start,
//           i + 1,
//           JSON.parse(JSON.stringify(temp))
//         );
//         dfs(temp, i + 1);
//         temp.pop();
//       }
//     }
//   }

//   dfs([], 0);
//   return res;
// }

// console.log(partition("abcd"));
