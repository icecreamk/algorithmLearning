// 岛屿的数量
// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
// 此外，你可以假设该网格的四条边均被水包围。

// 输入：grid = [
//   ["1","1","1","1","0"],
//   ["1","1","0","1","0"],
//   ["1","1","0","0","0"],
//   ["0","0","0","0","0"]
// ]
// 输出：1

// 输入：grid = [
//   ["1","1","0","0","0"],
//   ["1","1","0","0","0"],
//   ["0","0","1","0","0"],
//   ["0","0","0","1","1"]
// ]
// 输出：3

// DFS为什么要沉岛
// 遍历遇到 1 即遇到土地，土地肯定在一个岛上，计数 +1
// 如果不把与它和同在一个岛的土地变成 0，则DFS遍历到它们时，会对一个岛重复计数
// 怎么找出同处一岛的所有 1

// DFS，以当前 1 为入口
// DFS 做的事情：
// 将当前的 1 变 0
// 当前坐标的上下左右依次递归，同处一个岛的 1 都变 0
// dfs 出口：超出矩阵边界，或遇到 0。不用沉岛，直接返回

var numIslands = (grid) => {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === "1") {
        count++;
        turnZero(i, j, grid);
      }
    }
  }
  return count;
};
function turnZero(i, j, grid) {
  if (
    i < 0 ||
    i >= grid.length ||
    j < 0 ||
    j >= grid[0].length ||
    grid[i][j] === "0"
  )
    return;
  grid[i][j] = "0";
  turnZero(i, j + 1, grid);
  turnZero(i, j - 1, grid);
  turnZero(i + 1, j, grid);
  turnZero(i - 1, j, grid);
}

// 时间复杂度：O(MN)，其中 M 和 N 分别为行数和列数。

// 空间复杂度：O(min(M,N))，在最坏情况下，整个网格均为陆地，队列的大小可以达到 min(M,N)。


// 时间复杂度：O(MN)，其中 M 和 N 分别为行数和列数。

// 空间复杂度：O(MN)，在最坏情况下，整个网格均为陆地，深度优先搜索的深度达到 MN



// 方法2 BFS
// 遇到 1 就计数 +1
// 维护一个队列，遇到 1 就让它的坐标入列
// 节点出列，并考察四个方向，如果是 1，将它转为 0，并将节点入列
// 如果越界了或遇到 0 ，则跳过不用入列
// 出列...入列...直到没有可以入列的节点，则当前岛屿的所有 1 都转 0 了

var numIslands = (grid) => {
  let count = 0
  let queue = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count++
        grid[i][j] = '0' // 做标记，避免重复遍历
        queue.push([i, j])
        turnZero(queue, grid)
      }
    }
  }
  return count
}
function turnZero(queue, grid) {
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  while (queue.length) {
    const cur = queue.shift()
    for (const dir of dirs) {
      const x = cur[0] + dir[0]
      const y = cur[1] + dir[1]
      if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length || grid[x][y] !== '1') {
        continue
      }
      grid[x][y] = '0'
      queue.push([x, y])
    }
  }
}