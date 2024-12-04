class Dep {
  static stack = [];
  static target = null;
  deps = null;
  constructor() {
    this.deps = new Set();
  }

  depend() {
    if (Dep.target) {
      this.deps.add(Dep.target);
    }
  }

  notify() {
    console.log(this.deps)
    this.deps.forEach((w) => w.update());
  }

  static pushTarget(t) {
    console.log(t, this.target)
    if (this.target) {
      this.stack.push(this.target);
    }
    this.target = t;
  }

  static popTarget() {
    this.target = this.stack.pop();
  }
}

function reactive(o) {
  if (o && typeof o === "object") {
    Object.keys(o).forEach((k) => {
      defineReactive(o, k, o[k]);
    });
  }

  return o;
}

function defineReactive(obj, k, val) {
  let dep = new Dep();
  Object.defineProperty(obj, k, {
    get() {
      console.log(val)
      dep.depend();
      return val;
    },

    set(newVal) {
      val = newVal;
      dep.notify();
    },
  });

  if (val && typeof val === "object") {
    reactive(val);
  }
}

class Watcher {
  constructor(effect) {
    this.effect = effect;
    this.update();
  }
  update() {
    Dep.pushTarget(this);
    this.value = this.effect();
    Dep.popTarget();
    return this.value;
  }
}

// 测试
let obj = reactive({
  a: 1,
  b: 2,
});

new Watcher(() => {
  console.log('修改后b', obj.b);
});
new Watcher(() => {
  console.log('修改后a', obj.a);
});


setTimeout(() => {
  console.log("修改了");
  obj.a = 222;
  obj.b = 333;
}, 1000);
