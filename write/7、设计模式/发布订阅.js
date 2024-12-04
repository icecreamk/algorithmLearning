class PubSub {
  constructor() {
    this.subscribers = {};
  }

  // 订阅事件
  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  // 一次性订阅事件
  once(event, callback) {
    const onceCallback = (...args) => {
      callback(...args);
      this.unsubscribe(event, onceCallback);
    };
    this.subscribe(event, onceCallback);
  }

  // 发布事件
  publish(event, data) {
    const callbacks = this.subscribers[event];
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }

  // 取消订阅
  unsubscribe(event, callback) {
    const callbacks = this.subscribers[event];
    if (callbacks) {
      this.subscribers[event] = callbacks.filter((cb) => cb !== callback);
    }
  }
}

// 使用示例
var pubsub = new PubSub();
pubsub.subscribe("news", (data) => {
  console.log("received1", data);
});
pubsub.subscribe("news", (data) => {
  console.log("received2", data);
});
pubsub.publish("news", { name: "1" });
pubsub.publish("news", { name: "2" });

// received1 {name: '1'}
// received2 {name: '1'}
// received1 {name: '2'}
// received2 {name: '2'}

// 一次性订阅
var pubsub1 = new PubSub();
pubsub1.once("news-once", (data) => {
  console.log("received1", data);
});
pubsub1.once("news-once", (data) => {
  console.log("received2", data);
});
pubsub1.publish("news-once", { name: "3" });
pubsub1.publish("news-once", { name: "4" });

// 取消订阅

var pubsub = new PubSub();

var testFun11 = (data) => {
  console.log("111", data);
};
var testFun22 = (data) => {
  console.log("222", data);
};

pubsub.subscribe("news", testFun11);
pubsub.subscribe("news", testFun22);
pubsub.unsubscribe("news", testFun11);
pubsub.publish("news", { name: "test" });

// 222 {name: 'test'}
// 注意这里取消订阅的是事件本身，而不是消息类型 news
