import express from "express";
import fetch from "node-fetch";
import "dotenv/config";

const app = express();

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
  const url = `https://api.rawg.io/api/games?key=${KEY}&page=${randomNumber}`;
  const game_res = await fetch(url);
  const game_data = await game_res.json();

  res.json(game_data); // send fetched data
});

// send RAWG api data to draggable slider
app.get("/slider", async (req, res) => {
  let randomNumber = Math.floor(Math.random() * 151); // random number up to 150
  if (randomNumber < 1) randomNumber++;

  // fetch RAWG api
  const url = `https://api.rawg.io/api/games?key=${KEY}&page=${randomNumber}`;
  const game_res = await fetch(url);
  const game_data = await game_res.json();

  res.json(game_data); // send fetched data
});

// send RAWG api data & screenshots according to requested ID
app.post("/games", async (req, res) => {
  const id = req.body.id;
  const url = `https://api.rawg.io/api/games/${id}?key=${KEY}`;
  const resp = await fetch(url);
  const data = await resp.json();

  const mediaUrl = `https://api.rawg.io/api/games/${id}/screenshots?key=${KEY}&page_size=10`;
  const mediaResp = await fetch(mediaUrl);
  const mediaData = await mediaResp.json();

  const dataObject = {
    game_data: data,
    media_data: mediaData,
  };

  res.json(dataObject);
});

app.post('/list', async (req, res) => {
  const name = req.body.name;
  const url = `https://api.rawg.io/api/games?key=${KEY}&search=${name}&search_precise=true&ordering=-rating&page_size=10&exclude_additions=true`;
  const resp = await fetch(url);
  const data = await resp.json();

  res.json(data);
})
