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
    displayListData(data);
}

function displayListData(data) {
  let results = data.results;
  console.log(results);

  // const listData = {
  //   background: results.background_image,
  //   name: results.name,
  //   date: results.released,

  // }

  const wrapper = document.getElementById('game-list');
  results.forEach(result => {

    const listData = {
      background: result.background_image,
      name: result.name,
      date: result.released,
  
    }
    
    let html = `
      <div class='list__item flex'>
        <div class='list__img'>
          <img src=${listData.background} alt=${listData.name}>
        </div>
        <div class='list__item-details'>
          <p>${listData.name}</p>
          <div class='list__item-platforms'>
          
          </div>
        </div>
        <div class='list__release'>
          <p>${listData.date}</p>
        </div>
      </div>
    `
    wrapper.innerHTML += html;
  });
}

const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', (e) => {
    let value = searchInput.value;
    sessionStorage.setItem('name', value);
    console.log(value);
});