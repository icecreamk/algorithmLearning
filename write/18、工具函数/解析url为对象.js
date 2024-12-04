const test =
  "http://xxx.com/?name=你好&age=18&age=20&city=%E4%B8%8A%E6%B5%B7&enabled";

function parseUrl(url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // ?后面取出来
  const paramsArr = paramsStr.split("&"); // 以&符号切割成数组
    console.log(paramsArr)
  const paramsObj = {};

  // for (const param of paramsArr) {
  //     const [key, value] = param.split("=");
  //     paramsObj[key] = value;
  // }

  paramsArr.forEach((item) => {
    if (/=/.test(item)) {
      // 处理有value的
      let [key, value] = item.split("=");
      val = decodeURIComponent(value);
      val = /^\d+$/.test(val) ? parseInt(val) : val; // 判断是否转数字

      if (paramsObj.hasOwnProperty(key)) {
        paramsObj[key] = [].concat(paramsObj[key], val);
      } else {
        paramsObj[key] = val;
      }
    } else {
      paramsObj[item] = true;
    }
  });
  return paramsObj;
}

parseUrl(test)


// {
//     "name": "你好",
//     "age": [
//         18,
//         20
//     ],
//     "city": "上海",
//     "enabled": true
// }