function objectFlagt(obj = {}) {
  const res = {};

  function flat(item, preKey = "") {
    Object.entries(item).forEach(([key, value]) => {
      const newKey = preKey ? `${preKey}.${key}` : key;
      if (value && typeof value === "object") {
        flat(value, newKey);
      } else {
        res[newKey] = value;
      }
    });
  }

  flat(obj);
  return res;
}

const obj = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3,
    },
  },
};


console.log(objectFlagt(obj));