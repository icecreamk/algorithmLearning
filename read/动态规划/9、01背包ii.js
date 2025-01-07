let m = 3;
  let n = 4;
  let costs = [1, 3, 4];
  let value = [15, 20, 30];

  let dp = Array(n + 1).fill(0);
  console.log(dp, ...dp)
  dp[0] = 0;

  for (let i = 0; i < m; i++) {
    for (let j = n; j >= costs[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - costs[i]] + value[i]);
    }
  }

  console.log("mmax", dp, dp[n]);