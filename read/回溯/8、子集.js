// 给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。
// 说明：解集不能包含重复的子集。
// 示例: 输入: nums = [1,2,3] 输出: [ [3],   [1],   [2],   [1,2,3],   [1,3],   [2,3],   [1,2],   [] ]

// 求子集问题和77.组合 和131.分割回文串又不一样了。
// 如果把 子集问题、组合问题、分割问题都抽象为一棵树的话，那么组合问题和分割问题都是收集树的叶子节点，而子集问题是找树的所有节点！
// 其实子集也是一种组合问题，因为它的集合是无序的，子集{1,2} 和 子集{2,1}是一样的。

// 既然是无序，取过的元素不会重复取，写回溯算法的时候，for就要从startIndex开始，而不是从0开始！
// 求排列问题的时候，就要从0开始，因为集合是有序的，{1, 2} 和{2, 1}是两个集合，排列问题我们后续的文章就会讲到的。

// 时间复杂度: O(n * 2^n)
// 空间复杂度: O(n)

// 其实可以不需要加终止条件，因为startIndex >= nums.size()，本层for循环本来也结束了，本来我们就要遍历整棵树。
// 因为要遍历整棵树，所以不写终止条件，那么会不会无限递归？
// 并不会，因为每次递归的下一层就是从i+1开始的。

// 如果要写终止条件，注意：result.push_back(path);要放在终止条件的上面，如下
// result.push_back(path); // 收集子集，要放在终止添加的上面，否则会漏掉自己
// if (startIndex >= nums.size()) { // 终止条件可以不加
//   return;
// }

var subsets = function (nums) {
  let result = [];
  let path = [];
  function backtracking(startIndex) {
    result.push([...path]);
    for (let i = startIndex; i < nums.length; i++) {
      path.push(nums[i]);
      backtracking(i + 1);
      path.pop();
    }
  }
  backtracking(0);
  return result;
};
