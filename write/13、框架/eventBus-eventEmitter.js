// Event Bus / Event Emitter 作为全局事件总线，起到沟通桥梁作用
// 所有发布订阅都不能“私下沟通”，必须通过 Event Bus，（所以它是一个事件中心，严格来说不是观察者模式，是发布订阅模式）

// 方式1
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => callback(...args));
    }
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (item) => item !== callback
      );
    }
  }

  once(eventName, callback) {
    const onceCallbackWrap = (...args) => {
      callback(...args);
      this.off(eventName, onceCallbackWrap);
    };

    this.on(eventName, onceCallbackWrap);
  }
}

// 方式2
class EventBus1 {
  constructor() {
    this.events = {};
  }

  on(type, fn, isOnce = false) {
    const events = this.events;
    if (events[type] === undefined) {
      events[type] = [];
    }
    events[type].push({ fn, isOnce });
  }

  once(type, fn) {
    this.on(type, fn, true);
  }

  off(type, fn) {
    if (!fn) {
      // 解绑所有事件
      this.events[type] = [];
    } else {
      const fnList = this.events[type];
      if (fnList) {
        this.events[type] = fnList.filter((item) => item.fn !== fn);
      }
    }
  }

  emit(type, ...args) {
    const fnList = this.events[type];

    if (fnList === undefined) return;
    this.events[type] = fnList.filter((item) => {
      //   const { fn, isOnce } = item;
      //   fn(...args);
      //   return !isOnce;
      //   简写
      item.fn(...args);
      return !item.isOnce; // 注意  once执行一次要被移除
    });
  }
}

// 方式3
// 拆分保存on 和 once

class EventBus2 {
  constructor() {
    this.events = {};
    this.onceEvents = {};
  }

  on(type, fn) {
    const events = this.events;
    if (events[type] === undefined) {
      events[type] = [];
    }
    events[type].push(fn);
  }

  once(type, fn) {
    const onceEvents = this.onceEvents;
    if (onceEvents[type] === undefined) {
      onceEvents[type] = [];
    }
    onceEvents[type].push(fn);
  }

  off(type, fn) {
    if (!fn) {
      // 解绑所有事件
      this.events[type] = [];
      this.onceEvents[type] = [];
    } else {
      const fnList = this.events[type];
      const onceFnList = this.onceEvents[type];
      if (fnList) {
        this.events[type] = fnList.filter((item) => item !== fn);
      }

      if (onceFnList) {
        this.onceEvents[type] = onceFnList.filter((item) => item !== fn);
      }
    }
  }

  emit(type, ...args) {
    const fnList = this.events[type];
    const onceFnList = this.onceEvents[type];
    if (fnList) {
      fnList.forEach((item) => item(...args));
    }
    if (onceFnList) {
      onceFnList.forEach((item) => item(...args));
      // 执行一次删除
      this.onceEvents[type] = [];
    }
  }
}

const e = new EventBus();
function fn1(a, b) {
  console.log("fn1", a, b);
}
function fn2(a, b) {
  console.log("fn2", a, b);
}
function fn3(a, b) {
  console.log("fn3", a, b);
}

e.on("key1", fn1);
e.once("key1", fn2);
e.on("key1", fn3);

e.emit("key1", "10", "20"); // 触发 fn1 fn2 fn3

e.off("key1", fn1);

e.emit("key1", "100", "200"); // 触发 fn3
