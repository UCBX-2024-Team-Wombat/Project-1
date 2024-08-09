// Variables

const searchInputEl = document.querySelector('#search-input');
const searchBtn = document.getElementById('search');
const apiKey = "948a3ec4-0862-47ce-bf63-b217e7cbcc75";

// Functions
/** Should I change the parameter to searchInputEl? It's used on line 135 */
function fetchWordInfo(word) {
  //set the URL for the fetch function
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;

  fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (wordData) {  //should this param be "word"?
      if (!wordData) {
        console.log(`No Results Found! Try Again.`);
      } else {
        const wordArray = [];

        for(const wordInfo of wordData) {
          const wordObj = {};
          //using API language for constant names so I can track what's what
          wordObj['headword'] = wordInfo.hwi.hw;
          // retrieve word type, not within hwi object
          wordObj['wordType'] = wordInfo.fl[0];
          // in the case of homographs, wordInfo should be the first word (most relevant)

          if('prs' in wordInfo.hwi) {
            if('mw' in wordInfo.hwi.prs) {
              wordObj['pronunciation'] = wordInfo.hwi.prs[0].mw; // wod = word of the day MW format
            }
            if('sound' in wordInfo.hwi.prs) {
              wordObj['wordAudio'] = wordInfo.hwi.prs[0].sound.audio;
            }
          }

          if('et' in wordInfo) {
            wordObj["etymology"] = wordInfo.et[0];

          }
          // const wordSentence = wordInfo.def.sseq[0].vis[0];

          wordArray.push(wordObj);
        };

/*
        saveWordToStorage(wordObj);
        createWordCard(word);


 */

        return wordObj;
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function createWordCard(word) {
  const wordCard = document.createElement('div');
  wordCard.classList.add('word-card');

  const wordName = document.createElement('div');
  wordName.classList.add('word-name');
  wordName.textContent = word.word;

  const wordType = document.createElement("div");
  wordType.classList.add("word-type");
  wordType.textContent = word.type;

  const wordPronunciation = document.createElement('div');
  wordPronunciation.classList.add('word-pronunciation');
  wordPronunciation.textContent = word.pronunc;

  const wordAudioPronunciation = document.createElement('div');
  wordAudioPronunciation.classList.add('word-audio-pronunciation');
  wordAudioPronunciation.textContent = word.audio;


  const wordEtymology = document.createElement('div');
  wordEtymology.classList.add('word-etymology');
  wordEtymology.textContent = word.etym;

  const wordSentence = document.createElement('div');
  wordSentence.classList.add('word-sentence');
  // wordSentence.textContent = word.example;

  // append each word element to the word card
  wordCard.appendChild(wordName); 
  wordCard.appendChild(wordPronunciation);
  wordCard.appendChild(wordAudioPronunciation);
  wordCard.appendChild(wordType);
  wordCard.appendChild(wordEtymology);
  wordCard.appendChild(wordSentence);  

  // append word card to the HTML box/element
  const wordInfoDiv = document.getElementById("word-info");
  wordInfoDiv.appendChild(wordCard);

  return wordCard;

}

// not sure if this needs to be here
// function renderWordInfo() {
//   createWordCard();
// }

function saveWordToStorage(wordInfo) {
  localStorage.setItem("wordInfo", JSON.stringify(wordInfo));
}


/* "hom #"" is for homonyms (homographs). For headword, try to restrict to 
the main/first definition (JSON: "hom":1 ) */
/* headword and pronunciation (text, audio) are stored in hwi object
https://dictionaryapi.com/products/json#sec-1 */
/* audio reference URL: https://media.merriam-webster.com/audio/prons/[language_code]/[country_code]/[format]/[subdirectory]/[base filename].[format]  */
/* prs array objects include mw (Merriam-Webster written pronunciation), pun (to
separate pronunciation objects), sound ("audio" member is only required member)  */
/* vis: Array of the form ["vis", [{object}]] where object is "t" : string */

//


function handleSearchSubmit(event) {
  event.preventDefault();

  const searchInputVal = searchInputEl.value;
  fetchWordInfo(searchInputVal);

}

// searchBtn.addEventListener('click', handleSearchSubmit);

// request URL: https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=948a3ec4-0862-47ce-bf63-b217e7cbcc75

/* 
File Explaination (To Delete):

This file is responsible for collecting core word data, including
- List of definitions
  - part of speech for each definition
  - "type of" information
  - Sentence examples
- Syllable info
*/