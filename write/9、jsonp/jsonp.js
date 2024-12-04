// 利用script不受跨域限制，缺点只能支持get
// ---------------------------------------------- JSONP --------------------------------------------

class Jsonp {
  constructor() {
    this.callbackName = "jsonpCallback";
  }

  // 发送 JSONP 请求
  request(url, params, callback) {
    // 生成唯一的回调函数名
    const uniqueCallbackName = `${this.callbackName}_${new Date().getTime()}`;
    window[uniqueCallbackName] = (data) => {
      delete window[uniqueCallbackName];
      document.body.removeChild(script);
      callback(null, data);
    };

    // 构建 URL
    let query = Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");
    url +=
      (url.includes("?") ? "&" : "?") +
      `callback=${uniqueCallbackName}` +
      (query ? `&${query}` : "");

    // 创建 script 标签
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onerror = () => {
      delete window[uniqueCallbackName];
      document.body.removeChild(script);
      callback(new Error("JSONP request failed"));
    };
    console.log(document, document.body)
    document.body.appendChild(script);
  }
}

// 使用示例
const jsonp = new Jsonp();

// 发送 JSONP 请求
const params = { key: "value" };
jsonp.request("http://localhost:9000/jsonp", params, (err, response) => {
  if (err) {
    console.error("Error:", err);
  } else {
    alert(response.message)
    console.log("Response:", response);
  }
});
