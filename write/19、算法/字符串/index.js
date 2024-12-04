// 查找出现最多的字符和个数
let str = "aaabbbcccddd";

function getMaxChar(str) {
  let num = 0;
  let char = "";

  // 先排序
  str = str.split("").sort().join("");
  let re = /(\w)\1+/g;

  str.replace(re, ($0, $1) => {
    console.log($0, $1);
    if (num < $0.length) {
      num = $0.length;
      char = $1;
    }
  });

  return { char, num };
}

const { char, num } = getMaxChar(str);
console.log(char, num);

// 判断a是否包含在b中，并返回首次出现的位置，没有返回-1
function findSubstring3(a, b) {
  for (let i = 0; i <= b.length - a.length; i++) {
    let found = true;
    for (let j = 0; j < a.length; j++) {
      if (b[i + j] !== a[j]) {
        found = false;
        break;
      }
    }
    if (found) {
      return i;
    }
  }
  return -1;
}

// 测试用例
console.log(findSubstring3("abc", "defabcghi")); // 输出: 3
console.log(findSubstring3("xyz", "defabcghi")); // 输出: -1


// TOLEARN
// 字符串最长的不重复子串
