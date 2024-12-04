const resList = [
  { id: 1, name: "张三", age: 18 },
  { id: 2, name: "张三", age: 18 },
  { id: 3, name: "张三", age: 18 },
  { id: 1, name: "张三", age: 18 },
];

// 1
const result = resList.reduce((acc, curr) => {
  const ids = acc.map((item) => item.id);
  return ids.includes(curr.id) ? acc : [...acc, curr];
}, []);

console.log(result);

// 2

const dedup = (data, getKey = () => {}) => {
  const dateMap = data.reduce((acc, curr) => {
    const key = getKey(curr);
    if (!acc[key]) {
      acc[key] = curr;
    }
    return acc;
  }, {});

  return Object.values(dateMap);
};

console.log(dedup(resList, (item) => item.id));
