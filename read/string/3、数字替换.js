// 样例输入：a1b2c3

// 样例输出：anumberbnumbercnumber

// 重点：从后往前
// 从前向后填充就是O(n^2)的算法了，因为每次添加元素都要将添加元素之后的所有元素整体向后移动。
// 其实很多数组填充类的问题，其做法都是先预先给数组扩容带填充后的大小，然后在从后向前进行操作。
// 这么做有两个好处：
// 1、不用申请新数组。
// 2、从后向前填充元素，避免了从前向后填充元素时，每次添加元素都要将添加元素之后的所有元素向后移动的问题。

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function main() {
  const num0 = "0".charCodeAt();
  const num9 = "9".charCodeAt();
  const a = "a".charCodeAt();
  const z = "z".charCodeAt();
  function isAZ(str) {
    return str >= a && str <= z;
  }
  function isNumber(str) {
    return str >= num0 && str <= num9;
  }
  rl.on("line", (input) => {
    let n = 0;
    for (let i = 0; i < input.length; i++) {
      const val = input[i].charCodeAt();
      if (isNumber(val)) {
        n += 6;
      }
      if (isAZ(val)) {
        n++;
      }
    }
    const ans = new Array(n).fill(0);
    let index = input.length - 1;
    for (let i = n - 1; i >= 0; i--) {
      const val = input[index].charCodeAt();
      if (isAZ(val)) {
        ans[i] = input[index];
      }
      if (isNumber(val)) {
        ans[i] = "r";
        ans[i - 1] = "e";
        ans[i - 2] = "b";
        ans[i - 3] = "m";
        ans[i - 4] = "u";
        ans[i - 5] = "n";
        i -= 5;
      }
      index--;
    }
    console.log(ans.join(""));
  });
}

main();
