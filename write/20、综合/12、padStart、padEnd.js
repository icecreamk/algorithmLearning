// "x".padStart(4, "ab"); // abax
// "x".padEnd(5, "ab"); // xabab

// "xxx".padStart(2, "s"); // xxx

// "12".padStart(10, "YYYY-MM-DD"); // YYYY-MM-12
// "09-12".padStart(10, "YYYY-MM-DD"); // YYYY-09-12

String.prototype.myPadStart = function (targetLen, padString = "") {
  if (!targetLen) {
    throw new Error("no length");
  }

  // this指向原本String{} 通过String转为字符串
  let originStr = String(this);
  let originLen = originStr.length;
  if (originLen > targetLen) {
    return originLen;
  }

  let diffCount = targetLen - originLen;

  for (let i = 0; i < diffCount; i++) {
    if (!padString.length) {
      originStr = `${" "}${originStr}`;
      continue
    }
    for (let j = 0; j < padString.length; j++) {
      if (originStr.length === targetLen) {
        break;
      }
      originStr = `${padString[j]}${originStr}`;
    }
  }
  return originStr;
};
String.prototype.myPadEnd = function (targetLen, padString = "") {
  if (!targetLen) {
    throw new Error("no length");
  }

  // this指向原本String{} 通过String转为字符串
  let originStr = String(this);
  let originLen = originStr.length;
  if (originLen > targetLen) {
    return originLen;
  }

  let diffCount = targetLen - originLen;

  for (let i = 0; i < diffCount; i++) {
    if (!padString.length) {
      originStr = `${originStr}${" "}`;
      continue
    }
    for (let j = 0; j < padString.length; j++) {
      if (originStr.length === targetLen) {
        break;
      }
      originStr = `${originStr}${padString[j]}`;
    }
  }
  return originStr;
};


console.log('xxx'.myPadStart(16))
console.log('xxx'.padStart(16))
console.log("x".myPadStart(4, "ab"))
console.log("x".padStart(4, "ab"))

console.log('xxx'.myPadEnd(16))
console.log('xxx'.padEnd(16))
console.log("x".myPadEnd(4, "ab"))
console.log("x".padEnd(4, "ab"))