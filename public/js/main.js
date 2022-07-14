window.onload = async (e) => {
    const res = await fetch('/api');
    const data = await res.json();
    console.log(data);
    renderSlider(data);
    sliderData(data);

}

// get data for hero section slider from api, initialize slider, add change slider function
function renderSlider(data) {
  // return 5 random objects from data.results array without repeatin the same object
  const results = data.results;
  const choices = results.sort(() => Math.random() - 0.5).slice(0, 5);

  // display data for current image 
  const currentImg = document.getElementById('current-img');
  const imagesArray = document.getElementById('thumbnail-images');  
  let currentBG = choices[0].background_image;
  let mainHeader = choices[0].name;

  currentImg.innerHTML = `
    <img src=${currentBG} alt=${mainHeader} id='current'>
    <h2 id='current-header'>${mainHeader}</h2>
  `;

  // display data for thumbnail
  choices.forEach( choice => {
    const root = `
      <div class='thumbnail-item flex'>
        <img src=${choice.background_image} alt=${choice.name}>
        <h3>${choice.name}</h3>
      </div>`;
    imagesArray.innerHTML += root;
  });

  const thumbImages = document.querySelectorAll('.thumbnail-item');
  // change main img on thumbnail click
  thumbImages.forEach(item => {
    item.addEventListener('click', (e) => {
      // delete current img HTML
      currentImg.innerHTML = '';
      // push clicked element in children array
      const children = [];
      children.push(e.target);
      // elements from children array
      let imgSrc = children[0].children[0].src;
      let headingTxt = children[0].children[1].innerText;
      // display children array HTML in current img HTML
      currentImg.innerHTML = `
        <img src=${imgSrc} alt=${headingTxt} id='current'>
        <h2 id='current-header'>${headingTxt}</h2>
        `;
    });
  });
}

// initialize swiperjs slider
import 'https://unpkg.com/swiper/swiper-bundle.min.js';
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4.8,
  spaceBetween: 30,
  freeMode: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

// get data for draggable slider
function sliderData(data) {
  // slider paths
  const sliderWrapper = document.getElementById("free-mode-slider");
  let sliderItems = data.results;
  // console.log(sliderItems);
  sliderItems.forEach((item) => {
    let genres = item.genres.map((genre) => genre.name).slice(0, 2).join(', '); // select first two name from genres array
    let sliderPaths = {
      img: item.background_image,
      name: item.name,
      genre: genres,
      rating: item.rating,
      ratings_count: item.ratings_count
    };

    // slider HTML
    sliderWrapper.innerHTML += `
       <div class='swiper-slide'>
           <div class='swiper-img'>
               <img src=${sliderPaths.img} alt=${sliderPaths.name}>
           </div>
       <div class='swiper-details'>
               <h3 class='swiper-heading'>${sliderPaths.name}</h3>
               <h4 class='swiper-genre'>${sliderPaths.genre}</h4>
               <span>Ratings: ${sliderPaths.rating} <span class='swiper-ratings-count'>(${sliderPaths.ratings_count})</span></span>
           </div>
       </div>
    `;
  });
}