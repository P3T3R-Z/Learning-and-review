function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) {
    return arr[2];
  } else {
    return null;
  }
}

function setCookie(name, value, days, cookieDomain) {
  if (days != null) {
    var d = new Date();
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    window.document.cookie =
      name +
      "=" +
      value +
      ";path=/;domain=." +
      cookieDomain +
      ";expires=" +
      d.toGMTString();
  } else {
    window.document.cookie =
      name + "=" + value + ";path=/;domain=." + cookieDomain;
  }
}
function writeCookie(name, value, hours) {
  var expire = "";
  if (hours != null) {
    expire = new Date(new Date().getTime() + hours * 3600000);
    expire = "; expires=" + expire.toGMTString();
  }
  document.cookie = name + "=" + escape(value) + expire;
}
//第几天后的凌晨过期cookie
function leftTimeCookie(name, value, cookieDomain, days) {
  var curDate = new Date();
  var curTamp = curDate.getTime();
  var curWeeHours = new Date(curDate.toLocaleDateString()).getTime() - 1;
  var passedTamp = curTamp - curWeeHours;
  //剩余时间
  var leftTamp = days * 24 * 60 * 60 * 1000 - passedTamp;
  var leftTime = new Date();
  leftTime.setTime(leftTamp + curTamp);
  window.document.cookie =
    name +
    "=" +
    value +
    ";path=/;domain=." +
    cookieDomain +
    ";expires=" +
    leftTime.toGMTString();
}

