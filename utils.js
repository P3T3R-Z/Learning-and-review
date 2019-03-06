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

Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};
//new Date(new Date().getTime()).Format('yyyy-MM-dd')
//new Date(1551872469*1000).Format('yyyy-MM-dd')
// 判断时间差30min
function timeDiff(newdate, olddate) {
  if (newdate > olddate) {
    var timestamp_diff = newdate * 1000 - olddate * 1000;
    return timestamp_diff / 1000 > 60 * 30; //大于半小时
  } else {
    var timestamp_diff = olddate * 1000 - newdate * 1000;
    return timestamp_diff / 1000 > 60 * 30; //大于半小时
  }
}
//前或后几日数组
function getBeforetime(n) {
  var d = new Date();
  var timearray = [];
  for (var i = 0; i < Math.abs(n); i++) {
    var dd = d;
    dd = n < 0 ? dd - 1000 * 60 * 60 * 24 * i : dd + 1000 * 60 * 60 * 24 * i;
    dd = new Date(dd);
    var year = dd.getFullYear();
    var mon = dd.getMonth() + 1;
    var day = dd.getDate();
    var s =
      year +
      "-" +
      (mon < 10 ? "0" + mon : mon) +
      "-" +
      (day < 10 ? "0" + day : day);
    timearray.push(s);
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

function scrollAnimation(currentY, targetY) {
  // 获取当前位置方法
  // const currentY = document.documentElement.scrollTop || document.body.scrollTop

  // 计算需要移动的距离
  let needScrollTop = targetY - currentY;
  let _currentY = currentY;
  setTimeout(() => {
    // 一次调用滑动帧数，每次调用会不一样
    const dist = Math.ceil(needScrollTop / 10);
    _currentY += dist;
    window.scrollTo(_currentY, currentY);
    // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
    if (needScrollTop > 10 || needScrollTop < -10) {
      scrollAnimation(_currentY, targetY);
    } else {
      window.scrollTo(_currentY, targetY);
    }
  }, 1);
}
// const currentY = document.documentElement.scrollTop || document.body.scrollTop
// scrollAnimation(currentY, 0)

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
