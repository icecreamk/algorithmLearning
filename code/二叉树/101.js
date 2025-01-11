// 对称二叉树

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true;
  function dfs(left, right) {
    if (!left && !right) {
      return true;
    }
    if ((left && !right) || (!left && right)) {
      return false;
    }
    if (left.val !== right.val) {
      return false;
    }
    return dfs(left.left, right.right) && dfs(left.right, right.left);
  }
  return dfs(root.left, root.right);
};
var isSymmetric = function (root) {
  if (!root) return true;
  let queue = [root.left, root.right];
  while (queue.length) {
    const leftV = queue.shift();
    const rightV = queue.shift();
    if (!leftV && !rightV) {
      continue;
    }
    if ((leftV && !rightV) || (!leftV && rightV)) {
      return false;
    }
    if (leftV.val !== rightV.val) {
      return false;
    }

    queue.push(leftV.left);
    queue.push(rightV.right);
    queue.push(leftV.right);
    queue.push(rightV.left);
  }
  return true;
};

const a = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(3), new TreeNode(4)),
  new TreeNode(2, new TreeNode(4), new TreeNode(3))
);
console.log(isSymmetric(a));
