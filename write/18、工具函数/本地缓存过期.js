class myStorage {
  constructor() {
    this.name = "myStorage";
  }

  setItem(params) {
    let obj = {
      name: "",
      value: "",
      expire: "",
      startTime: new Date().getTime(),
    };

    let options = {};

    Object.assign(options, obj, params);

    if (options.expire) {
      localStorage.setItem(options.name, JSON.stringify(options));
    } else {
      let type = Object.prototype.toString.call(options.value);
      if (type === "[object Object]" || type === "[object Array]") {
        localStorage.setItem(options.name, JSON.stringify(options.value));
      }
      localStorage.setItem(options.name, options.value);
    }
  }

  getItem(name) {
    let item = localStorage.getItem(name);
    try {
      item = JSON.parse(item);
    } catch (e) {
      item = item;
    }
    if (item.expire) {
      let date = new Date().getTime();
      if (date - item.startTime > item.expire) {
        localStorage.removeItem(name);
        return false;
      } else {
        return item.value;
      }
    } else {
      return item;
    }
  }

  removeItem(name) {
    localStorage.removeItem(name);
  }
  clear() {
    localStorage.clear();
  }
}

// 测试代码
let store1 = new myStorage();
store1.setItem({
  name: "name",
  value: "zhangsan",
  expire: 3000,
});

console.log(store1.getItem("name"));

setTimeout(() => {
  console.log(store1.getItem("name"));
}, 4000);
