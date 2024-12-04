// <---------------------><--------------------->JSON.stringify<---------------------><--------------------->

// 实现 JSON.stringify(value, replacer [,space])
// Boolean | Number | String 会被自动转成对应的原始值
// undefined / 任意函数 / symbol 会被忽略 (除非在数组中？)
// 不可枚举的属性会被忽略
// 如果一个对象的属性值通过某种间接的方式指回该对象本身，即循环调用，属性也会被忽略

function myJsonStringify(obj) {
  let type = typeof obj;
  if (type !== "object") {
    if (/string|undefined|function/i.test(type)) {
      obj = '"' + obj + '"';
    }

    return String(obj);
  } else {
    let json = [];
    let arr = Array.isArray(obj);
    for (let key in obj) {
      let v = obj[key];
      let type = typeof v;
      if (/string|undefined|function/i.test(type)) {
        v = '"' + v + '"';
      } else if (type === "object") {
        v = myJsonStringify(v);
      }
      json.push((arr ? "" : '"' + key + '":') + String(v));
    }

    return (arr ? "[" : "{") + json + (arr ? "]" : "}");
  }
}

console.log(myJsonStringify({ x: 5 })); // "{"x":5}"
console.log(myJsonStringify([1, "false", false])); // "[1,"false",false]"
console.log(myJsonStringify({ y: undefined })); // "{"y":"undefined"}"

// <---------------------><--------------------->JSON.parse<---------------------><--------------------->

// JSON.parse(text [, reviver])

// 方法1 eval（eval是一个危险的函数，尽量不使用）
function myJsonParse(text) {
  return eval("(" + text + ")");
}

myJsonParse(myJsonStringify({ x: 5 })); // {x: 5}

// 方法2 Function
// var func = new Function(arg1, arg2, ..., functionBody)

var jsonStr = '{"name":"zhangsan","age":18,"sex":"male"}';
var json = new Function("return " + jsonStr)();

