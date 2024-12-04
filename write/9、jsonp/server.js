// server.js

const http = require("http");

const port = 9000;

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  if (req.url.startsWith("/jsonp")) {
    // 处理 JSONP 请求
    const urlParts = req.url.split("?");
    const queryString = urlParts.length > 1 ? urlParts[1] : "";
    const params = new URLSearchParams(queryString);

    const callback = params.get("callback");
    if (callback) {
      const data = { key: "value", message: "Hello from JSONP!" };
      const jsonpData = `${callback}(${JSON.stringify(data)})`;

      res.writeHead(200, { "Content-Type": "application/javascript" });
      res.end(jsonpData);
    } else {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Missing callback parameter");
    }
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

// 启动服务器
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
