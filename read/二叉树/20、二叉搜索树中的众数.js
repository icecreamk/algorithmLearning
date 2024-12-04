// 给定一个有相同值的二叉搜索树（BST），找出 BST 中的所有众数（出现频率最高的元素）。
// 假定 BST 有如下定义：
//     结点左子树中所含结点的值小于等于当前结点的值
//     结点右子树中所含结点的值大于等于当前结点的值
//     左子树和右子树都是二叉搜索树

// 例如：
// 给定 BST [1,null,2,2],
// 返回[2].

// 提示：如果众数超过1个，不需考虑输出顺序
// 进阶：你可以不使用额外的空间吗？（假设由递归产生的隐式调用栈的开销不被计算在内）

// 递归法
// 如果不是二叉搜索树
// 如果不是二叉搜索树，最直观的方法一定是把这个树都遍历了，用map统计频率，把频率排个序，最后取前面高频的元素的集合。
// 具体步骤如下：
//     这个树都遍历了，用map统计频率
//     把统计的出来的出现频率（即map中的value）排个序
//     取前面高频的元素

// 是二叉搜索树
// 既然是搜索树，它中序遍历就是有序的。
// 我们就使用了pre指针和cur指针的技巧，这次又用上了。
// 弄一个指针指向前一个节点，这样每次cur（当前节点）才能和pre（前一个节点）作比较。

// 此时又有问题了，因为要求最大频率的元素集合（注意是集合，不是一个元素，可以有多个众数），如果是数组上大家一般怎么办？
// 应该是先遍历一遍数组，找出最大频率（maxCount），然后再重新遍历一遍数组把出现频率为maxCount的元素放进集合。（因为众数有多个）
// 这种方式遍历了两遍数组

// 但这里其实只需要遍历一次就可以找到所有的众数。
// 那么如何只遍历一遍呢？
// 如果 频率count 等于 maxCount（最大频率），当然要把这个元素加入到结果集中（以下代码为result数组），代码如下：
// if (count == maxCount) { // 如果和最大值相同，放进result中
//   result.push_back(cur->val);
// }

// 是不是感觉这里有问题，result怎么能轻易就把元素放进去了呢，万一，这个maxCount此时还不是真正最大频率呢。
// 所以下面要做如下操作：
// if (count > maxCount) { // 如果计数大于最大值
//   maxCount = count;   // 更新最大频率
//   result.clear();     // 很关键的一步，不要忘记清空result，之前result里的元素都失效了
//   result.push_back(cur->val);
// }

// 迭代法
// 只要把中序遍历转成迭代，中间节点的处理逻辑完全一样。

// 使用额外空间map的方法
var findMode = function (root) {
  // 使用递归中序遍历
  let map = new Map();
  // 1. 确定递归函数以及函数参数
  const traverTree = function (root) {
    // 2. 确定递归终止条件
    if (root === null) {
      return;
    }
    traverTree(root.left);
    // 3. 单层递归逻辑
    map.set(root.val, map.has(root.val) ? map.get(root.val) + 1 : 1);
    traverTree(root.right);
  };
  traverTree(root);
  //上面把数据都存储到map
  //下面开始寻找map里面的
  // 定义一个最大出现次数的初始值为root.val的出现次数
  let maxCount = map.get(root.val);
  // 定义一个存放结果的数组res
  let res = [];
  for (let [key, value] of map) {
    // 如果当前值等于最大出现次数就直接在res增加该值
    if (value === maxCount) {
      res.push(key);
    }
    // 如果value的值大于原本的maxCount就清空res的所有值，因为找到了更大的
    if (value > maxCount) {
      res = [];
      maxCount = value;
      res.push(key);
    }
  }
  return res;
};

// 不使用额外空间，利用二叉树性质，中序遍历(有序)：
var findMode = function (root) {
  // 不使用额外空间，使用中序遍历,设置出现最大次数初始值为1
  let count = 0,
    maxCount = 1;
  let pre = root,
    res = [];
  // 1.确定递归函数及函数参数
  const travelTree = function (cur) {
    // 2. 确定递归终止条件
    if (cur === null) {
      return;
    }
    travelTree(cur.left);
    // 3. 单层递归逻辑
    if (pre.val === cur.val) {
      count++;
    } else {
      count = 1;
    }
    pre = cur;
    if (count === maxCount) {
      res.push(cur.val);
    }
    if (count > maxCount) {
      res = []; // 注意这里要清空
      maxCount = count;
      res.push(cur.val);
    }
    travelTree(cur.right);
  };
  travelTree(root);
  return res;
};
