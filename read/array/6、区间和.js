// 给定一个整数数组 Array，请计算该数组在每个指定区间内元素的总和。
// 输入描述
// 第一行输入为整数数组 Array 的长度 n，接下来 n 行，每行一个整数，表示数组的元素。随后的输入为需要计算总和的区间，直至文件结束。

// 实例
// 5
// 1
// 2
// 3
// 4
// 5
// 0 1
// 1 3

// 输出：
// 3
// 9

// 暴力执法

// #include <iostream>
// #include <vector>
// using namespace std;
// int main() {
//     int n, a, b;
//     cin >> n;
//     vector<int> vec(n);
//     for (int i = 0; i < n; i++) cin >> vec[i];
//     while (cin >> a >> b) {
//         int sum = 0;
//         // 累加区间 a 到 b 的和
//         for (int i = a; i <= b; i++) sum += vec[i];
//         cout << sum << endl;
//     }
// }

// 来举一个极端的例子，如果我查询m次，每次查询的范围都是从0 到 n - 1
// 那么该算法的时间复杂度是 O(n * m) m 是查询的次数
// 如果查询次数非常大的话，这个时间复杂度也是非常大的。
// 接下来我们来引入前缀和，看看前缀和如何解决这个问题。

// 例如，我们要统计 vec[i] 这个数组上的区间和。
// 我们先做累加，即 p[i] 表示 下标 0 到 i 的 vec[i] 累加 之和。
// 在vec数组上 下标 2 到下标 5 之间的累加和，那是不是就用 p[5] - p[1] 就可以了。
// 而 p 数组是我们之前就计算好的累加和，所以后面每次求区间和的之后 我们只需要 O(1) 的操作。

// 特别注意： 在使用前缀和求解的时候，要特别注意 求解区间。
// 如上图，如果我们要求 区间下标 [2, 5] 的区间和，那么应该是 p[5] - p[1]，而不是 p[5] - p[2]。
// 在使用前缀和的时候，分不清前缀和的区间，建议画一画图，模拟一下 思路会更清晰。

function prefixSum() {
  const readline = require("readline");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let inputLines = [];
  rl.on("line", (line) => {
    inputLines.push(line.trim());
  });

  rl.on("close", () => {
    // 读取项数 n
    const n = parseInt(inputLines[0]);

    // 使用前缀和，复杂度控制在 O(1)
    let sum = new Array(n);
    sum[0] = parseInt(inputLines[1]);

    // 计算前缀和数组
    for (let i = 1; i < n; i++) {
      let value = parseInt(inputLines[i + 1]);
      sum[i] = sum[i - 1] + value;
    }

    // 处理区间和查询
    for (let i = n + 1; i < inputLines.length; i++) {
      let [left, right] = inputLines[i].split(" ").map(Number);
      if (left === 0) {
        console.log(sum[right]);
      } else {
        console.log(sum[right] - sum[left - 1]);
      }
    }
  });
}
