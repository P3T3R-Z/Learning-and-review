class EventBus {
  constructor() {
    this._events = new Map();
  }
  once(event, action, fn) {
    this.on(event, action, fn, true);
  }
  on(event, action, fn, once = false) {
    this._events.set(event, [
      ...(this._events.get(event) || []),
      { action, fn, once },
    ]);
  }
  has(event) {
    return this._events.has(event);
  }
  emit(event, data) {
    if (!this.has(event)) {
      return false;
    }
    let arr = this._events.get(event);
    arr.forEach((i) => {
      i.fn(data);
      if (i.once) {
        this.off(event, data);
      }
    });
  }
  off(event, action) {
    if (!this.has(event)) {
      return false;
    }
    let arr = this._events.get(event);
    let newdata = arr.filter((i) => i.action !== action);
    this._events.set(event, [...newdata]);
  }
}
const bus = new EventBus();


//同时注册多个事件, 互不影响
bus.on("hi", "go", function (data) {
  console.log(`go:${data}`);
});
bus.on("hi", "go2", function (data) {
  console.log(`go2:${data}`);
});

bus.emit("hi", 123213);
//注销事件
bus.off("hi", "go2");
