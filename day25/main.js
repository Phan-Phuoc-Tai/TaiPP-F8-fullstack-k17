// - item.width ?
// - quantity item ?
// - slide: width = n * (quantity)item * item.width
// - create dot

//get Element Node
const slideEl = document.querySelector(".slide");
const slideInnerEl = slideEl.querySelector(".slide_inner");
const slideNavEl = slideEl.querySelector(".slide_nav");
const slideDotsEl = slideEl.querySelector(".slide_dots");

//calc width : slideInner, item
const childrenSlides = slideInnerEl.children;
const widthSlideInner = slideInnerEl.clientWidth * childrenSlides.length;
slideInnerEl.style.width = `${widthSlideInner}px`;

for (let childrenSlide of childrenSlides) {
  let widthImgEl = childrenSlide.clientWidth;
  childrenSlide.style.width = `${widthImgEl}px`;
  const dotEl = document.createElement("span");
  slideDotsEl.append(dotEl);
  dotEl.classList.add("dot");
}

//dotActive function
const dotActive = (e) => {
  const dotEl = e.target;
  const dotActiveEl = slideDotsEl.querySelector(".active");
  dotActiveEl.classList.remove("active");
  dotEl.classList.add("active");
};

//datasetIndex, add class active
const dotList = slideEl.querySelectorAll(".dot");
dotList.forEach((dot, index) => {
  dot.dataset.index = index + 1;
  if (dot.dataset.index === "1") {
    dot.classList.add("active");
  }
  dot.onclick = (e) => {
    dotActive(e);
    const itemEl = slideInnerEl.querySelector(".item");
    const indexDotActive = +dot.dataset.index;
    const coordinatesItem =
      itemEl.style.width.replace("px", "") * (indexDotActive - 1);
    Object.assign(slideInnerEl.style, {
      transform: `translateX(${-coordinatesItem}px)`,
    });
  };
});

//previous
const previousIcon = slideNavEl.querySelector(".previous");
previousIcon.addEventListener("click", () => {
  const dotActiveEl = slideDotsEl.querySelector(".active");
  const itemEl = slideInnerEl.querySelector(".item");
  const indexDotActive = +dotActiveEl.dataset.index;
  const coordinatesItemActive = 0;
  const coordinatesNextItem =
    itemEl.style.width.replace("px", "") * (indexDotActive - 2);
  let calcTranslateX = coordinatesItemActive - coordinatesNextItem;
  if (calcTranslateX <= 0) {
    dotActiveEl.classList.remove("active");
    dotActiveEl.previousElementSibling.classList.add("active");
    Object.assign(slideInnerEl.style, {
      transform: `translateX(${calcTranslateX}px)`,
    });
  }
});

//next
const nextIcon = slideNavEl.querySelector(".next");
nextIcon.addEventListener("click", () => {
  const widthSlideInner = slideInnerEl.style.width.replace("px", "");
  const dotActiveEl = slideDotsEl.querySelector(".active");
  const itemEl = slideInnerEl.querySelector(".item");
  const indexDotActive = +dotActiveEl.dataset.index;
  const coordinatesItemActive = 0;
  const coordinatesNextItem =
    itemEl.style.width.replace("px", "") * indexDotActive;
  let calcTranslateX = coordinatesItemActive - coordinatesNextItem;
  if (Math.abs(calcTranslateX) < widthSlideInner) {
    dotActiveEl.classList.remove("active");
    dotActiveEl.nextElementSibling.classList.add("active");
    Object.assign(slideInnerEl.style, {
      transform: `translateX(${calcTranslateX}px)`,
    });
  }
});
