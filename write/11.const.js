// 实现const
// 由于es5没有block 作用域，所以挂载到对象下，要么全局的window，要么自定义了一个对象

var _const = function (data, value) {
  window.data = value;
  Object.defineProperty(window, data, {
    enumerable: false,
    configurable: false,
    get: function () {
      return value;
    },
    set: function (newValue) {
      if (newValue !== value) {
        throw new Error("can not change const value");
      } else {
        return value
      }
    },
  });
};


_const("a", 10);
console.log('1', a)
// delete 失败 ， configurable: false 不可配置
delete a
console.log('2', a)

for(let item in window) {
  if (item === 'a') {
    // 获取失败，enumerable: false 不可枚举
    console.log('3', window[item])
  }
}

a = 20 // Uncaught Error: can not change const value