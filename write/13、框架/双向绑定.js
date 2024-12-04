const data = {
  text: "111",
};

const input = document.getElementById("input");
const span = document.getElementById("span");

// vue2
Object.defineProperty(data, "text", {
  set(val) {
    input.value = val;
    span.innerHTML = val;
  },
});

input.addEventListener("keyup", function (e) {
  data.text = e.target.value;
});

// vue3
const data1 = {
  text: "222",
};

const input1 = document.getElementById("input1");
const span1 = document.getElementById("span1");

const handler = {
  set(target, key, value) {
    console.log(target, key, value);
    target[key] = value;
    input1.value = value;
    span1.innerHTML = value;
    return value;
  },
};

const proxy = new Proxy(data1, handler);

input1.addEventListener("keyup", function (e) {
  // 注意这里是data1的代理 proxy赋值
  proxy.text = e.target.value;
});
