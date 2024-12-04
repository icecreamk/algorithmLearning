//  (right - left) >> 1 对于‌非负整数来说，确实相当于‌除以2‌。这是因为二进制数的每一位代表的值是前一位的两倍。
// 例如，对于一个二进制数1010（十进制中的10），如果将其右移一位，变为0101，这等于10除以2，结果是5

// （版本一）左闭右闭区间 [left, right]
var search1 = function (nums, target) {
  // right是数组最后一个数的下标，num[right]在查找范围内，是左闭右闭区间
  let mid,
    left = 0,
    right = nums.length - 1;
  // 当left=right时，由于nums[right]在查找范围内，所以要包括此情况
  while (left <= right) {
    // 位运算 + 防止大数溢出
    mid = left + ((right - left) >> 1);
    // 如果中间数大于目标值，要把中间数排除查找范围，所以右边界更新为mid-1；如果右边界更新为mid，那中间数还在下次查找范围内
    if (nums[mid] > target) {
      right = mid - 1; // 去左面闭区间寻找
    } else if (nums[mid] < target) {
      left = mid + 1; // 去右面闭区间寻找
    } else {
      return mid;
    }
  }
  return -1;
};

search1([1], 1);
search1([3,5], 2);



// （版本二）左闭右开区间 [left, right)
var search2 = function (nums, target) {
  // right是数组最后一个数的下标+1，nums[right]不在查找范围内，是左闭右开区间
  let mid,
    left = 0,
    right = nums.length;
  // 当left=right时，由于nums[right]不在查找范围，所以不必包括此情况
  while (left < right) {
    // 位运算 + 防止大数溢出
    mid = left + ((right - left) >> 1);
    console.log("mid", mid, left, right);
    // 如果中间值大于目标值，中间值不应在下次查找的范围内，但中间值的前一个值应在；
    // 由于right本来就不在查找范围内，所以将右边界更新为中间值，如果更新右边界为mid-1则将中间值的前一个值也踢出了下次寻找范围
    if (nums[mid] > target) {
      right = mid; // 去左区间寻找
    } else if (nums[mid] < target) {
      left = mid + 1; // 去右区间寻找
    } else {
      return mid;
    }
  }
  return -1;
};


search2([1], 1);
search2([3, 5], 2);
