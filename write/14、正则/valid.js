// 千位分隔符
function formatNumberWithCommas(num) {
  num = parseFloat(num.toFixed(3));
  // let [int, decimal] = num.toString().split(".");
  // 或者
  let [int, decimal] = String.prototype.split.call(num, ".");
  int = int.replace(/(\d)(?=(\d{3})+$)/g, "$&,");
  return int + (decimal ? "." + decimal : "");
}
formatNumberWithCommas(1234.56);
formatNumberWithCommas(123456789);
formatNumberWithCommas(123456789.321);

// 电话号码
function formatPhoneNumber(phoneNumber) {
  const regx = /^1[3456789]\d{9}$/;
  return regx.test(regx);
}

// 邮箱
function formatEmail(email) {
  const regx = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return regx.test(email);
}

// 身份证
function formatIdCard(idCard) {
  const regx = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
  return regx.test(idCard);
}
