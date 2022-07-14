import 'https://unpkg.com/swiper/swiper-bundle.min.js';
window.onload = async (e) => {
    const res = await fetch('/api');
    const data = await res.json();
    console.log(data);
    renderSlider(data);

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
  })

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