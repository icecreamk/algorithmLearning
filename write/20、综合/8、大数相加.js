// Math.floor(0.1) // 0
// 1/10 // 0.1
// 12/10 // 1.2
// 1%10 //1

let a = "900000000000001";
let b = "12300000000000099";
function add(a, b) {
  let maxLength = Math.max(a.length, b.length);

  //   补零
  a = a.padStart(maxLength, 0); // 00900000000000001
  b = b.padStart(maxLength, 0); // 12300000000000099

  let t = 0;
  let f = 0;
  let sum = "";
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }

  if (f !== 0) {
    sum = "" + f + sum;
  }

  return sum;
}

console.log(add("12", "999"))
console.log(add(a, b))
