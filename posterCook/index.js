var fs = require("fs"),
  path = require("path");
var { registerFont, createCanvas } = require("canvas");

var watermark = require("./watermark");
var cookText = require("./cookText")


var config = require("./config.js");
let { srcDir, buildDir: build, imgType } = config;

//读取文本
function readstream(filepath) {
  return new Promise((resolve, reject) => {
    var readstream = fs.createReadStream(filepath, { encoding: "utf-8" });

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
}

//获取文字,生成水印图片
async function getFile(filepath) {
  let extname = path.extname(filepath);

  if (extname === ".txt") {
    var str = await readstream(filepath);
    return Promise.resolve({ str });
  } else if (imgType.includes(extname)) {
    var img = await watermark(filepath, config);
    return Promise.resolve({ img });
  }
}

async function cook(dirname) {
  let files = fs.readdirSync(dirname);

  for (let index = 0; index < files.length; index++) {
    let file = files[index];
    let stats = fs.statSync(path.join(dirname, file));

    if (stats.isDirectory()) {
      await cook(path.join(dirname, file));
    } else if (stats.isFile()) {
      let cookdata = await getFile(path.join(dirname, file));

      savePosters(cookdata, dirname);
    }
  }
}

function savePosters(cookdata, dirname) {
  var hasdata = posters.find((i) => i.path == dirname);
  if (!hasdata) {
    hasdata = {
      path: dirname,
      ...cookdata,
    };
    posters.push(hasdata);
  } else {
    let key = Object.keys(cookdata)[0];
    let val = Object.values(cookdata)[0];
    if (key == "str") {
      hasdata[key] = val;
    } else if (key == "img") {
      if (hasdata[key] && hasdata[key].length) {
        hasdata[key].push(val);
      } else {
        hasdata[key] = [val];
      }
    }
  }
}

function drawPoster() {
  // registerFont("comicsans.ttf", { family: "Comic Sans" });

  const canvas = createCanvas(750, 1334);
  const ctx = canvas.getContext("2d");

  cookText(ctx, "123")

  var dataUrl = canvas.toDataURL('image/png', (png)=>{
    console.log(png)
  })

}

var posters = [];

cook(srcDir).then(() => {
  drawPoster();
});
