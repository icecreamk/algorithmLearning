// 每一个cookie 都是一个键值对 name=value
// 每项开头可能是空字符串 如 user-id
// 值可能有逗号拼接 如 admin,editor

function getCookie(name, cookies = document.cookie) {

  // (^|)表示开头可能有空格的情况
  // ([^;]+): 匹配一个或多个 不是 分号的字符
  // (?=;|$): 零宽正向肯定预查，确保匹配的值后面跟着一个分号或字符串结束。
  const match = cookies.match(new RegExp("(^|)" + name + "=([^;]*)"));
  console.log(match); // [ "user-id=123", "", "123" ]


  // 解码 decodeURIComponent('%67') => 9
  return match ? decodeURIComponent(match[2]) : null;
}


var text = 'username=peter; user-id=123;user-roles= admin,editor'

getCookie('user-id', text) // "123"
getCookie('username', text) // "peter"
getCookie('user-roles', text) // "admin,editor"