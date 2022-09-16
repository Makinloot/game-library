import "https://unpkg.com/swiper/swiper-bundle.min.js";

window.onload = async () => {
  // console.log(sessionStorage.getItem('id'))

  const id = { id: sessionStorage.getItem("id") };
  console.log(id);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id),
  };

  // fetch game data & media data
  const res = await fetch("/games", options);
  const data = await res.json();
  console.log(data);

  const game_data = data.game_data;
  displayGameData(game_data);

  const media_data = data.media_data;
  displayGameSliderData(media_data);
  runSlider();

  const additions_data = data.additions;
  const trailer_data = data.trailer;
  let count = additions_data.count;
  let trailerCount = trailer_data.count;
  ifDataExists(count, displayGameAdditions(additions_data));
  ifDataExists(trailerCount, displayTrailer(trailer_data));
};

// if data doesn't exist ignore it
function ifDataExists(int, func) {
  if(int === 0) return;
  else func;
}

// data for game details
function displayGameData(data) {
  const wrapper = document.getElementById("game-details");
  const nameElement = document.getElementById("game-name");

  // return 3 genre from genres
  const genres = data.tags;
  let tagNames = genres
    .map((genre) => genre.name)
    .slice(0, 3)
    .join(", ");
  // return maximum 3 publishers from publishers
  const publishers = data.publishers;
  let publishersNames = publishers
    .map((publisher) => publisher.name)
    .join(", ");

  // game data object
  const gameData = {
    background: data.background_image,
    name: data.name,
    date: data.released,
    description: data.description,
    tags: tagNames,
    reviews_title: data.ratings[0].title,
    reviews_percent: data.ratings[0].percent,
    reviews_count: data.ratings_count,
    publishers: publishersNames,
  };

  let html = `
        <div class='game__img'>
            <img src=${gameData.background} alt=${gameData.name}>
        </div>
        <div class='game__info flex'>
            <div class='game__reviews'>
                <p>All Reviews: ${gameData.reviews_count}</p>
                <p>Mostly: ${gameData.reviews_title} <span>${gameData.reviews_percent}%</span></p>
            </div>
            <div class='game__release'>
                <p>Released: ${gameData.date}</p>
            </div>
            <div class='game__publishers'>
              <p>Publishers: ${gameData.publishers}</p>
            </div>
            <div class='game__tags flex' id='game-tag'>
                <div>Genres: ${gameData.tags} </div>
            </div>
            <div class='game__desc'>
                <p>${gameData.description}</p>
            </div>
        </div>
    `;

  wrapper.innerHTML = html;
  nameElement.innerHTML = gameData.name;
}

// slider containing data from game media data
function displayGameSliderData(data) {
  const wrapper = document.getElementById("game-slider-main");

  const screenshots = data.results;
  screenshots.forEach((item) => {
    const sliderItem = `
            <div class='game__swiper-slide swiper-slide'>
                <img src=${item.image} alt='game screenshot'>
            </div>
        `;

    wrapper.innerHTML += sliderItem;
  });
}

// game trailers
function displayTrailer(data) {
  const wrapper = document.getElementById("game-slider-main");
  const sliderItem = `
  <div class='game__swiper-slide swiper-slide' id='first-slide'>
      <video controls>
        <source src=${data.results[0].data.max} type='video/mp4'>
      </video>
  </div>
`;

wrapper.innerHTML += sliderItem;
}

// initialize swiper
function runSlider() {
  const swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  // var swiper = new Swiper(".mySwiper", {
  //   loop: true,
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  //   },
  // });
}

// display game additions data
function displayGameAdditions(data) {
  const wrapper = document.getElementById('additions-wrapper');
  const heading = document.getElementById('additions-heading');
  const results = data.results;

  results.forEach(result => {
    const name = result.name;
    const id = result.id;

    let html = `
      <a href='../html/game.html' class='additions__item' id=${id}>${name}</a>
    `;

    wrapper.innerHTML += html;
  });

  // if(wrapper.childNodes === heading) console.log('red');
  // else console.log('black');

  const wrapperItems = document.querySelectorAll('.additions__item');
  wrapperItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const id = e.target.id;
      sessionStorage.setItem('id', id);
    })
  });
}

// // game trailers
// function displayTrailer(data) {
//   const wrapper = document.getElementById("game-slider-main");
//   const sliderItem = `
//   <div class='game__swiper-slide swiper-slide' id='first-slide'>
//       <img src='../images/test.jpg'>
//   </div>
// `;

// wrapper.innerHTML += sliderItem;
// }

const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", (e) => {
  let value = searchInput.value;
  sessionStorage.setItem("name", value);
});
