class Subject {
  constructor() {
    this.observers = [];
  }

  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer);
  }

  // 移除观察者
  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  // 通知所有观察者
  notify(data) {
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }

  // 更新方法
  update(data) {
    console.log(`${this.name} received data:`, data);
  }
}

// 使用示例
const subject = new Subject();

const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");

// 添加观察者
subject.addObserver(observer1);
subject.addObserver(observer2);

// 通知观察者
subject.notify({ message: "Hello, Observers!" });

// 移除一个观察者
subject.removeObserver(observer1);

// 再次通知观察者
subject.notify({ message: "Another update!" });
