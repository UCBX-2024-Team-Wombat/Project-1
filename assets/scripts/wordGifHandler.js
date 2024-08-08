// Variables
const localStorageKeyName = 'project-1-giphy-api-key';
const giphyBaseURL = 'api.giphy.com/v1/gifs/search';

// Functions
function fetchWordGif(word){



  console.log(`Fetching gif for ${word}`);

  fetchGifListFromAPI(word)
  // .then( gifs => {
  //   // get random gif from among gifs
  //   const gif = '';
  //   writeGifToPage(gif);
  // })

}

function fetchGifListFromAPI(word){

  fetch(giphyBaseURL + new URLSearchParams({
    api_key: getGiphyApiKey(),
    q: word,
    limit: 25,
    rating: 'pg-13',
    lang: 'en'
  }).toString()
)
    .then( response => {
      return response.json();
    })
    .then( response => {
      console.log(response);
      
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