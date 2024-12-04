class Vue {
  constructor(opt) {
    this.opt = opt;
    this.observer(opt.data);
    let root = document.querySelector(opt.el);
    this.compile(root);
  }

  observer(data) {
    Object.keys(data).forEach((key) => {
      let obv = new Dep();
      data["_" + key] = data[key];
      Object.defineProperty(data, key, {
        get() {
          Dep.target && obv.addSubNode(Dep.target);
          return data["_" + key];
        },
        set(newValue) {
          obv.update(newValue);
          data["_" + key] = newValue;
        },
      });
    });
  }

  compile(node) {
    [].forEach.call(node.childNodes, (child) => {
      const reg = /\{\{(.*)\}\}/g;
      if (!child.firstElementChild && reg.test(child.innerHTML)) {
        let key = RegExp.$1.trim();
        child.innerHTML = child.innerHTML.replace(
          new RegExp("\\{\\{\\s*" + key + "\\s*\\}\\}", "gm"),
          this.opt.data[key]
        );
        Dep.target = child;
        this.opt.data[key];
        Dep.target = null;
      } else if (child.firstElementChild) {
        this.compile(child);
      }
    });
  }
}

class Dep {
  constructor() {
    this.subNode = [];
  }
  addSubNode(node) {
    this.subNode.push(node);
  }
  update(newValue) {
    this.subNode.forEach((node) => {
      node.innerHTML = newValue;
    });
  }
}