var dateFormat = function(fmt, timestamp) {
  var _t = timestamp
    ? new Date(timestamp * 1000)
    : new Date(new Date().getTime());
  var o = {
    "M+": _t.getMonth() + 1, //月份
    "d+": _t.getDate(), //日
    "h+": _t.getHours(), //小时
    "m+": _t.getMinutes(), //分
    "s+": _t.getSeconds(), //秒
    "q+": Math.floor((_t.getMonth() + 3) / 3), //季度
    S: _t.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (_t.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
}

// 判断时间差
function timeDiff(newdate, olddate, limit) {
  if (newdate > olddate) {
    var timestamp_diff = newdate * 1000 - olddate * 1000;
    return timestamp_diff / 1000 > 60 * limit; //大于limit分鐘
  } else {
    var timestamp_diff = olddate * 1000 - newdate * 1000;
    return timestamp_diff / 1000 > 60 * limit; //大于limit分鐘
  }
}
//前或后几日数组
function timearray(n, starttime) {
  var d = starttime || new Date().getTime();
  var timearray = [];
  for (var i = 0; i < Math.abs(n); i++) {
    var dd = d;
    dd =
      n < 0 ? dd - 1000 * 60 * 60 * 24 * i : dd + 1000 * 60 * 60 * 24 * i;
    dd = new Date(dd);
    var year = dd.getFullYear();
    var mon = dd.getMonth() + 1;
    var day = dd.getDate();
    var weekday = dd.getDay() == 0?7: dd.getDay();
    var s =
      year +
      "-" +
      (mon < 10 ? "0" + mon : mon) +
      "-" +
      (day < 10 ? "0" + day : day);
    timearray.push({
      time: s,
      day: weekday
    });
  }
  return n < 0 ? timearray.reverse() : timearray;
}

function limitback(limitpath, backpath) {
  if (document.referrer.indexOf(limitpath) > -1) {
    //清空浏览器历史记录
    pushHistory();
    //监听浏览器后退事件
    window.addEventListener(
      "popstate",
      function(e) {
        //转向指定的URL
        location.href = backpath;
      },
      false
    );
    //清空浏览器历史记录
    function pushHistory() {
      var url = "#";
      var state = {
        title: "title",
        url: "#"
      };
      window.history.pushState(state, "title", "#");
    }
  }
}
function loadfunc(d, func) {
  if (document.addEventListener) {
    d.addEventListener("load", func, false);
  } else if (document.attachEvent) {
    d.attachEvent("onload", func);
  }
}

//图片预加载
function ImgPreLoad(ele, type) {
  //backgroun-image图片
  if (type == 1) {
    var imgArray = $(ele + " .preload_img");

    var oldpath = [],
      idarray = [];

    for (var i = oldpath.length; i < imgArray.length; i++) {
      if (!imgArray[i].id) {
        oldpath.push(imgArray[i].style.backgroundImage);
        $(imgArray[i]).css({
          backgroundImage: "url(/Public/common/images/loading.jpg)",
          backgroundSize: "contain"
        });
        $(imgArray[i]).attr("id", "lodingpic" + i);
        idarray.push(imgArray[i].id);
      }
    }
    // console.log(oldpath)
    // console.log(idarray)
    var newimg = {};
    var r = /^url\((.*)\)$/;

    for (var i = 0; i < oldpath.length; i++) {
      newimg[idarray[i]] = new Image();
      var opath = oldpath[i].match(r);

      if (!opath) {
        newimg[idarray[i]].src = "/Public/common/images/loading.jpg";
      } else {
        //console.log(opath[1].match(/\"(.*)\"/)[1])
        if (opath[1].indexOf('"') > -1) {
          newimg[idarray[i]].src = opath[1].match(/\"(.*)\"/)[1];
          // console.log(newimg[idarray[i]].src)
        } else {
          newimg[idarray[i]].src = opath[1];
        }
      }

      newimg[idarray[i]].id = idarray[i];

      newimg[idarray[i]].onload = function() {
        var id = this.id,
          path = this.src;
        //document.getElementById(id).style.backgroundImage = "url(" + path + ")";

        var bi = "background-image:url(" + path + ")";
        document.getElementById(id).setAttribute("style", bi);
        document.getElementById(id).style.backgroundSize = "cover";
      };
    }
  }
  //img图片
  else if (type == 2) {
    var imgArray = $(ele + " img");

    var oldpath = [],
      idarray = [];
    for (var i = 0; i < imgArray.length; i++) {
      if (imgArray[i].id) {
        oldpath.push(imgArray[i].src);
        $(imgArray[i])
          .attr("src", "/Public/common/images/loading.jpg")
          .addClass("loadingpic");
        $(imgArray[i]).attr("id", "lodingpic" + i);
        idarray.push(imgArray[i].id);
      }
    }
    var newimg = {};
    for (var i = 0; i < oldpath.length; i++) {
      newimg[idarray[i]] = new Image();
      newimg[idarray[i]].src = oldpath[i];
      newimg[idarray[i]].id = idarray[i];
      newimg[idarray[i]].onload = function() {
        var id = this.id,
          path = this.src;
        document.getElementById(id).setAttribute("src", path);
        document.getElementById(id).classList.remove("loadingpic");
      };
    }
  }
}

function imgPreLoad2(el, eachCallback, callback) {
  var imgArray = document.querySelector(el).getElementsByTagName("img");
  var oldpath = [];

  for (var i = 0; i < imgArray.length; i++) {
    oldpath.push(imgArray[i].src);
  }

  var newimg = {},
    loadNum = 0;
  for (var i = 0; i < oldpath.length; i++) {
    newimg[i] = new Image();
    newimg[i].src = oldpath[i];
    newimg[i].onload = function() {
      console.log(this.src + "加载完成");
      loadNum++;
      if (eachCallback && typeof eachCallback == "function") {
        eachCallback();
      }
      if (loadNum == oldpath.length) {
        console.log("所有图片加载完成");
        if (callback && typeof callback == "function") {
          callback();
        }
      }
    };
  }
}

// fn	长按开始回调	必需	function(s)	s: 时事返回的计时(秒)
// endfn	长按结束回调	必需	function(s)	s: 时事返回的计时(秒)
// cancelFn	长按打断回调 (例: 系统弹框触发, 电话触发)	必需	function(s)	s: 时事返回的计时(秒)
// limitS	限制(秒)后自动执行endfn回调	选填	Number	/
// 长按事件jq方法
$.fn.longTap = function(fn, endfn, cancelFn, limitS) {
  var timeout = undefined;
  var $this = this;
  var rseconds = 0,
    ras;
  var raction = function(cb) {
    var _t = this;
    rseconds = 0;
    cb.call(_t, rseconds);
    ras = setInterval(function() {
      rseconds++;
      if (limitS && rseconds == limitS) {
        clearTimeout(ras);
        clearTimeout(timeout);
        if (endfn && typeof endfn === "function") {
          endfn(rseconds);
        }
        return;
      }
      cb.call(_t, rseconds);
    }, 1000);
  };
  for (var i = 0; i < $this.length; i++) {
    $this[i].addEventListener("touchstart", function(event) {
      timeout = setTimeout(raction(fn), 300);
    });
    $this[i].addEventListener("touchend", function(event) {
      clearTimeout(ras);
      clearTimeout(timeout);
      if (endfn && typeof endfn === "function") {
        endfn(rseconds);
      }
    });
    $this[i].addEventListener("touchcancel", function(event) {
      //event.preventDefault()
      clearTimeout(ras);
      clearTimeout(timeout);
      if (endfn && typeof endfn === "function") {
        cancelFn(rseconds);
      }
    });
  }
};

function pureHtml(oldhtml) {
  var r = /<[^img\/][a-z1-5]+[\s\S]*?>+/gim;
  return oldhtml.replace(r, "<div>");
}

//滾動動畫, dom為滾動節點
const scrollAnimation = function(currentY, targetY, dom) {
  // const currentY = document.documentElement.scrollTop || document.body.scrollTop
  // 计算需要移动的距离
  var _dom = dom
  dom = !dom?window:document.querySelector(dom)
  // if(dom != window){
  //   dom.scrollTop = targetY
  //   return
  // }
  let needScrollTop = targetY - currentY;
  let _currentY = currentY;
  setTimeout(() => {
    // 一次调用滑动帧数，每次调用会不一样
    const dist = Math.ceil(needScrollTop / 10);
    _currentY += dist;
    if(dom == window){
      dom.scrollTo(_currentY, currentY);
    }else{
      dom.scrollTop = _currentY
    }
    
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollAnimation(_currentY, targetY, _dom);
    } else {
     
      if(dom == window){
        dom.scrollTo(_currentY, targetY);
      }else{
        dom.scrollTop = targetY
      }
    }
  }, 1);
};


//去掉html标签
function removeHtmlTab(tab) {
  return tab.replace(/<[^<>]+?>/g, ""); //删除所有HTML标签
}
//普通字符转换成转意符
function html2Escape(sHtml) {
  return sHtml.replace(/[<>&"]/g, function(c) {
    return { "<": "<", ">": ">", "&": "&", '"': '"' }[c];
  });
}
//转意符换成普通字符
function escape2Html(str) {
  var arrEntities = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };
  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
    return arrEntities[t];
  });
}
//转空格
function nbsp2Space(str) {
  var arrEntities = { nbsp: " " };
  return str.replace(/&(nbsp);/gi, function(all, t) {
    return arrEntities[t];
  });
}
//多空合并
function mergeSpace(str) {
  str = str.replace(/(\s| )+/g, " ");
  return str;
}
//回车转br
function return2Br(str) {
  return str.replace(/\r?\n/g, "<br />");
}
//去除开头结尾换行,并将连续3次以上换行转换成2次换行
function trimBr(str) {
  str = str.replace(/((\s| )*\r?\n){3,}/g, "\r\n\r\n"); //限制最多2次换行
  str = str.replace(/^((\s| )*\r?\n)+/g, ""); //清除开头换行
  str = str.replace(/((\s| )*\r?\n)+$/g, ""); //清除结尾换行
  return str;
}
//去首尾空
function trim(s) {
  return s.replace(/(^\s*)|(\s*$)/g, "");
}

