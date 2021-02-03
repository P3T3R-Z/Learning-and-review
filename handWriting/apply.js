Function.prototype.myApply = function (content = window) {
  content.fn = this;
  console.log(this);
  let args = [...arguments].splice(1);
  let res = null;
  if (args) {
    res = content.fn(args);
  } else {
    res = content.fn();
  }
  delete content.fn;
  return res;
};
