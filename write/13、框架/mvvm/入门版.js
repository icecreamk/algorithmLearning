function update() {
  console.log("数据变化了");
}

// 编译方法： push shift unshift reverse sort solice pop
let oldProto = Array.prototype;
let newProto = Object.create(oldProto); // 克隆一份

["push", "shift"].forEach((item) => {
  newProto[item] = function () {
    update();
    oldProto[item].apply(this, arguments);
  };
});

function observer(value) {
  if (Array.isArray(value)) {
    // AOP
    // 重写数组的方法
    return (value.__proto__ = newProto);
  }

  if (typeof value !== "object") {
    return value;
  }

  for (let key in value) {
    defineReactive(value, key, value[key]);
  }
}

function defineReactive(obj, key, val) {
  // 如果是对象，继续加getter和setter
  observer(val);
  Object.defineProperty(obj, key, {
    get() {
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      observer(newVal);
      val = newVal;
      update();
    },
  });
}

// 测试
let obj = [1, 2, 3];
observer(obj);
obj.push(123);
obj.push(456);
console.log(obj);
