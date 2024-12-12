function isVisible(el) {
  const position = el.getBoundingClientRect();
  const windowHeight = document.documentElement.clientHeight;

  // 顶部边缘可见
  const topVisible = position.top > 0 && position.top < windowHeight;
  // 底部边缘可见
  const bottomVisible = position.bottom < windowHeight && position.bottom > 0;
  return topVisible || bottomVisible;
}
function setInfo(el) {
  const position = el.getBoundingClientRect();
  el.dataset.h = document.documentElement.clientHeight;
  el.dataset.top = position.top;
  el.dataset.bottom = position.bottom;
}

function imageLazyload() {
  const images = document.querySelectorAll("img");
  for (let img of images) {
    const realSrc = img.dataset.src;
    const id = img.dataset.id;
    setInfo(img);
    if (!realSrc) continue;
    if (isVisible(img)) {
      console.log(id);
      img.src = realSrc;
      img.dataset.src = "";
    }
  }
}

window.addEventListener("load", imageLazyload);
window.addEventListener("scroll", imageLazyload);

window.addEventListener("scroll", imageLazyload, 1000);
// window.addEventListener("scroll", throttle(imageLazyload, 1000));
