// https://wow.techbrood.com/fiddle/38877

let { lineheight, lineTextLength, fontSize, fontFamily, fontColor } = require("./config.js");

function getTrueLength(str) {
  //获取字符串的真实长度（字节长度）
  var len = str.length,
    truelen = 0;
  for (var x = 0; x < len; x++) {
    if (str.charCodeAt(x) > 128) {
      truelen += 2;
    } else {
      truelen += 1;
    }
  }
  return truelen;
}

function cutString(str, leng) {
  //按字节长度截取字符串，返回substr截取位置
  var len = str.length,
    tlen = len,
    nlen = 0;
  for (var x = 0; x < len; x++) {
    if (str.charCodeAt(x) > 128) {
      if (nlen + 2 < leng) {
        nlen += 2;
      } else {
        tlen = x;
        break;
      }
    } else {
      if (nlen + 1 < leng) {
        nlen += 1;
      } else {
        tlen = x;
        break;
      }
    }
  }
  return tlen;
}

module.exports = function cookText(ctx, text) {
 
  ctx.font = `${fontSize} ${fontFamily}`;
  ctx.fillStyle = fontColor;

  for (var i = 1; getTrueLength(text) > 0; i++) {
    var tl = cutString(text, lineTextLength);
    ctx.fillText(
      text.substr(0, tl).replace(/^\s+|\s+$/, ""),
      10,
      i * lineheight + 50
    );
    text = text.substr(tl);
  }
};
