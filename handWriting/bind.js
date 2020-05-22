Function.prototype.myBind = function myBind(content) {
  if (typeof this !== "function") {
    throw new Error(this + "not a function");
  }
  let fn = this;
  let args = [...arguments].splice(1);
  let res = function () {
    console.log(this);
    fn.apply(this instanceof res ? this : content, args.concat(...arguments));
  };
  res.prototype = Object.create(this.prototype);
  return res;
};
