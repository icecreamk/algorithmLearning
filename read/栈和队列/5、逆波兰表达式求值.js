// 示例 1：
//     输入: ["2", "1", "+", "3", " * "]
//     输出: 9
//     解释: 该算式转化为常见的中缀算术表达式为：((2 + 1) * 3) = 9
// 示例 2：

//     输入: ["4", "13", "5", "/", "+"]
//     输出: 6
//     解释: 该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6

// 示例 3：
//     输入: ["10", "6", "9", "3", "+", "-11", " * ", "/", " * ", "17", "+", "5", "+"]
//     输出: 22  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5

// 时间复杂度: O(n)
// 空间复杂度: O(n)

var evalRPN = function (tokens) {
  const stack = [];
  for (const token of tokens) {
    if (isNaN(Number(token))) {
      // 非数字
      const n2 = stack.pop(); // 出栈两个数字
      const n1 = stack.pop();
      switch (
        token // 判断运算符类型，算出新数入栈
      ) {
        case "+":
          stack.push(n1 + n2);
          break;
        case "-":
          stack.push(n1 - n2);
          break;
        case "*":
          stack.push(n1 * n2);
          break;
        case "/":
          stack.push((n1 / n2) | 0);
          break;
      }
    } else {
      // 数字
      stack.push(Number(token));
    }
  }
  return stack[0]; // 因没有遇到运算符而待在栈中的结果
};

// 优化
// function evalRPN(tokens: string[]): number {
//   const helperStack: number[] = [];
//   const operatorMap: Map<string, (a: number, b: number) => number> = new Map([
//       ['+', (a, b) => a + b],
//       ['-', (a, b) => a - b],
//       ['/', (a, b) => Math.trunc(a / b)],
//       ['*', (a, b) => a * b],
//   ]);
//   let a: number, b: number;
//   for (let t of tokens) {
//       if (operatorMap.has(t)) {
//           b = helperStack.pop()!;
//           a = helperStack.pop()!;
//           helperStack.push(operatorMap.get(t)!(a, b));
//       } else {
//           helperStack.push(Number(t));
//       }
//   }
//   return helperStack.pop()!;
// };

// 其实逆波兰表达式相当于是二叉树中的后序遍历。 大家可以把运算符作为中间节点，按照后序遍历的规则画出一个二叉树。
// 但我们没有必要从二叉树的角度去解决这个问题，只要知道逆波兰表达式是用后序遍历的方式把二叉树序列化了，就可以了。

// 在进一步看，本题中每一个子表达式要得出一个结果，然后拿这个结果再进行运算，那么这岂不就是一个相邻字符串消除的过程，
// 那么和1047.删除字符串中的所有相邻重复项非常像了,只不过本题不要相邻元素做消除了，而是做运算！

// 后记：
// 我们习惯看到的表达式都是中缀表达式，因为符合我们的习惯，但是中缀表达式对于计算机来说就不是很友好了。
// 例如：4 + 13 / 5，这就是中缀表达式，计算机从左到右去扫描的话，扫到13，还要判断13后面是什么运算符，还要比较一下优先级，然后13还和后面的5做运算，做完运算之后，还要向前回退到 4 的位置，继续做加法，你说麻不麻烦！
// 那么将中缀表达式，转化为后缀表达式之后：["4", "13", "5", "/", "+"] ，就不一样了，计算机可以利用栈来顺序处理，不需要考虑优先级了。也不用回退了，
//  所以后缀表达式对计算机来说是非常友好的，可以说本题不仅仅是一道好题，也展现出计算机的思考方式。
