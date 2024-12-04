// ---------------------------------------------- 原生 --------------------------------------------

class Ajax {
  constructor() {
    this.xhr = new XMLHttpRequest();
  }

  // 发送 GET 请求
  get(url, callback) {
    this.xhr.open("GET", url, true);
    this.xhr.onload = () => {
      if (this.xhr.status >= 200 && this.xhr.status < 300) {
        callback(null, this.xhr.responseText);
      } else {
        callback(new Error(`Request failed with status ${this.xhr.status}`));
      }
    };
    this.xhr.onerror = () => {
      callback(new Error("Network error"));
    };
    this.xhr.send();
  }

  // 发送 POST 请求
  post(url, data, callback) {
    this.xhr.open("POST", url, true);
    this.xhr.setRequestHeader("Content-Type", "application/json");
    this.xhr.onload = () => {
      if (this.xhr.status >= 200 && this.xhr.status < 300) {
        callback(null, this.xhr.responseText);
      } else {
        callback(new Error(`Request failed with status ${this.xhr.status}`));
      }
    };
    this.xhr.onerror = () => {
      callback(new Error("Network error"));
    };
    this.xhr.send(JSON.stringify(data));
  }
}

// 使用示例
const ajax = new Ajax();

// 发送 GET 请求
ajax.get("https://api.example.com/data", (err, response) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Response:", response);
  }
});

// 发送 POST 请求
const postData = { key: "value" };
ajax.post("https://api.example.com/data", postData, (err, response) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Response:", response);
  }
});

// ---------------------------------------------- promise --------------------------------------------
class Ajax {
  constructor() {
    this.xhr = new XMLHttpRequest();
  }

  // 发送 GET 请求
  get(url) {
    return new Promise((resolve, reject) => {
      this.xhr.open("GET", url, true);
      this.xhr.onload = () => {
        if (this.xhr.status >= 200 && this.xhr.status < 300) {
          resolve(this.xhr.responseText);
        } else {
          reject(new Error(`Request failed with status ${this.xhr.status}`));
        }
      };
      this.xhr.onerror = () => {
        reject(new Error("Network error"));
      };
      this.xhr.send();
    });
  }

  // 发送 POST 请求
  post(url, data) {
    return new Promise((resolve, reject) => {
      this.xhr.open("POST", url, true);
      this.xhr.setRequestHeader("Content-Type", "application/json");
      this.xhr.onload = () => {
        if (this.xhr.status >= 200 && this.xhr.status < 300) {
          resolve(this.xhr.responseText);
        } else {
          reject(new Error(`Request failed with status ${this.xhr.status}`));
        }
      };
      this.xhr.onerror = () => {
        reject(new Error("Network error"));
      };
      this.xhr.send(JSON.stringify(data));
    });
  }
}

// 使用示例
const ajax1 = new Ajax();

// 发送 GET 请求
ajax1
  .get("https://api.example.com/data")
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// 发送 POST 请求
const postData1 = { key: "value" };
ajax1
  .post("https://api.example.com/data", postData1)
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
