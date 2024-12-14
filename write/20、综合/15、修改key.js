var a = {
  a_y: {
    a_z: {
      y_x: 6,
    },
    b_c: 1,
  },
};

// {
//   ay: {
//     az: {
//       yx: 6,
//     },
//     bc: 1,
//   },
// };

const regularExpress = (obj) => {
  try {
    const str = JSON.stringify(obj).replace(/_/g, "");
    return JSON.parse(str);
  } catch (error) {
    return obj;
  }
};


const recursion = (obj) => {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    const newKey = key.replace(/_/g, "");
    obj[newKey] = recursion(obj[key]);
    delete obj[key];
  });

  return obj;
};

// console.log(regularExpress(a));
console.log(recursion(a));

