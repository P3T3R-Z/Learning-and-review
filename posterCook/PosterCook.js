let fs = require("fs"),
  path = require("path");
let { createCanvas, loadImage } = require("canvas");

let watermark = require("./watermark");

let drawPoster = require("./draw.js");

let {
  srcDir,
  imgType,
  textEncoding,
  textSplitSign,
} = require("./config.js").mainConfig;

let { readstream } = require("./util.js");

module.exports = class PosterCook {
  constructor() {}

  async cook(query) {
    let posters = [];

    await this.initProcess(srcDir, posters);
    let res = "--initProcess finish--"

    if (Object.keys(query).length > 0) {
      posters = this.formatdata(posters);
      return drawPoster(posters);
    } else {
      return Promise.resolve(res)
    }
  }

  //步骤1: 获取读取的文字和水印图片
  async initProcess(dirname, posters) {
    let files = fs.readdirSync(dirname);

    for (let index = 0; index < files.length; index++) {
      let file = files[index];
      let stats = fs.statSync(path.join(dirname, file));

      if (stats.isDirectory()) {
        await this.initProcess(path.join(dirname, file), posters);
      } else if (stats.isFile()) {
        let cookdata = await this.readTextAndMarkImg(path.join(dirname, file));

        posters.push({ name: dirname, ...cookdata });
      }
    }
  }

  //获取文字,生成水印图片
  async readTextAndMarkImg(filepath) {
    let extname = path.extname(filepath);

    if (extname === ".txt") {
      var str = await readstream(filepath, textEncoding);
      return Promise.resolve({ str });
    } 
    else if (imgType.includes(extname)) {
      //水印设置
      var img = await watermark(filepath);
      return Promise.resolve({ img });
    }
  }

  //拆分文本为数组
  splitText(str) {
    if (!str) return [];
    let arr = [],
      matchstr = "";
    while ((matchstr = textSplitSign.exec(str))) {
      if (matchstr && matchstr[0]) {
        arr.push(matchstr[0]);
      }
    }
    return arr;
  }

  //格式数据
  /*
  [
    {
      name: "src\\xxx\xxx",
      str: [xx,xx],
      img: [xx,xx]
    }
  ]
  */
  formatdata(data) {
   
    return data.reduce((prev, item, key) => {
      
      let hasdata = prev.find((i) => i.name == item.name);
      if (hasdata) {
        if (item.hasOwnProperty("img")) {
          hasdata.img.push(item.img);
        } else if (item.hasOwnProperty("str")) {
          hasdata.str = hasdata.str.concat(this.splitText(item.str));
        }
      } else {
        prev.push({
          name: item.name,
          str: this.splitText(item.str),
          img: item.img ? [item.img] : [],
        });
      }
      return prev;
    }, []);
  }
};
