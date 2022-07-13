import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config';

const app = express();

let port = process.env.PORT || 3000;
app.listen(port, console.log('running...'));
app.use(express.static('./public'));