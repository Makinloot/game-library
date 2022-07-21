window.onload = async () => {
    const name = { name: sessionStorage.getItem("name") };
    console.log(name);
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name),
    };

    const res = await fetch('/list', options);
    const data = await res.json();

    console.log(data);
    if(data.count > 0) {
      displayListData(data);
    } else {
      displayError();
    }
}

// display data for search.html
function displayListData(data) {
  let results = data.results;

  const wrapper = document.getElementById('game-list');
  results.forEach(result => {

    const listData = {
      background: result.background_image,
      name: result.name,
      date: result.released,
      id: result.id
    }
    
    let html = `
      <a href='../html/game.html' title=${listData.id} class='list__item flex'>
        <div class='list__img'>
          <img src=${listData.background} alt=${listData.name}>
        </div>
        <div class='list__item-details'>
          <p>${listData.name}</p>
          <div class='list__item-platforms'>
          
          </div>
        </div>
        <div class='list__release'>
          <p>Released: ${listData.date}</p>
        </div>
      </a>
    `
    wrapper.innerHTML += html;
  });

  // get id from clicked element and save in session storage
  const items = document.querySelectorAll('.list__item');
  items.forEach(item => {
    item.addEventListener('click', (e) => {
      let id = e.target.attributes.title.value;
      sessionStorage.setItem('id', id);
    })
  })
}

// display error if no data is returned
function displayError() {
  const wrapper = document.getElementById('game-list');
  let html = `
    <div class='game__error-wrapper flex'>
      <p>0 results match your search</p>
    </div>`;
  wrapper.innerHTML = html;
}

// get id from clicked element and save in session storage

const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', (e) => {
    let value = searchInput.value;
    sessionStorage.setItem('name', value);
});