const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Define a route for handling GET requests
app.get('/', (req, res) => {
    // Your microservice logic here
    const inputString = req.query.startingLocation;
    const jsonResponse = handleSearch(inputString)
    // Send the response as JSON
    res.json(jsonResponse);
});
  
  async function handleSearch(selectedCity) {
    const apiKey = '07b953ac32c1e1c6b2407464986e0f65';
    // Fetch Last.fm tracks
    try {
        const response = await fetchLastFmTracks(apiKey, selectedCity);
        return response
        
    } catch (error) {
        console.error('Error fetching tracks:', error);
    }
  }

  async function fetchLastFmTracks(apiKey, query) {
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${apiKey}&format=json`);
    return await response.json();
  }
  
  // Start the server
app.listen(PORT, () => {
    console.log(`Microservice is running on http://localhost:${PORT}`);
});