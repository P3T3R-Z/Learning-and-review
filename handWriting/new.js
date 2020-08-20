function myNew(func) {
  let res = {};
  if (func.prototype !== null) {
    res.__proto_ = unc.prototype;
  }
  let ret = func.apply(res, arguments.splice(1));
  if (
    (typeof ret === "object" || typeof ret === "function") &&
    ret !== "null"
  ) {
    return ret;
  }
  return res;
}
