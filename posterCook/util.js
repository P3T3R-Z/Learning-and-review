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
//base64转图片文件
exports.base64ToFile = (imgData, filepath) => {
  var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
  var dataBuffer = new Buffer(base64Data, "base64");
  fs.writeFile(filepath, dataBuffer, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("保存成功！", filepath);
    }
  });
};
//检查并生成文件夹
exports.checkAndMkdir = (path) => {
  return new Promise((resolve) => {
    fs.stat(path, function (err, stats) {
      if (err) {
        fs.mkdir(path, function (error) {
          if (error) {
            console.log(error);
            return;
          }
          console.log("创建成功",path);
          resolve(1)
        });
        return;
      }

      console.log("目录存在->", stats.isDirectory());
      resolve(1)
    });
  });
};
