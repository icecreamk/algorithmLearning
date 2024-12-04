// 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并原地修改输入数组。

// 暴力执法，一层循环遍历，第二层循环找到要删除的位置，然后把后面的元素往前移动。复杂度O(n^2)

// 快慢指针
// 快指针：寻找新数组的元素 ，新数组就是不含有目标元素的数组
// 慢指针：指向更新 新数组下标的位置

//时间复杂度：O(n)
//空间复杂度：O(1)
var removeElement = (nums, val) => {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != val) {
      nums[k++] = nums[i];
    }
  }
  nums.length = k
  return k;
};

a = [1,2,3,4,2]
len = removeElement(a, 2)
console.log(a, len)

