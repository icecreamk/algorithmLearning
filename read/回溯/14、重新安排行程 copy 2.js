// 给定一个机票的字符串二维数组 [from, to]，子数组中的两个成员分别表示飞机出发和降落的机场地点，对该行程进行重新规划排序。所有这些机票都属于一个从 JFK（肯尼迪国际机场）出发的先生，所以该行程必须从 JFK 开始。
// 提示：
// 如果存在多种有效的行程，请你按字符自然排序返回最小的行程组合。例如，行程 ["JFK", "LGA"] 与 ["JFK", "LGB"] 相比就更小，排序更靠前
// 所有的机场都用三个大写字母表示（机场代码）。
// 假定所有机票至少存在一种合理的行程。
// 所有的机票必须都用一次 且 只能用一次。

// 示例 1：
// 输入：[["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
// 输出：["JFK", "MUC", "LHR", "SFO", "SJC"]

// 如果在解题的过程中没有对集合元素处理好，就会死循环。

var findItinerary = function (tickets) {
  let result = ["JFK"];
  let map = {};

  for (const tickt of tickets) {
    const [from, to] = tickt;
    if (!map[from]) {
      map[from] = [];
    }
    map[from].push(to);
  }

  for (const city in map) {
    // 对到达城市列表排序
    map[city].sort();
  }
  function backtracing() {
    if (result.length === tickets.length + 1) {
      return true;
    }
    if (
      !map[result[result.length - 1]] ||
      !map[result[result.length - 1]].length
    ) {
      return false;
    }
    for (let i = 0; i < map[result[result.length - 1]].length; i++) {
      let city = map[result[result.length - 1]][i];
      // 删除已走过航线，防止死循环
      map[result[result.length - 1]].splice(i, 1);
      result.push(city);
      if (backtracing()) {
        return true;
      }
      result.pop();
      map[result[result.length - 1]].splice(i, 0, city);
    }
  }
  backtracing();
  return result;
};

// javascript版本二 处理对象key无序问题

/**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function (tickets) {
  const ans = ["JFK"];
  let map = {};
  // 整理每个站点的终点站信息
  tickets.forEach((t) => {
    let targets = map[t[0]];
    if (!targets) {
      targets = { [t[1]]: 0 };
      map[t[0]] = targets;
    }
    targets[t[1]] = (targets[t[1]] || 0) + 1;
  });
  // 按照key字典序排序对象
  const sortObject = (obj) => {
    const newObj = {};
    const keys = Object.keys(obj);
    keys.sort((k1, k2) => (k1 < k2 ? -1 : 1));
    keys.forEach((key) => {
      if (obj[key] !== null && typeof obj[key] === "object") {
        newObj[key] = sortObject(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    });
    return newObj;
  };
  const backtrack = (tickets, targets) => {
    if (ans.length === tickets.length + 1) {
      return true;
    }
    const target = targets[ans[ans.length - 1]];
    // 没有下一站
    if (!target) {
      return false;
    }
    // 或者在这里排序
    // const keyList = Object.keys(target).sort((k1, k2) => (k1 < k2 ? -1 : 1));
    const keyList = Object.keys(target);
    for (const key of keyList) {
      // 判断当前站是否还能飞
      if (target[key] > 0) {
        target[key]--;
        ans.push(key);
        // 对象key有序 此时的行程就是字典序最小的 直接跳出
        if (backtrack(tickets, targets)) {
          return true;
        }
        target[key]++;
        ans.pop();
      }
    }
    return false;
  };
  map = sortObject(map);
  backtrack(tickets, map);
  return ans;
};
