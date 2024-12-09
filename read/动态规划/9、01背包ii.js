const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

readline.on("line", (line) => {
  input.push(line);
});

readline.on("close", () => {
  let [n, bagweight] = input[0].split(" ").map(Number);
  let weight = input[1].split(" ").map(Number);
  let value = input[2].split(" ").map(Number);

  let dp = Array.from({ length: n }, () => Array(bagweight + 1).fill(0));

  for (let j = weight[0]; j <= bagweight; j++) {
    dp[0][j] = value[0];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 0; j <= bagweight; j++) {
      if (j < weight[i]) {
        dp[i][j] = dp[i - 1][j];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i - 1][j - weight[i]] + value[i]);
      }
    }
  }

  console.log(dp[n - 1][bagweight]);
});
