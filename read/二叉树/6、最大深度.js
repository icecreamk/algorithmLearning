// 二叉树节点的深度：指从根节点到该节点的最长简单路径边的条数或者节点数（取决于深度从0开始还是从1开始）
// 二叉树节点的高度：指从该节点到叶子节点的最长简单路径边的条数或者节点数（取决于高度从0开始还是从1开始）
// 而根节点的高度就是二叉树的最大深度，所以本题中我们通过后序求的根节点高度来求的二叉树最大深度。

// 使用前序求的就是深度，使用后序求的是高度。

// 使用迭代法的话，使用层序遍历是最为合适的，因为最大的深度就是二叉树的层数，和层序遍历的方式极其吻合。

// 二叉树的最大深度
var maxdepth = function (root) {
  if (root === null) return 0;
  return 1 + Math.max(maxdepth(root.left), maxdepth(root.right));
};
// 二叉树最大深度递归遍历
var maxdepth = function (root) {
  //使用递归的方法 递归三部曲
  //1. 确定递归函数的参数和返回值
  const getdepth = function (node) {
    //2. 确定终止条件
    if (node === null) {
      return 0;
    }
    //3. 确定单层逻辑
    let leftdepth = getdepth(node.left);
    let rightdepth = getdepth(node.right);
    let depth = 1 + Math.max(leftdepth, rightdepth);
    return depth;
  };
  return getdepth(root);
};
// 二叉树最大深度层级遍历  参考3-7



// N叉树的最大深度 递归写法

var maxDepth = function(root) {
    if(!root) return 0
    let depth = 0
    for(let node of root.children) {
        depth = Math.max(depth, maxDepth(node))
    }
    return depth + 1
}
// N叉树的最大深度 层序遍历
var maxDepth = function(root) {
    if(!root) return 0
    let count = 0
    let queue = [root]
    while(queue.length) {
        let size = queue.length
        count++
        while(size--) {
            let node = queue.shift()
            for (let item of node.children) {
                item && queue.push(item);
            }
        }
    }
    return count
};
