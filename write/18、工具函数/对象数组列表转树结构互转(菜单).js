// [
//   {
//     id: "1",
//     pid: "0",
//   },
//   {
//     id: "2",
//     pid: "1",
//   },
// ];

// [
//   {
//     id: "1",
//     pid: "0",
//     chilldren: [
//       {
//         id: "2",
//         pid: "1",
//       },
//     ],
//   },
// ];

function listToTree(list) {
  const result = []; // 用于存储最终的树形结构
  const nodeMap = {}; // 用于存储每个节点的引用

  // 首先，构建一个以 id 为键的对象映射
  list.forEach((item) => {
    nodeMap[item.id] = { ...item, children: [] };
  });

  // 然后，遍历每个节点，将其添加到其父节点的 children 数组中
  list.forEach((item) => {
    const node = nodeMap[item.id];
    if (item.parentId && nodeMap[item.parentId]) {
      nodeMap[item.parentId].children.push(node);
    } else {
      result.push(node); // 如果没有父节点，则将其添加到结果数组中
    }
  });

  return result;
}

a = listToTree([
  {
    id: "1",
    parentId: "0",
  },
  {
    id: "2",
    parentId: "1",
  },
]);

function treeToList(data) {
  let res = [];
  const dfs = (node) => {
    node.forEach((item) => {
      if (item.children) {
        dfs(item.children);
        delete item.children;
      }
      res.push(item);
    });
  };
  dfs(data);
  return res;
}

treeToList(a);
