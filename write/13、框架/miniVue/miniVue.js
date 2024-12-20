class Vue {
  constructor(options) {
    this.$options = options || {};
    this.$data = options.data || {};
    this.$el =
      typeof options.el === "string"
        ? document.querySelector(options.el)
        : options.el;

    // 1.把data中的成员转成getter和setter,注入到vue实例中
    this._proxyData(this.$data);
    // 2.调用observer对象，将data转换为响应式对象
    new Observer(this.$data);
    // 3.调用compile对象，解析指令和差值表达式
    new Compile(this);
  }

  _proxyData(data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key];
        },
        set(newValue) {
          if (newValue === data[key]) {
            return;
          }
          data[key] = newValue;
        },
      });
    });
  }
}

class Dep {
  constructor() {
    // 存储所有观察者
    this.subs = [];
  }

  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }

  notify() {
    this.subs.forEach((sub) => {
      sub.update();
    });
  }
}

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    // data中的属性名称
    this.key = key;
    this.cb = cb;
    // 把watcher对象记录到静态属性target
    Dep.target = this;
    // 这里读取vm[key] 调用get方法，在get方法中调用addSub
    this.oldValue = vm[key];
    Dep.target = null;
  }
  update() {
    let newValue = this.vm[this.key];
    if (newValue === this.oldValue) {
      return;
    }
    this.cb(newValue);
  }
}

class Compile {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compile(this.el);
  }

  compile(el) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      // 处理文本节点
      if (this.isTextNode(node)) {
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node);
      }

      // 判断node节点，是否有子节点，如果有子节点，就递归调用compile
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }

  // 编译元素节点，处理指令
  compileElement(node) {
    Array.from(node.attributes).forEach((attr) => {
      // 判断是否是指令
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        // v-text -> text
        attrName = attrName.substr(2);
        let key = attr.value;
        this.update(node, key, attrName);
      }
    });
  }
  update(node, key, attrName) {
    // 调用textUpdater、modelUpdater
    let updateFn = this[attrName + "Updater"];
    updateFn && updateFn.call(this, node, this.vm[key], key);
  }

  //   处理v-text指令
  textUpdater(node, value, key) {
    node.textContent = value;

    // 创建watcher对象，当数据改变更新视图
    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue;
    });
  }

  //   v-model
  modelUpdater(node, value, key) {
    node.value = value;

    // 创建watcher对象，当数据改变更新视图
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue;
    });

    // 绑定input事件
    node.addEventListener("input", () => {
      this.vm[key] = node.value;
    });
  }

  //   编译文本节点，处理差值表达式
  compileText(node) {
    // console.dir(node)
    // {{ msg }}
    let reg = /\{\{(.*)\}\}/;
    let value = node.textContent;
    if (reg.test(value)) {
      let key = RegExp.$1.trim();
      node.textContent = node.textContent.replace(reg, this.vm[key]);
      //  创建watcher对象，当数据改变更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue;
      });
    }
  }

  // 判断是否是指令
  isDirective(attrName) {
    return attrName.startsWith("v-");
  }
  // 判断是否是文本节点
  isTextNode(node) {
    return node.nodeType === 3;
  }
  // 判断是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1;
  }
}

class Observer {
  constructor(data) {
    this.walk(data);
  }

  walk(data) {
    // 1.判断data是否是对象
    if (!data || typeof data !== "object") {
      return;
    }

    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(obj, key, val) {
    let that = this;
    // 负责收集依赖，并发送通知
    let dep = new Dep();
    // 如果val是对象，把val内部的属性转成响应式数据
    this.walk(val);

    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get: function reactiveGetter() {
        // 1.收集依赖
        Dep.target && dep.addSub(Dep.target);
        return val;
      },
      set: function reactiveSetter(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        that.walk(newVal);
        // 发送通知
        dep.notify();
      },
    });
  }
}
