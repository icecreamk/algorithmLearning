// setInterval：
// setInterval在指定的间隔时间，将回调函数推入任务队列，如果前面有其他任务执行，那个这个间隔时间和预期的就会不一致
// setInterval表示何时将定时器添加到任务队列而不是何时执行代码，所以真正的执行时间取决于主线程的事件循环取到，并执行。

// 例如：
let startTime = new Date().getTime();
let count = 0;
setInterval(() => {
  let i = 0;

  // 模拟网络延迟
  while (i++ < 10000000);
  count++;

  console.log(
    "与原设定的时间间隔相差了：",
    new Date().getTime() - (startTime + count * 1000),
    "毫秒"
  );
}, 1000);

// 与原设定的时间间隔相差了： 181 毫秒
// 与原设定的时间间隔相差了： 187 毫秒
// 与原设定的时间间隔相差了： 190 毫秒
// 与原设定的时间间隔相差了： 191 毫秒

// <---------------------><--------------------->setTimeout 模拟 setInterval<---------------------><--------------------->
// 由于setInterval每次push的时候，都会检查上一次的任务是否在队列中，因此存在以下两个特点
// 1、某些间隔会跳过（上次任务在队列中）
// 2、可能多个定时器会连续执行（前一个还没执行完，后面的就被添加到队列中）
// 所以需要用setTimeout模拟setInterval
function mySetInterval(fn, t) {
  let timeId = null;
  function interval() {
    fn();
    timeId = setTimeout(interval, t); // 递归调用
  }

  timeId = setTimeout(interval, t); // 首次调用

  return {
    // 利用闭包保存timeId
    clear() {
      clearTimeout(timeId);
    },
  };
}

const a = mySetInterval(() => {
  console.log(1);
}, 1000);
const b = mySetInterval(() => {
  console.log(2);
}, 1000);

// <---------------------><--------------------->setInterval 模拟 setTimeout<---------------------><--------------------->
const mySetTimeout = (fn, t) => {
  const timer = setInterval(() => {
    clearInterval(timer);
    fn();
  }, t);
};


// 测试
mySetTimeout(() => {
  console.log('test')
}, 1000)