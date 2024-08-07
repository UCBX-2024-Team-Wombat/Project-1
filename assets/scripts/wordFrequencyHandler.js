// Variables


// Functions
function fetchWordFrequency(word){
  console.log(`Fetching frequency for ${word}`);
  fetchFrequencyFromAPI(word)
  .then((parsedData) => {
    writeFrequencyChartToPage(parsedData);
  })  
}

function fetchFrequencyFromAPI(word){}

function writeFrequencyChartToPage(frequencyData){}

/* 
File Explaination (To Delete):

This file is responsible for collecting frequency data from the searched word
and displaying it (graphically)

*/