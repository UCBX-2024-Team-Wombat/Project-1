// Variables


// Functions
function fetchWordGif(word){
  console.log(`Fetching gif for ${word}`);

  fetchGifListFromAPI(word)
  .then( gifs => {
    // get random gif from among gifs
    const gif = '';
    writeGifToPage(gif);
  })

}

function fetchGifListFromAPI(word){}

function writeGifToPage(gif){}

/* 
File Explaination (To Delete):

This file is responsible for collecting and returning a gif from the searched word

*/