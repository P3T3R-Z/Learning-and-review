
//命名空间写法
namespace Home {
  export namespace wang {
    export class test {
      constructor() {
        console.log("嵌套命名空间: Home->wang->test");
      }
    }
  }

  export class Page {
    constructor() {
      new other.Header();
      new other.Content();
      new other.Footer();
    }
  }
}


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
