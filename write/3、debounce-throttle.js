// <---------------------><--------------------->debounce<---------------------><--------------------->
// 设置一个定时器：在第一次触发事件时设置一个定时器。
// 清除之前的定时器：在每次触发事件时清除之前的定时器。
// 重新设置定时器：在每次触发事件时重新设置定时器。
// 执行函数：在定时器结束后执行目标函数。
function debounce(func, wait) {
  let timeout;

  return function (...args) {
    const context = this;

    // 清除之前的定时器
    clearTimeout(timeout);

    // 重新设置定时器
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// 测试示例
function logMessage(message) {
  console.log(message);
}

const debouncedLog = debounce(logMessage, 1000);

// 模拟频繁触发事件
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    debouncedLog(`Message ${i}`);
  }, i * 100);
}

// <---------------------><--------------------->throttle<---------------------><--------------------->

function throttle(func, wait) {
  let timeout = null;
  let lastExecuted = 0;

  return function (...args) {
    const context = this;
    const now = Date.now();

    // 计算剩余时间
    const remainingTime = wait - (now - lastExecuted);

    // 如果剩余时间小于等于0，表示可以执行函数
    if (remainingTime <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      func.apply(context, args);
      lastExecuted = now;
    } else if (!timeout) {
      // 设置定时器，在剩余时间结束后执行函数
      timeout = setTimeout(() => {
        func.apply(context, args);
        lastExecuted = Date.now();
        timeout = null;
      }, remainingTime);
    }
  };
}

// 测试示例
function logMessage(message) {
  console.log(message);
}

const throttledLog = throttle(logMessage, 1000);

// 模拟频繁触发事件
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    throttledLog(`Message ${i}`);
  }, i * 100);
}
