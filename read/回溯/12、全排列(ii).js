// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

// 示例 1：
//     输入：nums = [1,1,2]
//     输出： [[1,1,2], [1,2,1], [2,1,1]]
// 示例 2：
//     输入：nums = [1,2,3]
//     输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// 提示：
//     1 <= nums.length <= 8
//     -10 <= nums[i] <= 10


// 大家发现，去重最为关键的代码为：
// if (i > 0 && nums[i] == nums[i - 1] && used[i - 1] == false) {
//     continue;
// }

// 如果改成 used[i - 1] == true， 也是正确的!，去重代码如下：

// if (i > 0 && nums[i] == nums[i - 1] && used[i - 1] == true) {
//     continue;
// }

// 这是为什么呢，就是上面我刚说的，如果要对树层中前一位去重，就用used[i - 1] == false，如果要对树枝前一位去重用used[i - 1] == true。
// 对于排列问题，树层上去重和树枝上去重，都是可以的，但是树层上去重效率更高！

var permuteUnique = function (nums) {
  nums.sort((a, b) => {
    return a - b;
  });
  let result = [];
  let path = [];

  function backtracing(used) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
        continue;
      }
      if (!used[i]) {
        used[i] = true;
        path.push(nums[i]);
        backtracing(used);
        path.pop();
        used[i] = false;
      }
    }
  }
  backtracing([]);
  return result;
};
