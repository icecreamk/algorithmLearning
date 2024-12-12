class Scheduler {
  constructor(limit) {
    this.limit = limit || 2;
    this.queue = [];
    this.count = 0;
  }

  add(timer, order) {
    const promiseTask = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(order);
        }, timer);
      });
    };

    this.queue.push(promiseTask);
  }
  async start1() {
    const pools = [];
    for (let i = 0; i < this.queue.length; i++) {
      let task = this.queue[i]();
      task.then((response) => {
        console.log(response);
        // 执行完成,从池中移除
        const idx = pools.findIndex((x) => x === task);
        pools.splice(idx, 1);
      });
      pools.push(task);
      if (pools.length >= this.limit) {
        // 等待并发池执行完一个任务后
        await Promise.race(pools);
      }
    }
  }

  start() {
    for (let i = 0; i < this.limit; i++) {
      this.next();
    }
  }
  next() {
    if (!this.queue.length || this.count >= this.limit) return;
    this.count++;
    this.queue
      .shift()()
      .then((res) => {
        console.log(res);
        this.count--;
        this.next();
      });
  }
}

const scheduler = new Scheduler(2);

const addTask = (timer, order) => {
  scheduler.add(timer, order);
};

// 要求：输出顺序 2 3 1 4
addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(1000, 4);
// scheduler.start();
scheduler.start1();
