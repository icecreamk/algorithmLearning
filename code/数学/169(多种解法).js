// 169. 多数元素
// 给定一个大小为 n 的数组 nums ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。

// 示例 1：
// 输入：nums = [3,2,3]
// 输出：3

// 示例 2：
// 输入：nums = [2,2,1,1,1,2,2]
// 输出：2

/**
 * @param {number[]} nums
 * @return {number}
 */

// 排序
// O(nlogn)
// O(logn) 排序需要logn的空间
var majorityElement = function (nums) {
  nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 哈希
// O(n)
// O(n)
var majorityElement = function (nums) {
  let half = nums.length / 2;
  let map = new Map();

  for (let num of nums) {
    if (map.has(num)) {
      let currNum = map.get(num);
      map.set(num, currNum + 1);
    } else {
      map.set(num, 1);
    }

    if (map.get(num) > half) return num;
  }
  return -1;
};

// 摩尔投票法

// 维护一个候选众数 candidate 和它出现的次数 count，初始时 candidate 可以为任意值，count 为 0;
// a.遍历数组 nums 中的所有元素，对于每个元素 x，在判断 x 之前，如果 count 的值为 0，先将 x 的值赋予b.candidate，随后判断 x:
// i. 如果 x与 candidate 相等，那么计数器 count 的值增加 1;ii. 如果 x与 candidate 不等，那么计数器 count 的值减少 1，
// 当减少为 0 时，将下一个数赋予 candidate;在遍历完成后，candidate 即为整个数组的众数;
// O(n)
// O(1)

/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = (nums) => {
  let count = 1;
  // 将第一个数赋予 majority
  let majority = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (count === 0) {
      majority = nums[i];
    }

    if (nums[i] === majority) {
      count++;
    } else {
      count--;
    }
  }

  return majority;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
// 分治

// 使用经典的分治算法递归求解，直到所有的子问题都是长度为1的数组;
// 长度为1的子数组中唯一的数显然是众数，直接返回即可;
// i. 如果回溯后某区间的长度大于 1，必须将左右子区间的值合并;
// ii. 如果它们的众数相同，那么显然这一段区间的众数是它们相同的值;
// 否则，需要比较两个众数在整个区间内出现的次数来决定该区间的众数;iii.

// O(nlogn)
// O(logn) // 递归过程中用到的栈空间
var majorityElement = function (nums) {
  const getMode = (low, high) => {
    if (low === high) return nums[low];

    //拆分成更小的区间，一分为二
    let mid = Math.floor((low + high) / 2);

    let left = getMode(low, mid);
    let right = getMode(mid + 1, high);

    console.log('midL', low, mid, left);
    console.log('midR', mid + 1, high, right);
    if (left === right) return left;

    let leftCount = getCount(left, low, high); // 统计区间内 left 的个数
    let rightCount = getCount(right, low, high); // 统计区间内 right 的个数
    // console.log('leftCount', leftCount, rightCount);
    return leftCount > rightCount ? left : right; // 返回 left 和 right 中个数多的那个
  };

  //统计 low 到 high 之间 num 的数量
  var getCount = (num, low, high) => {
    // console.log('low', low, high)
    let count = 0;
    for (let i = low; i <= high; i++) {
      if (nums[i] === num) count++;
    }
    return count;
  };

  return getMode(0, nums.length - 1);
};

console.log(majorityElement([2, 4, 4, 5, 4, 3, 4]));
