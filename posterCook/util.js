//读取文本
var fs = require("fs");


exports.readstream = function (filepath, textEncoding) {
  return new Promise((resolve, reject) => {
    var readstream = fs.createReadStream(filepath, { encoding: textEncoding });

    var str = "";

    readstream.on("data", function (chunk) {
      str += chunk;
    });

    readstream.on("err", function (err) {
      console.log("createReadStream----", filepath, err);
      reject(err);
    });

    readstream.on("end", function () {
      resolve(str);
    });
  });
};
