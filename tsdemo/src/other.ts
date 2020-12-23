namespace other {
  export class Header {
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

  console.log(123);
}

/** requirejs写法
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
