// 和为k的子数组
// 示例 1：

// 输入：nums = [1,1,1], k = 2
// 输出：2
// 示例 2：

// 输入：nums = [1,2,3], k = 3
// 输出：2

const subarraySum = (nums, k) => {
  const map = { 0: 1 };
  let prefixSum = 0;
  let count = 0;

  //   如果 map 中存在 key 为「当前前缀和 - k」，说明这个之前出现的前缀和
  //   满足「当前前缀和 - 该前缀和 == k」，它出现的次数，累加给 count。

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    if (map[prefixSum - k]) {
      count += map[prefixSum - k];
    }
    if (map[prefixSum]) {
      map[prefixSum]++;
    } else {
      map[prefixSum] = 1;
    }
    console.log(map, count);
  }
  return count;
};

console.log(subarraySum([1, 2, 3], 5));
