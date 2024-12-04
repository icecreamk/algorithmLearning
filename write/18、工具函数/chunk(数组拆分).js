function chunk(arr, size) {
  if (size <= 0) return [];
  let result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// 测试
console.log(chunk([1, 2, 3, 4], 3));
console.log(chunk([1, 2, 3, 4], 2));
console.log(chunk([1, 2, 3, 4], 1));
console.log(chunk([1, 2, 3, 4], 0));