//内容表情格式化
function getEmojiObj() {
  return {
    basicpath: "https://static.tuokgx.net/customer/src/images/face",
    faceobj: [
      "[:微笑]",
      "[:嘻嘻]",
      "[:哈哈]",
      "[:可爱]",
      "[:可怜]",
      "[:挖鼻]",
      "[:吃惊]",
      "[:害羞]",
      "[:挤眼]",
      "[:闭嘴]",
      "[:鄙视]",
      "[:爱你]",
      "[:泪]",
      "[:偷笑]",
      "[:亲亲]",
      "[:生病]",
      "[:太开心]",
      "[:白眼]",
      "[:右哼哼]",
      "[:左哼哼]",
      "[:嘘]",
      "[:衰]",
      "[:委屈]",
      "[:吐]",
      "[:哈欠]",
      "[:抱抱]",
      "[:怒]",
      "[:疑问]",
      "[:馋嘴]",
      "[:拜拜]",
      "[:思考]",
      "[:汗]",
      "[:困]",
      "[:睡]",
      "[:钱]",
      "[:失望]",
      "[:酷]",
      "[:色]",
      "[:哼]",
      "[:鼓掌]",
      "[:晕]",
      "[:悲伤]",
      "[:抓狂]",
      "[:黑线]",
      "[:阴险]",
      "[:怒骂]",
      "[:互粉]",
      "[:心]",
      "[:伤心]",
      "[:猪头]",
      "[:熊猫]",
      "[:兔子]",
      "[:ok]",
      "[:耶]",
      "[:good]",
      "[:NO]",
      "[:赞]",
      "[:来]",
      "[:弱]",
      "[:草泥马]",
      "[:神马]",
      "[:囧]",
      "[:浮云]",
      "[:给力]",
      "[:围观]",
      "[:威武]",
      "[:奥特曼]",
      "[:礼物]",
      "[:钟]",
      "[:话筒]",
      "[:蜡烛]",
      "[:蛋糕]"
    ]
  };
}
function formatCtx(ctx) {
  var faceobj = getEmojiObj(),
    emojiArray = faceobj.faceobj,
    basicpath = faceobj.basicpath;
  var f = ctx.match(/\[:([^\s\[\]]+?)\]/g);
  if (f != null) {
    for (var x = 0; x < f.length; x++) {
      for (var i = 0; i < emojiArray.length; i++) {
        if (emojiArray[i] == f[x]) {
          ctx = ctx.replace(
            f[x],
            '<img src="' + basicpath + "/" + i + '.gif" />'
          );
        }
      }
    }
  }
  return ctx;
}

