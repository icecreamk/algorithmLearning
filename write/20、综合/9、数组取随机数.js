// TODO 为啥复杂度是 O(n^2)
function getTenNum(testArray, n) {
  let result = [];
  for (let i = 0; i < n; ++i) {
    const random = Math.floor(Math.random() * testArray.length);
    // console.log(i, random);
    const cur = testArray[random];
    if (result.includes(cur)) {
      i--;
      continue;
    }
    result.push(cur);
  }

  return result;
}

console.log(getTenNum([3, 4, 5, 6, 7], 3));

// 标记法 O(n)
function getTenNum1(testArray, n) {
  let hash = {};
  let result = [];

  let ranNum = n;
  while (ranNum > 0) {
    const ran = Math.floor(Math.random() * testArray.length);
    if (!hash[ran]) {
      hash[ran] = true;
      result.push(testArray[ran]);
      ranNum--;
    }
  }

  return result;
}

console.log(getTenNum1([3, 4, 5, 6, 7], 3));

// 交换法
function getTenNum2(testArray, n) {
  const cloneArr = [...testArray];
  let result = [];
  for (let i = 0; i < n; i++) {
    const ran = Math.floor(Math.random() * (cloneArr.length - i));

    // console.log(i, ran, [...cloneArr]);
    result.push(cloneArr[ran]);
    // 取完ran的位置后，把ran的位置替换成数组尾巴的值，下次取范围，是不包含尾部的，因为每次减1
    cloneArr[ran] = cloneArr[cloneArr.length - i - 1];
    // console.log([...cloneArr]);
  }

  return result;
}

console.log(getTenNum2([3, 4, 5, 6, 7], 3));

// 边取边删
function getTenNum3(testArray, n) {
  const cloneArr = [...testArray];
  let result = [];
  for (let i = 0; i < n; i++) {
    const ran = Math.floor(Math.random() * cloneArr.length);
    const cur = cloneArr[ran];
    result.push(cur);
    cloneArr.splice(ran, 1);
  }
  return result;
}

console.log(getTenNum3([3, 4, 5, 6, 7], 3));
