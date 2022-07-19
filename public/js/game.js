import 'https://unpkg.com/swiper/swiper-bundle.min.js';

window.onload = async () => {
    // console.log(sessionStorage.getItem('id'))

    const id = {id: sessionStorage.getItem('id')}
    console.log(id);

    const options = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        // body: JSON.stringify(id)
        body: JSON.stringify(id)
    };
    



    const res = await fetch('/games', options);
    const data = await res.json();
    console.log(data);

    const game_data = data.game_data;
    displayGameData(game_data);
    
    
    const media_data = data.media_data;
    
    
}






function displayGameData(data) {
    const wrapper = document.getElementById('game-details');

    // const genres = data.tags.forEach( item => {
    //     return item.name;
    // })

    const genres = data.tags;
    let tagNames = genres.map((genre) => genre.name).slice(0, 5).join(', ');
    // const tags = genres.map(tag => {
    //     return tag.name;
    // });
    console.log(genres);

    // for(let i = 0; i < tags.length; i++) {
    //     console.log(tags[i]);
    // }

    console.log('HELLO', tagNames);

    
    const gameData = {
        background: data.background_image,
        name: data.name,
        date: data.released,
        description: data.description,
        tags: tagNames
    }

    console.log(gameData.tags)

    let html = `
        <div class='game__img'>
            <img src=${gameData.background} alt=${gameData.name}>
        </div>
        <div class='game__desc'>
            <p>${gameData.description}</p>
        </div>
        <div class='game__reviews'>
            <p>Reviews: 50</p>
        </div>
        <div class='game__release'>
            <p>Released: ${gameData.date}</p>
        </div>
        <div class='game__tags flex'>
            <p>${gameData.tags}</p>
        </div>
    `;
    

    wrapper.innerHTML = html;

    
}
