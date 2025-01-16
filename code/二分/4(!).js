// 数学法
var findMedianSortedArrays = function (a, b) {
  if (a.length > b.length) {
    [a, b] = [b, a]; // 保证下面的 i 可以从 0 开始枚举
  }

  const m = a.length,
    n = b.length;
  a = [-Infinity, ...a, Infinity];
  b = [-Infinity, ...b, Infinity];

  // 枚举 nums1 有 i 个数在第一组
  // 那么 nums2 有 (m + n + 1) / 2 - i 个数在第一组
  let i = 0,
    j = Math.floor((m + n + 1) / 2);
  while (true) {
    if (a[i] <= b[j + 1] && a[i + 1] > b[j]) {
      // 写 >= 也可以
      const max1 = Math.max(a[i], b[j]); // 第一组的最大值
      const min2 = Math.min(a[i + 1], b[j + 1]); // 第二组的最小值
      return (m + n) % 2 ? max1 : (max1 + min2) / 2;
    }
    i++; // 继续枚举
    j--;
  }
};
// 时间复杂度：O(m+n)，其中 m 是 a 的长度，n 是 b 的长度。往 a 前面插入一个元素的时间复杂度是 O(m)，往 b 前面插入一个元素的时间复杂度是 O(n)，加起来是 O(m+n)。
// 空间复杂度：O(m+n)。

// 优化二分
var findMedianSortedArrays = function (a, b) {
  if (a.length > b.length) {
    [a, b] = [b, a];
  }

  const m = a.length,
    n = b.length;
  a = [-Infinity, ...a, Infinity];
  b = [-Infinity, ...b, Infinity];

  // 循环不变量：a[left] <= b[j+1]
  // 循环不变量：a[right] > b[j+1]
  let left = 0,
    right = m + 1;
  while (left + 1 < right) {
    // 开区间 (left, right) 不为空
    const i = Math.floor((left + right) / 2);
    const j = Math.floor((m + n + 1) / 2) - i;
    if (a[i] <= b[j + 1]) {
      left = i; // 缩小二分区间为 (i, right)
    } else {
      right = i; // 缩小二分区间为 (left, i)
    }
  }

  // 此时 left 等于 right-1
  // a[left] <= b[j+1] 且 a[right] > b[j'+1] = b[j]，所以答案是 i=left
  const i = left;
  const j = Math.floor((m + n + 1) / 2) - i;
  const max1 = Math.max(a[i], b[j]);
  const min2 = Math.min(a[i + 1], b[j + 1]);
  return (m + n) % 2 ? max1 : (max1 + min2) / 2;
};

// 时间复杂度：O(logmin(m,n))，其中 m 是 a 的长度，n 是 b 的长度。注：这个复杂度比题目所要求的 O(log(m+n)) 更优。
// 空间复杂度：O(1)。

// 分段
var findMedianSortedArrays = (nums1, nums2) => {
  let len1 = nums1.length,
    len2 = nums2.length;
  if (len1 > len2) return findMedianSortedArrays(nums2, nums1);
  let len = len1 + len2;
  let start = 0,
    end = len1;
  let partLen1, partLen2;

  while (start <= end) {
    partLen1 = (start + end) >> 1;
    partLen2 = ((len + 1) >> 1) - partLen1;

    let L1 = partLen1 === 0 ? -Infinity : nums1[partLen1 - 1];
    let L2 = partLen2 === 0 ? -Infinity : nums2[partLen2 - 1];
    let R1 = partLen1 === len1 ? Infinity : nums1[partLen1];
    let R2 = partLen2 === len2 ? Infinity : nums2[partLen2];
    console.log(start, end);
    console.log(L1, R1, L2, R2);
    if (L1 > R2) {
      end = partLen1 - 1; // mid太大了，往左边找
    } else if (L2 > R1) {
      start = partLen1 + 1; // mid不够大， 往右边找
    } else {
      // L1 <= R2 && L2 <= R1
      // 什么时候才是想要的？要满足 L1 <= R2 && L2 <= R1
      // 为什么？因为根据有序性，L1 是必定小于 L2，R1 是必定小于 R2 ，
      // L1 和 L2 是处于合并后数组的左边的，它必然小于右侧的 R2 和 R1

      return len % 2 === 0
        ? (Math.max(L1, L2) + Math.min(R1, R2)) / 2
        : Math.max(L1, L2);
    }
  }
};

// 4+6=10

// 2 3 9 10
// 1 4 8 11 12 13

console.log(
  findMedianSortedArrays(
    [1, 2, 8, 11]
    [3, 4, 5, 9, 10],
  )
);
