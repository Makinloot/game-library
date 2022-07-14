import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';

const app = express();

let port = process.env.PORT || 3000;
app.listen(port, console.log('running...'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

// send RAWG api data to client
app.get('/api', async (req, res) => {
    let KEY = process.env.API_KEY; // api key
    let randomNumber = Math.floor(Math.random() * 50); // random number up to 50
    if(randomNumber < 1) randomNumber++;

    // fetch RAWG api
    const url = `https://api.rawg.io/api/games?key=${KEY}&page=${randomNumber}`;
    const game_res = await fetch(url);
    const game_data = await game_res.json();

    res.json(game_data); // send fetched data
})