/**
 * 在字符串中插入新字符串
 * param {string} soure 源字符
 * param {string} start 插入字符的位置
 * param {string} newStr 需要插入的字符
 * returns {string} 返回新生成的字符
 */
function insertStr(soure, start, newStr) {
  var str = soure.slice(0, start) + newStr + soure.slice(start);
  return str;
}

/**
 * 中划线名称转驼峰式
 * param {string} soure 源字符
 * returns {string} 返回转换完成的字符
 */
function midlineToHump(soure) {
  var reg = /-(\w)/g;
  var str = soure.replace(reg, function($, $1) {
    return $1.toUpperCase();
  });
  return str;
}

//随机坐标 returns {object} 返回包含经纬度的对象
function getRandomLnglat() {
  var lnglat = {};
  lnglat.lng = Math.round((Math.random() * 360 - 180) * 1000) / 1000; //经度取值范围-180~180
  lnglat.lat = Math.round((Math.random() * 180 - 90) * 1000) / 1000; //纬度取值范围-90~90
  return lnglat;
}

function IsInt(str) {
  if (/^(\+|-)?\d+$/.test(str)) {
    return str;
  } else {
    return false;
  }
}


function IsUrl(str) {
  var myReg = /^((http:[/][/])?\w+([.]\w+|[/]\w*)*)?$/;
  if (myReg.test(str)) {
    return str;
  } else {
    return false;
  }
}

