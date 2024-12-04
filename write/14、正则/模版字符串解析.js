let template = "我是{{name}}, age{{age}}";
let data = { name: "小明", age: 18 };

render(template, data);
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/;

  if (reg.test(template)) {
    const name = reg.exec(template)[1];
    template = template.replace(reg, data[name]);
    // 递归的渲染并返回渲染后的结构
    return render(template, data);
  }
  return template;
}
