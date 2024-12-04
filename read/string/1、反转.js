// 对于字符串，我们定义两个指针（也可以说是索引下标），一个从字符串前面，一个从字符串后面，
// 两个指针同时向中间移动，并交换元素。

var reverseString = function (s) {
  //Do not return anything, modify s in-place instead.
  reverse(s);
};

var reverse = function (s) {
  let l = -1,
    r = s.length;
  while (++l < --r) [s[l], s[r]] = [s[r], s[l]];
};