function IsEmail(str) {
  var myReg = /^([-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
  if (myReg.test(str)) {
    return str;
  } else {
    return false;
  }
}

function IsMobile(str) {
  var re = /(^1[0-9]{10}$)/;
  if (re.test(str)) {
    return str;
  } else {
    return false;
  }
}

const cssSupport = function(attr, value) {
  var element = document.createElement("div");
  if (attr in element.style) {
    element.style[attr] = value;
    return element.style[attr] === value;
  } else {
    return false;
  }
};

//去除結尾多餘的0; 12.02300->12.023
const formatCounts = counts => {
  try {
    var matchcounts = counts.toString().match(/^(\d+)\.?(\d*)/);

    //整数
    var f = parseInt(matchcounts[1]);
    //小数
    var s =
      matchcounts[2].match(/\d*[^0]/) != null
        ? "." + matchcounts[2].match(/\d*[^0]/)
        : "";
    return f + s;
  } catch (e) {
    console.log(e.message);
    return counts;
  }
};

const arrayBufferToBase64 = buffer => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const isUsercard=(code)=> {
  var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  if (!idcardReg.test(code)) {
     return false
  }
  return true
}

const pwdStrength = value => {
  var pwdregexp = (min, max) => {
     return (
        '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{'+min+','+max+'}$'
     );
  };

  // var strength = 0;

  // strength+= value.match(/\d+/g)? value.match(/\d+/g).length :0
  // strength+= value.match(/[a-z]+/g)?value.match(/[a-z]+/g).length :0
  // strength+= value.match(/[A-Z]+/g)?value.match(/[A-Z]+/g).length :0
  // strength+= value.match(/[\W_!@#$%^&*`~()-+=]+/g)?value.match(/[\W_!@#$%^&*`~()-+=]+/g).length :0

  // switch (true) {
  //   case strength<=2 && strength>0:
  //     return "低";
  //   case strength===3:
  //     return "中";
  //   case strength>=4:
  //     return "高";
  //   default:
  //     return '不符合规则'
  // }
  var level1 = new RegExp(pwdregexp(8, 10)),
     level2 = new RegExp(pwdregexp(10, 12)),
     level3 = new RegExp(pwdregexp(12, 20));

  if (value.length < 8) {
     return '不符合规则'
  }

  if (level1.test(value)) {
     return "低";
  } else if (level2.test(value)) {
     return "中";
  } else if (level3.test(value)) {
     return "高";
  } else {
     return "不符合规则";
  }
};

const isPwd = function (pwd) {
  var pwdregexp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
  //var pwdregexp = /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{8,20}$/;
  if (!pwdregexp.test(pwd)) {
     return false;
  }
  return true;
};

var telco=function(input) {
  if (input.length == 11) {

    var isChinaMobile = /^((134)|(135)|(136)|(137)|(138)|(139)|(147)|(150)|(151)|(152)|(157)|(158)|(159)|(178)|(182)|(183)|(184)|(187)|(188)|(198))\d{8}$/g;
    var isChinaUnion = /^((130)|(131)|(132)|(155)|(156)|(145)|(185)|(186)|(176)|(175)|(170)|(171)|(166))\d{8}$/g;
    var isChinaTelcom = /^((133)|(153)|(173)|(177)|(180)|(181)|(189)|(199))\d{8}$/g;

    if (isChinaMobile.test(input)) {
      return "中国移动";
    } else if (isChinaUnion.test(input)) {
      return "中国联通";
    } else if (isChinaTelcom.test(input)) {
      return "中国电信";
    }

  }
  return ''
};



var countDown=function(starttime, endtime) {
  var n = parseInt(Date.now() / 1000),
    o = 0;
  if (starttime && (o = starttime > n ? starttime - n : n - starttime, o = parseInt(o)), endtime && (o = parseInt(endtime)), 0 == o) return !1;
  var i = Math.floor(o / 86400),
    a = Math.floor((o - 24 * i * 60 * 60) / 3600),
    r = Math.floor((o - 24 * i * 60 * 60 - 3600 * a) / 60),
    s = Math.floor(o - 24 * i * 60 * 60 - 3600 * a - 60 * r);
  return [i, a < 10 ? "0" + a : a, r < 10 ? "0" + r : r, s < 10 ? "0" + s : s];
}






//////////////////////////////////////////////////////
/////////////////////浮点数精度问题的解决方法

 
var accAdd = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try { dec1 = countDecimals(num1)+1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2)+1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    // var result = (num1 * times + num2 * times) / times;
    var result = (accMul(num1, times) + accMul(num2, times)) / times;
    return getCorrectResult("add", num1, num2, result);
    // return result;
};
 
var accSub = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try { dec1 = countDecimals(num1)+1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2)+1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    // var result = Number(((num1 * times - num2 * times) / times);
    var result = Number((accMul(num1, times) - accMul(num2, times)) / times);
    return getCorrectResult("sub", num1, num2, result);
    // return result;
};
 
