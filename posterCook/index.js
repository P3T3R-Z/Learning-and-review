var fs = require("fs"),
  path = require("path");
var { registerFont, createCanvas } = require("canvas");

var watermark = require("./watermark");
var cookText = require("./cookText");

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
      
      posters.push({name: dirname, ...cookdata})
    }
  }
}

//以回车符拆分文本为数组
function formatStr(str) {
  if (!str) return [];
  let arr = [],
    matchstr = "",
    pageExp = /.+[\r\n]*?/g;
  while ((matchstr = pageExp.exec(str))) {
    if (matchstr && matchstr[0]) {
      arr.push(matchstr[0]);
    }
  }
  return arr;
}

function drawPoster() {
  // registerFont("comicsans.ttf", { family: "Comic Sans" });

  const canvas = createCanvas(750, 1334);
  const ctx = canvas.getContext("2d");

  cookText(ctx, "123");

  var dataUrl = canvas.toDataURL("image/png", (png) => {
    console.log(png);
  });
}

var posters = []
cook(srcDir).then(res=>{

   
/*posters格式化下面数据解构
  data = [
    {
      name: "src\\xxx\xxx",
      str: [xx,xx],
      img: [xx,xx]
    }
  ]
*/

  let data = posters.reduce((prev, item)=>{
    let hasdata = prev.find(i=>i.name==item.name)
    if(hasdata){
      if(item.hasOwnProperty('img')){
        hasdata.img.push(item.img)
      }
      else if(item.hasOwnProperty('str')){
        hasdata.str.concat(formatStr(item.str))
      }
    } else {
      prev.push({
        name: item.name,
        str: formatStr(item.str),
        img: item.img?[item.img]:[]
      })
    }
    return prev
  },[])
  console.log(data)
})
