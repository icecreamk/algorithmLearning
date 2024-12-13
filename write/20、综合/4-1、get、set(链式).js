const enhancedObject = (target) => {
  return new Proxy(target, {
    get(target, property) {
      if (property in target) {
        return target[property];
      } else {
        return searchFor(target, property);
      }
    },
  });
};

let value = null;
function searchFor(target, property) {
  for (const key of Object.keys(target)) {
    if (typeof target[key] === "object") {
      searchFor(target[key], property);
    } else if (typeof target[property] !== "undefined") {
      value = target[property];
      break;
    }
  }
  return value;
}

const data = enhancedObject({
  user: {
    name: "test",
    settings: {
      theme: "dart",
    },
  },
});

console.log(data.user.settings.theme); // dart 通过new Proxy 获得
console.log(data.theme); // dart 通过递归searchFor获得
