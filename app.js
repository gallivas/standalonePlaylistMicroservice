'use strict';

const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors({
  origin: "http://localhost:3500",
})
);

app.use(express.json());

app.use(express.static('.'));

app.use(express.urlencoded({
    extended: true
}));

// Define a route for handling GET requests
app.get('/standalonePlaylistMicroservice/microservice', (req, res) => {
    // Your microservice logic here
    const inputString = req.query.startingLocation;
    // console.log(inputString);
    const jsonResponse = handleSearch(inputString);
    console.log(jsonResponse); // LEFT OFF HERE
    // Send the response as JSON
    res.json(jsonResponse);
});
  
async function handleSearch(selectedCity) {
  const apiKey = '07b953ac32c1e1c6b2407464986e0f65';
  // Fetch Last.fm tracks
  console.log(selectedCity);
  try {
      const response = await fetchLastFmTracks(apiKey, selectedCity);
      console.log(response);
      // return response;
      
  } catch (error) {
      console.error('Error fetching tracks:', error);
  }
}

async function fetchLastFmTracks(apiKey, query) {
  const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${apiKey}&format=json`);
  // console.log(response);
  return await response.json();
}
  
// app.get('/', (req, res) => {
//   const testGet = handleSearch("Lewes");
//   res.send(testGet);
// });

  // Start the server
app.listen(PORT, () => {
    console.log(`Microservice is running on http://localhost:${PORT}`);
});