// 回溯是递归的副产品，只要有递归就会有回溯
// 因为回溯的本质是穷举，穷举所有可能，然后选出我们想要的答案

// 回溯法其实就是暴力查找，并不是什么高效的算法。但是为什么要用呢？
// 因为回溯解决的问题都不简单，一般可以解决如下几种问题
// 组合问题：N个数里面按一定规则找出k个数的集合
// 切割问题：一个字符串按一定规则有几种切割方式
// 子集问题：一个N个数的集合里有多少符合条件的子集
// 排列问题：N个数按一定规则全排列，有几种排列方式
// 棋盘问题：N皇后，解数独等等

// 组合是不强调元素顺序的，排列是强调元素顺序。
// {1, 2} 和 {2, 1} 在组合上，就是一个集合
// {1, 2} 和 {2, 1} 在排列上，就是两个集合了。

// 所有回溯法的问题都可以抽象为树形结构！
// 因为回溯法解决的都是在集合中递归查找子集，集合的大小就构成了树的宽度，递归的深度就构成了树的深度。
// for循环可以理解是横向遍历，backtracking（递归）就是纵向遍历

// 总结：
// 求组合问题！、求组合总和！
// 区别是：本题没有数量要求，可以无限重复，但是有总和的限制，所以间接的也是有个数的限制。
// 不少录友都是看到可以重复选择，就义无反顾的把startIndex去掉了。
// 本题还需要startIndex来控制for循环的起始位置，对于组合问题，什么时候需要startIndex呢？
// 我举过例子，如果是一个集合来求组合的话，就需要startIndex，例如：回溯算法：求组合问题！、求组合总和！
// 如果是多个集合取组合，各个集合之间相互不影响，那么就不用startIndex，例如：电话号码的字母组合

// 注意以上我只是说求组合的情况，如果是排列问题，又是另一套分析的套路，后面我在讲解排列的时候会重点介绍。
// 在求和问题中，排序之后加剪枝是常见的套路

// 求组合总和（三）本题集合元素会有重复，但要求解集不能包含重复的组合。
// 所以难就难在去重问题上了。这个去重问题，为了讲解这个去重问题，我自创了两个词汇，“树枝去重”和“树层去重”。

// 在回溯算法：分割回文串
// 本题还有细节，例如：切割过的地方不能重复切割所以递归函数需要传入i + 1。
// 复原IP照分割回文串就多了一些限制，例如只能分四段，而且还是更改字符串，插入逗点。
// if (s.size() > 12) return result; // 剪枝

// 求子集问题！在树形结构中子集问题是要收集所有节点的结果，而组合问题是收集叶子节点的结果。
// 认清这个本质之后，今天的题目就是一道模板题了。

// 性能分析
// 子集问题分析：
//     时间复杂度：$O(n × 2^n)$，因为每一个元素的状态无外乎取与不取，所以时间复杂度为$O(2^n)$，构造每一组子集都需要填进数组，又有需要$O(n)$，最终时间复杂度：$O(n × 2^n)$。
//     空间复杂度：$O(n)$，递归深度为n，所以系统栈所用空间为$O(n)$，每一层递归所用的空间都是常数级别，注意代码里的result和path都是全局变量，就算是放在参数里，传的也是引用，并不会新申请内存空间，最终空间复杂度为$O(n)$。

// 排列问题分析：
//     时间复杂度：$O(n!)$，这个可以从排列的树形图中很明显发现，每一层节点为n，第二层每一个分支都延伸了n-1个分支，再往下又是n-2个分支，所以一直到叶子节点一共就是 n * n-1 * n-2 * ..... 1 = n!。每个叶子节点都会有一个构造全排列填进数组的操作（对应的代码：result.push_back(path)），该操作的复杂度为$O(n)$。所以，最终时间复杂度为：n * n!，简化为$O(n!)$。
//     空间复杂度：$O(n)$，和子集问题同理。

// 组合问题分析：
//     时间复杂度：$O(n × 2^n)$，组合问题其实就是一种子集的问题，所以组合问题最坏的情况，也不会超过子集问题的时间复杂度。
//     空间复杂度：$O(n)$，和子集问题同理。
// 一般说道回溯算法的复杂度，都说是指数级别的时间复杂度，这也算是一个概括吧

// N皇后问题分析：
// 时间复杂度：O(n!) ，其实如果看树形图的话，直觉上是O(n^n)，但皇后之间不能见面所以在搜索的过程中是有剪枝的，最差也就是O（n!），n!表示n * (n-1) * .... * 1。
// 空间复杂度：O(n)，和子集问题同理。

// 解数独问题分析：
// 时间复杂度：O(9^m) , m是'.'的数目。
// 空间复杂度：O(n^2)，递归的深度是n^2
