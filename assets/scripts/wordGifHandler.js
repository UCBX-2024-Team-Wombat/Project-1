// Variables
const localStorageKeyName = 'project-1-giphy-api-key';
const giphyBaseURL = 'https://api.giphy.com/v1/gifs/search?';

// Functions
function fetchWordGif(word){
  // Create callout string
  const queryString = giphyBaseURL + new URLSearchParams({
    api_key: getGiphyApiKey(),
    q: word,
    limit: 25,
    rating: 'pg-13',
    lang: 'en'
  }).toString();

  // Make callout
  fetch(queryString)
    .then( response => {
      // Format infoStream to Json
      return response.json();
    })
    .then( function(data) {
      // Create list for returned gif links
      const availableGifEmbedLinks = []

      // Populate list with embed urls from returned data
      for(const gif of data.data){
        availableGifEmbedLinks.push(gif.embed_url);
      }

      // Get random index from available links
      const randomIndex = getRandomInteger(availableGifEmbedLinks.length);

      // Render selected gif embed link
      renderGif(availableGifEmbedLinks[randomIndex]);
    })
}

function renderGif(gifEmbedLink){
  // Clear default text of embedSlot (provided by index.js)
  embedSlot.innerText = '';

  // Create new embed element and populate with link
  const embedElement = document.createElement('embed');
  embedElement.src = gifEmbedLink;
  embedElement.height = '100%';
  embedElement.width = '100%';

  // Append to render
  embedSlot.appendChild(embedElement);
}

// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random 
function getRandomInteger(items){
  return Math.floor(Math.random() * items);
}

// Utility methods for storing and retrieving giphy api key
function storeGiphyApiKey(apiKey) {
  localStorage.setItem(localStorageKeyName, apiKey);
}

function getGiphyApiKey() {
  return localStorage.getItem(localStorageKeyName);
}