var accDiv = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var t1 = 0, t2 = 0, dec1, dec2;
    try { t1 = countDecimals(num1); } catch (e) { }
    try { t2 = countDecimals(num2); } catch (e) { }
    dec1 = convertToInt(num1);
    dec2 = convertToInt(num2);
    var result = accMul((dec1 / dec2), Math.pow(10, t2 - t1));
    return getCorrectResult("div", num1, num2, result);
    // return result;
};
 
var accMul = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var times = 0, s1 = num1.toString(), s2 = num2.toString();
    try { times += countDecimals(s1); } catch (e) { }
    try { times += countDecimals(s2); } catch (e) { }
    var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
    return getCorrectResult("mul", num1, num2, result);
    // return result;
};
 
var countDecimals = function(num) {
    var len = 0;
    try {
        num = Number(num);
        var str = num.toString().toUpperCase();
        if (str.split('E').length === 2) { // scientific notation
            var isDecimal = false;
            if (str.split('.').length === 2) {
                str = str.split('.')[1];
                if (parseInt(str.split('E')[0]) !== 0) {
                    isDecimal = true;
                }
            }
            let x = str.split('E');
            if (isDecimal) {
                len = x[0].length;
            }
            len -= parseInt(x[1]);
        } else if (str.split('.').length === 2) { // decimal
            if (parseInt(str.split('.')[1]) !== 0) {
                len = str.split('.')[1].length;
            }
        }
    } catch(e) {
        throw e;
    } finally {
        if (isNaN(len) || len < 0) {
            len = 0;
        }
        return len;
    }
};
 
var convertToInt = function(num) {
    num = Number(num);
    var newNum = num;
    var times = countDecimals(num);
    var temp_num = num.toString().toUpperCase();
    if (temp_num.split('E').length === 2) {
        newNum = Math.round(num * Math.pow(10, times));
    } else {
        newNum = Number(temp_num.replace(".", ""));
    }
    return newNum;
};
 
var getCorrectResult = function(type, num1, num2, result) {
    var temp_result = 0;
    switch (type) {
        case "add":
            temp_result = num1 + num2;
            break;
        case "sub":
            temp_result = num1 - num2;
            break;
        case "div":
            temp_result = num1 / num2;
            break;
        case "mul":
            temp_result = num1 * num2;
            break;
    }
    if (Math.abs(result - temp_result) > 1) {
        return temp_result;
    }
    return result;
};
/////////////////////////////////////////////////////////
//用法
//加法：
 accAdd(0.1, 0.2)  // 得到结果：0.3
//减法： 
accSub(1, 0.9)    // 得到结果：0.1
//除法： 
accDiv(2.2, 100)  // 得到结果：0.022
//乘法： 
accMul(7, 0.8)    // 得到结果：5.6
 
 
countDecimals()//方法：计算小数位的长度
convertToInt()//方法：将小数转成整数
getCorrectResult()//方法：确认我们的计算结果无误，以防万一
/////////////////////////////////////////////////////

//web图片保存
function savePicture(Url) {
  var blob = new Blob([""], { type: "application/octet-stream" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = Url;
  a.download = Url.replace(/(.*\/)*([^.]+.*)/gi, "$2").split("?")[0];
  var e = document.createEvent("MouseEvents");
  e.initMouseEvent(
    "click",
    true,
    false,
    window,
    0,
    0,
    0,
    0,
    0,
    false,
    false,
    false,
    false,
    0,
    null
  );
  a.dispatchEvent(e);
  URL.revokeObjectURL(url);
}