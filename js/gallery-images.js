if (put_images) {
  const divs = document.getElementsByClassName("gallery_item")
  let src = ''
  for (let i = 0; i < max_imgs; ++i) {
    const img = document.createElement('img');
    const a = document.createElement('a');
    if (typeof special_img !== 'undefined')
      img.setAttribute("style", "width: 320px;");
    src = game_imgs[i];
    a.href = src;
    a.setAttribute('class', 'gallery__href');
    img.src = src;
    a.setAttribute('data-fancybox', 'images');
    a.appendChild(img);
    divs.item(i).appendChild(a);
  }
}

//tns-carrousel
const carousel_gallery = tns({
  container: '.sw-gallery', nav: false, arrowKeys: false, useLocalStorage: false,
  items: 1,
  nextButton: '.gallery_next', prevButton: '.gallery_prev',
  gutter: 2,
  slideBy: 1,
  swipeAngle: false,
  autoplayHoverPause: true,
  autoplayButtonOutput: false,
  mouseDrag: true,
  loop: false,
  rewind: true
});