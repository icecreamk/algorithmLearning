// abcdefg 2
// 0123456


// 第一步
// ba gfedc
// 第二步
// cdefg ab

// 给定一个字符串 s 和一个正整数 k，请编写一个函数，
// 将字符串中的后面 k 个字符移到字符串的前面，实现字符串的右旋转操作


// 思路：
// 转整串，然后转前一串和后一串
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const inputs = []; // 存储输入

rl.on("line", function (data) {
  inputs.push(data);
}).on("close", function () {
  const res = deal(inputs);
  // 打印结果
  console.log(res);
});

// 对传入的数据进行处理
function deal(inputs) {
  let [k, s] = inputs;
  const len = s.length - 1;
  k = parseInt(k);
  str = s.split("");

  str = reverseStr(str, 0, len - k);
  str = reverseStr(str, len - k + 1, len);
  str = reverseStr(str, 0, len);

  return str.join("");
}

// 根据提供的范围进行翻转
function reverseStr(s, start, end) {
  while (start < end) {
    [s[start], s[end]] = [s[end], s[start]];

    start++;
    end--;
  }

  return s;
}
