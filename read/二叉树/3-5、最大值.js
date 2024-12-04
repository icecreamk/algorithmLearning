// 您需要在二叉树的每一行中找到最大的值。

// 每个节点只会被访问一次，因此遍历所有节点的时间复杂度为 (O(n))，其中 (n) 是二叉树的节点数。
// 对于每一层，需要遍历该层的所有节点，计算该层的最大值。假设第 (i) 层有 (k_i) 个节点，则计算该层最大值的时间复杂度为 (O(k_i))。
// 总的时间复杂度为所有层的时间复杂度之和，即 (O(k_1 + k_2 + \ldots + k_h))，其中 (h) 是树的高度。由于 (k_1 + k_2 + \ldots + k_h = n)，因此总的时间复杂度为 (O(n))。

var largestValues = function (root) {
  let res = [],
    queue = [];
  queue.push(root);
  if (root === null) {
    return res;
  }
  while (queue.length) {
    let lengthLevel = queue.length,
      // 初始值设为负无穷大
      max = -Infinity;
    while (lengthLevel--) {
      const node = queue.shift();
      //   在当前层中找到最大值
      max = Math.max(max, node.val);
      // 找到下一层的节点
      node.left && queue.push(node.left);
      node.right && queue.push(node.right);
    }
    res.push(max);
  }
  return res;
};
