class Scheduler {
  // TODO
}

const scheduler = new Scheduler();

const addTask = (timer, order) => {
  scheduler.add(timer, order);
};

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(1000, 4);

scheduler.start();
