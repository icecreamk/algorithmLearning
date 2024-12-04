// 第一种是求路径和是判断，递归需要返回值
// 第二种是求路径的节点，递归不需要返回值

// 0112.路径总和
// 递归

/**
 * @param {treenode} root
 * @param {number} targetsum
 * @return {boolean}
 */
let haspathsum1 = function (root, targetsum) {
  // 递归法
  const traversal = (node, cnt) => {
    // 遇到叶子节点，并且计数为0
    if (cnt === 0 && !node.left && !node.right) return true;
    // 遇到叶子节点而没有找到合适的边(计数不为0)，直接返回
    if (!node.left && !node.right) return false;

    //  左（空节点不遍历）.遇到叶子节点返回true，则直接返回true
    if (node.left && traversal(node.left, cnt - node.left.val)) return true;
    //  右（空节点不遍历）
    if (node.right && traversal(node.right, cnt - node.right.val)) return true;
    return false;
  };
  if (!root) return false;
  return traversal(root, targetsum - root.val);

  // 精简代码:
  // if (!root) return false;
  // if (!root.left && !root.right && targetsum === root.val) return true;
  // return haspathsum(root.left, targetsum - root.val) || haspathsum(root.right, targetsum - root.val);
};
// 迭代
let hasPathSum2 = function (root, targetSum) {
  if (root === null) return false;
  let nodeArr = [root];
  let valArr = [0];
  while (nodeArr.length) {
    let curNode = nodeArr.shift();
    let curVal = valArr.shift();
    curVal += curNode.val;
    // 为叶子结点，且和等于目标数，返回true
    if (
      curNode.left === null &&
      curNode.right === null &&
      curVal === targetSum
    ) {
      return true;
    }
    // 左节点，将当前的数值也对应记录下来
    if (curNode.left) {
      nodeArr.push(curNode.left);
      valArr.push(curVal);
    }
    // 右节点，将当前的数值也对应记录下来
    if (curNode.right) {
      nodeArr.push(curNode.right);
      valArr.push(curVal);
    }
  }
  return false;
};
// 0113.路径总和-ii
// 递归

let pathsum3 = function (root, targetsum) {
  // 递归法
  // 要遍历整个树找到所有路径，所以递归函数不需要返回值, 与112不同
  const res = [];
  const travelsal = (node, cnt, path) => {
    // 遇到了叶子节点且找到了和为sum的路径
    if (cnt === 0 && !node.left && !node.right) {
      res.push([...path]); // 不能写res.push(path), 要深拷贝
      return;
    }
    if (!node.left && !node.right) return; // 遇到叶子节点而没有找到合适的边，直接返回
    // 左 （空节点不遍历）
    if (node.left) {
      path.push(node.left.val);
      travelsal(node.left, cnt - node.left.val, path); // 递归
      path.pop(); // 回溯
    }
    // 右 （空节点不遍历）
    if (node.right) {
      path.push(node.right.val);
      travelsal(node.right, cnt - node.right.val, path); // 递归
      path.pop(); // 回溯
    }
    return;
  };
  if (!root) return res;
  travelsal(root, targetsum - root.val, [root.val]); // 把根节点放进路径
  return res;
};
// 递归 精简版

var pathsum4 = function (root, targetsum) {
  //递归方法
  let respath = [],
    curpath = [];
  // 1. 确定递归函数参数
  const traveltree = function (node, count) {
    curpath.push(node.val);
    count -= node.val;
    if (node.left === null && node.right === null && count === 0) {
      respath.push([...curpath]);
    }
    node.left && traveltree(node.left, count);
    node.right && traveltree(node.right, count);
    let cur = curpath.pop();
    count -= cur;
  };
  if (root === null) {
    return respath;
  }
  travelTree(root, targetSum);
  return resPath;
};
// 迭代

let pathSum5 = function (root, targetSum) {
  if (root === null) return [];
  let nodeArr = [root];
  let resArr = []; // 记录符合目标和的返回路径
  let tempArr = [[]]; // 对应路径
  let countArr = [0]; //对应和
  while (nodeArr.length) {
    let curNode = nodeArr.shift();
    let curVal = countArr.shift();
    let curNodeArr = tempArr.shift();
    curVal += curNode.val;
    curNodeArr.push(curNode.val);
    // 为叶子结点，且和等于目标数，将此次结果数组push进返回数组中
    if (
      curNode.left === null &&
      curNode.right === null &&
      curVal === targetSum
    ) {
      resArr.push(curNodeArr);
    }
    // 左节点，将当前的和及对应路径也对应记录下来
    if (curNode.left) {
      nodeArr.push(curNode.left);
      countArr.push(curVal);
      tempArr.push([...curNodeArr]);
    }
    // 右节点，将当前的和及对应路径也对应记录下来
    if (curNode.right) {
      nodeArr.push(curNode.right);
      countArr.push(curVal);
      tempArr.push([...curNodeArr]);
    }
  }
  return resArr;
};
