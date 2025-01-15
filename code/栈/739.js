// 每日温度
// 示例 1:

// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]

// 复杂度分析
// 一次遍历：O(n)；每个元素都出栈入栈各一次：线性时间的复杂度。综合：O(n)
// 空间复杂度：O(n)

// 如果当前元素比栈顶大，则让小项逐个出栈，直到当前元素比栈顶小，停止出栈
// 此时的栈顶元素就是当前项右边的第一个比自己大的元素索引，计算距离
// 当前项入栈

const dailyTemperatures = (s) => {
  const res = new Array(s.length).fill(0);
  const stack = [];
  for (let i = s.length - 1; i >= 0; i--) {
    while (stack.length && s[i] >= s[stack[stack.length - 1]]) {
      stack.pop();
    }
    if (stack.length) {
      res[i] = stack[stack.length - 1] - i;
    }
    stack.push(i);
  }
  return res;
};

// console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
console.log(dailyTemperatures([1, 2, 3, 4]));
// [1,1,4,2,1,1,0,0]
