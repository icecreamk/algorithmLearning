const box = document.getElementsByClassName("box")[0];

class HashRouter {
  constructor(hashStr, cb) {
    this.hashStr = hashStr;
    this.cb = cb;
    this.watch = this.refresh.bind(this);
    this.init();
  }

  refresh() {
    this.hashStr = window.location.hash.slice(1);
    console.log(this.hashStr);
    this.cb(this.hashStr);
  }

  init() {
    this.cb(this.hashStr);
    window.addEventListener("hashchange", this.watch);
  }
}

new HashRouter("red", (color) => {
  console.log(color, box);
  box.style.backgroundColor = color;
});

