// Variables
const localStorageKeyName = 'project-1-giphy-api-key';
const giphyBaseURL = 'https://api.giphy.com/v1/gifs/search?';

// Functions
function fetchWordGif(word){



  console.log(`Fetching gif for ${word}`);

  fetchGifListFromAPI(word);
}

function fetchGifListFromAPI(word){

  const queryString = giphyBaseURL + new URLSearchParams({
    api_key: getGiphyApiKey(),
    q: word,
    limit: 25,
    rating: 'pg-13',
    lang: 'en'
  }).toString();

  console.log('queryString: '+queryString);

  fetch(queryString)
    .then( response => {
      return response.json();
    })
    .then( function(data) {
      for(const gif in data.data){
        console.log(gif.embed_url);
      }
    })

}

function storeGiphyApiKey(apiKey) {
  localStorage.setItem(localStorageKeyName, apiKey);
}

function getGiphyApiKey() {
  return localStorage.getItem(localStorageKeyName);
}

// 4HdVzdGUtpYeFDMICwxKrXIaoXamfPZY

function writeGifToPage(gif){}

/* 
File Explaination (To Delete):

This file is responsible for collecting and returning a gif from the searched word

*/