import express from "express";
import fetch from "node-fetch";
import dotenv from 'dotenv';


const app = express();
dotenv.config();

let port = process.env.PORT || 3000;
let KEY = process.env.API_KEY; // api key
app.listen(port, console.log("running..."));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

// send RAWG api data to hero section (thumbnail slider)
app.get("/api", async (req, res) => {
  let randomNumber = Math.floor(Math.random() * 50); // random number up to 50
  if (randomNumber < 1) randomNumber++;

  // fetch RAWG api
  const url = `https://api.rawg.io/api/games?key=${KEY}&page=${randomNumber}&ordering=-rating&metacritic=70,100`;
  const game_res = await fetch(url);
  const game_data = await game_res.json();

  res.json(game_data); // send fetched data
});

// send RAWG api data to draggable slider
app.get("/slider", async (req, res) => {
  let randomNumber = Math.floor(Math.random() * 151); // random number up to 150
  if (randomNumber < 1) randomNumber++;

  // fetch RAWG api
  const url = `https://api.rawg.io/api/games?key=${KEY}&page=${randomNumber}&metacritic=50,100`;
  const game_res = await fetch(url);
  const game_data = await game_res.json();

  res.json(game_data); // send fetched data
});

// send RAWG api game data, additions & screenshots according to requested ID
app.post("/games", async (req, res) => {
  const id = req.body.id;
  const url = `https://api.rawg.io/api/games/${id}?key=${KEY}`;
  const resp = await fetch(url);
  const data = await resp.json();

  const mediaUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=${KEY}&page_size=10`;
  const mediaResp = await fetch(mediaUrl);
  const mediaData = await mediaResp.json();

  const additionsUrl = `https://api.rawg.io/api/games/${id}/additions?key=${KEY}`;
  const additionsResp = await fetch(additionsUrl);
  const additionsData = await additionsResp.json();

  const movieUrl = `https://api.rawg.io/api/games/${id}/movies?key=${KEY}`;
  const movieResp = await fetch(movieUrl);
  const movieData = await movieResp.json();

  const dataObject = {
    game_data: data,
    media_data: mediaData,
    additions: additionsData,
    trailer: movieData
  };

  res.json(dataObject);
});

// send RAWG api data according to requested name
app.post('/list', async (req, res) => {
  const name = req.body.name;
  const url = `https://api.rawg.io/api/games?key=${KEY}&search=${name}&search_precise=true&search_exact=true&exclude_additions=true&ordering=-rating&page_size=7&metacritic=10,100`;
  const resp = await fetch(url);
  const data = await resp.json();

  res.json(data);
})
