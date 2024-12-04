var preorderTraversal = function (root) {
  // 第一种
  //  let res=[];
  //  const dfs=function(root){
  //      if(root===null)return ;
  //      //先序遍历所以从父节点开始
  //      res.push(root.val);
  //      //递归左子树
  //      dfs(root.left);
  //      //递归右子树
  //      dfs(root.right);
  //  }
  //  //只使用一个参数 使用闭包进行存储结果
  //  dfs(root);
  //  return res;
  // 第二种
  return root
    ? [
        // 前序遍历：中左右
        root.val,
        // 递归左子树
        ...preorderTraversal(root.left),
        // 递归右子树
        ...preorderTraversal(root.right),
      ]
    : [];
};

var inorderTraversal = function (root) {
  // 第一种

  // let res=[];
  // const dfs=function(root){
  //     if(root===null){
  //         return ;
  //     }
  //     dfs(root.left);
  //     res.push(root.val);
  //     dfs(root.right);
  // }
  // dfs(root);
  // return res;

  // 第二种
  return root
    ? [
        // 中序遍历：左中右
        // 递归左子树
        ...inorderTraversal(root.left),
        root.val,
        // 递归右子树
        ...inorderTraversal(root.right),
      ]
    : [];
};

var postorderTraversal = function (root) {
  // 第一种
  // let res=[];
  // const dfs=function(root){
  //     if(root===null){
  //         return ;
  //     }
  //     dfs(root.left);
  //     dfs(root.right);
  //     res.push(root.val);
  // }
  // dfs(root);
  // return res;

  // 第二种
  // 后续遍历：左右中
  return root
    ? [
        // 递归左子树
        ...postorderTraversal(root.left),
        // 递归右子树
        ...postorderTraversal(root.right),
        root.val,
      ]
    : [];
};
