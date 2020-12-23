"use strict";
var other;
(function (other) {
    var Header = /** @class */ (function () {
        function Header() {
            var el = document.createElement("div");
            el.innerText = "Header";
            document.body.appendChild(el);
        }
        return Header;
    }());
    other.Header = Header;
    var Content = /** @class */ (function () {
        function Content() {
            var el = document.createElement("div");
            el.innerText = "Content";
            document.body.appendChild(el);
        }
        return Content;
    }());
    other.Content = Content;
    var Footer = /** @class */ (function () {
        function Footer() {
            var el = document.createElement("div");
            el.innerText = "Footer";
            document.body.appendChild(el);
        }
        return Footer;
    }());
    other.Footer = Footer;
    console.log(123);
})(other || (other = {}));
/** requirejs写法时全都暴露
 * export class Header {
    constructor() {
      const el = document.createElement("div");
      el.innerText = "Header";
      document.body.appendChild(el);
    }
  }

  export class Content {
    constructor() {
      const el = document.createElement("div");
      el.innerText = "Content";
      document.body.appendChild(el);
    }
  }

  export class Footer {
    constructor() {
      const el = document.createElement("div");
      el.innerText = "Footer";
      document.body.appendChild(el);
    }
  }
 *
 * **/
//命名空间写法
var Home;
(function (Home) {
    var wang;
    (function (wang) {
        var test = /** @class */ (function () {
            function test() {
                console.log("嵌套命名空间: Home->wang->test");
            }
            return test;
        }());
        wang.test = test;
    })(wang = Home.wang || (Home.wang = {}));
    var Page = /** @class */ (function () {
        function Page() {
            new other.Header();
            new other.Content();
            new other.Footer();
        }
        return Page;
    }());
    Home.Page = Page;
})(Home || (Home = {}));
// requirejs时的引入写法
// import { Header, Content, Footer } from "./other";
// export namespace wang {
//   export class test {
//     constructor() {
//       console.log("嵌套命名空间: Home->wang->test");
//     }
//   }
// }
// export class Page {
//   constructor() {
//     new Header();
//     new Content();
//     new Footer();
//   }
// }
