// 先遍历物品，再遍历背包容量
function test_completePack1() {
  let weight = [1, 3, 5];
  let value = [15, 20, 30];
  let bagWeight = 4;
  let dp = new Array(bagWeight + 1).fill(0);
  for (let i = 0; i <= weight.length; i++) {
    for (let j = weight[i]; j <= bagWeight; j++) {
      dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
    }
  }
  console.log(dp);
}

// 先遍历背包容量，再遍历物品
function test_completePack2() {
  let weight = [1, 3, 5];
  let value = [15, 20, 30];
  let bagWeight = 4;
  let dp = new Array(bagWeight + 1).fill(0);
  for (let j = 0; j <= bagWeight; j++) {
    for (let i = 0; i < weight.length; i++) {
      if (j >= weight[i]) {
        dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
      }
    }
  }
  console.log(2, dp);
}
