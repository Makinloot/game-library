import "https://unpkg.com/swiper/swiper-bundle.min.js";

window.onload = async (e) => {
  const res = await fetch("/api");
  const data = await res.json();
  console.log(data);
  renderSlider(data);
  random150();
  swiperFree();
};

async function random150() {
  const s_res = await fetch("/slider");
  const s_data = await s_res.json();

  sliderData(s_data);
  idInSession();
}

// get data for hero section slider from api, initialize slider, add change slider function
function renderSlider(data) {
  // return 5 random objects from data.results array without repeatin the same object
  const results = data.results;
  const choices = results.sort(() => Math.random() - 0.5).slice(0, 5);

  // display data for current image
  const currentImg = document.getElementById("current-img");
  const imagesArray = document.getElementById("thumbnail-images");
  let currentBG = choices[0].background_image;
  let mainHeader = choices[0].name;
  let currentID = choices[0].id;

  currentImg.innerHTML = `
    <img src=${currentBG} alt=${mainHeader} id='current'>
    <h2 id='current-header'>${mainHeader}</h2>
    <a href='../html/game.html' class='checkout-game' id='${currentID}'>CHECK OUT</a>
  `;

  // go to game.html page with clicked ID data 
  const checkoutGame = document.querySelector('.checkout-game');
  checkoutGame.addEventListener('click', (e) => {
    let id = e.target.id;
    sessionStorage.setItem('id', id);
  })

  // display data for thumbnail
  choices.forEach((choice) => {
    const root = `
      <div class='thumbnail-item flex'>
        <img src=${choice.background_image} alt=${choice.name}>
        <h3>${choice.name}</h3>
        <span>${choice.id}</span>
      </div>`;
    imagesArray.innerHTML += root;
  });

  const thumbImages = document.querySelectorAll(".thumbnail-item");
  // change main img on thumbnail click
  thumbImages.forEach((item) => {
    item.addEventListener("click", (e) => {
      currentImg.innerHTML = ""; // delete current img HTML
      const children = []; // push clicked element in children array
      children.push(e.target);
      console.log(e.target)
      // elements from children array
      let imgSrc = children[0].children[0].src;
      let headingTxt = children[0].children[1].innerText;
      let gameID = children[0].children[2].innerText;
      // display children array HTML in current img HTML
      currentImg.innerHTML = `
        <img src=${imgSrc} alt=${headingTxt} id='current'>
        <h2 id='current-header'>${headingTxt}</h2>
        <a href='../html/game.html' class='checkout' id='${gameID}'>CHECK OUT</a>
        `;

        // go to game.html page with clicked ID data 
        const checkoutLink = document.querySelector('.checkout');
        checkoutLink.addEventListener('click', (e) => {
          let id = e.target.id;
          sessionStorage.setItem('id', id);
        })
    });

    
  });

}

// initialize swiperjs slider

function swiperFree() {
  const { width } = document.body.getBoundingClientRect();
  let slidePerView = 4.8;

  if (width < 1024) slidePerView = 3.5;
  if (width < 768) slidePerView = 3;
  if (width < 640) slidePerView = 2.5;
  if (width < 525) slidePerView = 2.2;
  if (width < 480) slidePerView = 1.8;
  if (width < 385) slidePerView = 1.5;
  if (width < 320) slidePerView = 1.3;

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: slidePerView,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

// get data for draggable slider
function sliderData(data) {
  // slider paths
  const sliderWrapper = document.getElementById("free-mode-slider");
  let sliderItems = data.results;
  // console.log(sliderItems);
  sliderItems.forEach((item) => {
    let genres = item.genres
      .map((genre) => genre.name)
      .slice(0, 2)
      .join(", "); // select first two name from genres array
    let sliderPaths = {
      img: item.background_image,
      name: item.name,
      genre: genres,
      rating: item.rating,
      ratings_count: item.ratings_count,
      id: item.id,
    };

    // slider HTML
    sliderWrapper.innerHTML += `
       <div class='slider__swiper-slide swiper-slide'>
           <a href='../html/game.html' class='slider-img'>
               <img src=${sliderPaths.img} alt=${sliderPaths.name} id=${sliderPaths.id}>
           </a>
       <div class='slider-details'>
               <h3 class='slider-heading'>${sliderPaths.name}</h3>
               <h4 class='slider-genre'>${sliderPaths.genre}</h4>
               <span>Ratings: ${sliderPaths.rating} <span class='slider-ratings-count'>(${sliderPaths.ratings_count})</span></span>
           </div>
       </div>
    `;
  });
}

// returns clicked item id and saves in session storage
function idInSession() {
  const games = document.querySelectorAll(".swiper-slide");
  games.forEach((game) => {
    game.addEventListener("click", (e) => {
      let id = e.target.id;
      sessionStorage.setItem("id", id);
    });
  });
}


const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', (e) => {
    let value = searchInput.value;
    sessionStorage.setItem('name', value);
    console.log(value);
});