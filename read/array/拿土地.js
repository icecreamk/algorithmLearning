// 在一个城市区域内，被划分成了n * m个连续的区块，每个区块都拥有不同的权值，代表着其土地价值。目前，有两家开发公司，A 公司和 B 公司，希望购买这个城市区域的土地。
// 现在，需要将这个城市区域的所有区块分配给 A 公司和 B 公司。
// 然而，由于城市规划的限制，只允许将区域按横向或纵向划分成两个子区域，而且每个子区域都必须包含一个或多个区块。
// 为了确保公平竞争，你需要找到一种分配方式，使得 A 公司和 B 公司各自的子区域内的土地总价值之差最小。
// 注意：区块不可再分。
// 【输入描述】
// 第一行输入两个正整数，代表 n 和 m。
// 接下来的 n 行，每行输出 m 个正整数。
// 输出描述
// 请输出一个整数，代表两个子区域内土地总价值之间的最小差距。
// 【输入示例】
// 3 3 1 2 3 2 1 3 1 2 3
// 【输出示例】
// 0
// 【提示信息】
// 如果将区域按照如下方式划分：
// 1 2 | 3 2 1 | 3 1 2 | 3
// 两个子区域内土地总价值之间的最小差距可以达到 0。


// 暴力求解，应该是 n^3 的时间复杂度，
// 一个 for 枚举分割线， 嵌套 两个for 去累加区间里的和。
// 如果本题要求 任何两个行（或者列）之间的数值总和，大家在0058.区间和 的基础上 应该知道怎么求。
// 就是前缀和的思路，先统计好，前n行的和 q[n]，如果要求矩阵 a行 到 b行 之间的总和，那么就 q[b] - q[a - 1]就好。
// 至于为什么是 a - 1，大家去看 0058.区间和 的分析，使用 前缀和 要注意 区间左右边的开闭情况。


// 使用 前缀和的思路来求解，先将 行方向，和 列方向的和求出来，这样可以方便知道 划分的两个区间的和。
// O(N^2)
function minDifference(n, m, grid) {
  let totalSum = 0;
  let horizontalSums = new Array(n).fill(0);
  let verticalSums = new Array(m).fill(0);

  // 计算总和以及每一行和每一列的和
  for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
          totalSum += grid[i][j];
          horizontalSums[i] += grid[i][j];
          verticalSums[j] += grid[i][j];
      }
  }

  let result = Infinity;

  // 横向切割
  let horizontalCut = 0;
  for (let i = 0; i < n - 1; i++) {
      horizontalCut += horizontalSums[i];
      // 总结一下，使用 2 * verticalCut 的原因是：
      // verticalCut 表示左侧子区域的总和。
      // totalSum - verticalCut 表示右侧子区域的总和。
      // 两者之差为 |totalSum - 2 * verticalCut|，这是我们想要最小化的值。
      result = Math.min(result, Math.abs(totalSum - 2 * horizontalCut));
  }

  // 纵向切割
  let verticalCut = 0;
  for (let j = 0; j < m - 1; j++) {
      verticalCut += verticalSums[j];
      result = Math.min(result, Math.abs(totalSum - 2 * verticalCut));
  }

  return result;
}

// 示例输入
const n = 3;
const m = 3;
const grid = [
  [1, 2, 3],
  [2, 1, 3],
  [1, 2, 3]
];

console.log(minDifference(n, m, grid)); // 输出: 0


// 不用前缀和了，在行向遍历的时候，遇到行末尾就统一一下， 在列向遍历的时候，遇到列末尾就统计一下。
// 时间复杂度也是 O(n^2)

// import java.util.Scanner;

// public class Main {
//     public static void main(String[] args) {
//         Scanner scanner = new Scanner(System.in);
//         int n = scanner.nextInt();
//         int m = scanner.nextInt();
//         int sum = 0;
//         int[][] vec = new int[n][m];
//         for (int i = 0; i < n; i++) {
//             for (int j = 0; j < m; j++) {
//                 vec[i][j] = scanner.nextInt();
//                 sum += vec[i][j];
//             }
//         }

//         int result = Integer.MAX_VALUE;
//         int count = 0; // 统计遍历过的行

//         // 行切分
//         for (int i = 0; i < n; i++) {
//             for (int j = 0; j < m; j++) {
//                 count += vec[i][j];
//                 // 遍历到行末尾时候开始统计
//                 if (j == m - 1) {
//                     result = Math.min(result, Math.abs(sum - 2 * count));
//                 }
//             }
//         }

//         count = 0;
//         // 列切分
//         for (int j = 0; j < m; j++) {
//             for (int i = 0; i < n; i++) {
//                 count += vec[i][j];
//                 // 遍历到列末尾时候开始统计
//                 if (i == n - 1) {
//                     result = Math.min(result, Math.abs(sum - 2 * count));
//                 }
//             }
//         }

//         System.out.println(result);
//         scanner.close();
//     }
// }
