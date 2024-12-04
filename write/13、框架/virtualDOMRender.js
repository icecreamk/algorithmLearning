// 虚拟dom生成真实dom

// 生成虚拟 DOM 数据
const virtualDOM = {
  type: "div",
  props: {
    id: "container",
    className: "main-container",
    children: [
      {
        type: "h1",
        props: {
          className: "title",
          children: "欢迎来到我的网站",
        },
      },
      {
        type: "p",
        props: {
          className: "description",
          children: "这是一个简单的虚拟 DOM 转换示例。",
        },
      },
    ],
  },
};

// 将虚拟 DOM 转换成真实 DOM
function createElement(vnode) {
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  }
  if (typeof vnode === "number") {
    return String(vnode);
  }

  // 创建元素
  const domNode = document.createElement(vnode.type);

  // 设置属性
  for (const prop in vnode.props) {
    if (prop === "children") {
      continue;
    }
    domNode.setAttribute(prop, vnode.props[prop]);
  }

  // 处理子节点
  const children = vnode.props.children || [];
  if (typeof children === "string") {
    domNode.appendChild(document.createTextNode(children));
  } else {
    children.forEach((child) => {
      domNode.appendChild(createElement(child));
    });
  }

  return domNode;
}

// 渲染虚拟 DOM 到页面
function render(virtualNode, container) {
  container.appendChild(createElement(virtualNode));
}

// 获取容器元素
const container = document.getElementById("app");

// 渲染虚拟 DOM
render(virtualDOM, container);
