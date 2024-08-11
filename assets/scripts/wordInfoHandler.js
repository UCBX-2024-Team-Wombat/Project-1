// Variables

const searchInputEl = document.getElementById("searched-word");
const searchBtn = document.getElementById("search");
const apiKey = "948a3ec4-0862-47ce-bf63-b217e7cbcc75";
const wordTypeMap = {
  'n': 'Noun',
  'a': 'Adjective',
  'v': 'Verb'
}

// Functions

function fetchWordInfo(word) {
  //set the URL for the fetch function
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;
  console.log("url");
  console.log(url);

  fetch(url)
    .then(function (response) {
      console.log("response");
      console.log(response);
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (wordData) {
      console.log("wordData");
      console.log(wordData);

      const wordArray = [];

      for (const wordInfo of wordData) {
        if ("hom" in wordInfo) {
          const wordObj = {};
          //hw is the API identifier for the searched word
          wordObj["headword"] = wordInfo.hwi.hw.replace(/\*/gi, "");
          // retrieve word type, not within hwi object
          wordObj["wordType"] = wordInfo.fl[0];
          // in the case of homographs, wordInfo should be the first word (most relevant)

          if ("prs" in wordInfo.hwi) {
            if ("mw" in wordInfo.hwi.prs) {
              wordObj["pronunciation"] = wordInfo.hwi.prs[0].mw; // wod = word of the day MW format
            }
            if ("sound" in wordInfo.hwi.prs) {
              wordObj["wordAudio"] = wordInfo.hwi.prs[0].sound.audio;
            }
          }

          if ("et" in wordInfo) {
            wordObj["etymology"] = wordInfo.et[0];
          }

          getDefinitions(wordInfo, wordObj);
          console.log('wordObj.definition');
          console.log(wordObj.definition);
          wordArray.push(wordObj);
        }
      }

      console.log('wordArray');
      console.log(wordArray);

      if (wordArray.length == 0) {
        const wordNotFound = document.getElementById("results");
        wordNotFound.style.fontStyle = "bold";
        wordNotFound.style.fontSize = "24px";
        wordNotFound.style.color = "red";
        wordNotFound.innerHTML =
          "<h3>No results found! Please check spelling and try again.</h3>";
      }
      else {
        writeWordInfo(wordArray);
      }
    })
    .catch(function (error) {
      console.log('error');
      console.log(error);
      const somethingWentWrong = document.getElementById("results");
      somethingWentWrong.style.fontStyle = "bold";
      somethingWentWrong.style.fontSize = "24px";
      somethingWentWrong.style.color = "red";
      somethingWentWrong.innerHTML =
        "<h3>Sorry, something went wrong.</h3>";
    });
}

function getDefinitions(wordInfo, wordObj) {
  wordObj.definition = [];

  for (const definitionWrapper of wordInfo.def) {
    // wordInfo.def returns an array of objects
    if ("sseq" in definitionWrapper) {
      // If sseq is a key in the current object, loop
      // through returned array values
      for (const sseqArrayValue of definitionWrapper.sseq) {
        // for each array value, check if that value has an array
        // of its own. Then loop through that array
        // (which has a mixed array value)
        console.log("sseqArrayValue");
        console.log(sseqArrayValue);
        for (const mixedValueArray of sseqArrayValue) {
          // mixedValueArray has both strings and objects.
          // We want the objects only
          console.log("mixedValueArray");
          console.log(mixedValueArray);

          if (mixedValueArray[0] == "sense") {
            // dt returns an array of strings.
            // The first string is a signifier, the second
            // is the actual definition.
            const dt = mixedValueArray[1]["dt"];
            console.log("dt");
            console.log(dt);

            for (const dtArrayValue of dt) {
              // If first value in dtArray is string "text",
              // get value in second index
              console.log('dtArrayValue');
              console.log(dtArrayValue);
              if (dtArrayValue[0] == "text") {
                wordObj.definition.push(dtArrayValue[1]);
              }
            }
          }
        }
      }
    }
  }
}

function writeWordInfo(wordArray){
  const wordInfoDisplay = document.getElementById('results');

  for(const wordInfo of wordArray){
    const wordCard = createWordCard(wordInfo);
    wordInfoDisplay.appendChild(wordCard);
  }
}

function createWordCard(word) {
  const wordCard = document.createElement("div");
  wordCard.classList.add("word-card");

  // const wordName = document.createElement("div");
  // wordName.classList.add("word-name");
  // wordName.textContent = word.word;

  const wordType = document.createElement("div");
  wordType.classList.add("word-type");
  const wordTypeText = word.wordType in Object.keys(wordTypeMap) ? wordTypeMap[word.wordType] : word.wordType;
  wordType.innerHTML = `Word Type: ${wordTypeText}`;
  wordCard.appendChild(wordType);

  const definitionsWrapper = document.createElement('div');
  definitionsWrapper.innerText = 'Definition(s)';
  const definitionUnorderedList = document.createElement('ul');
  definitionUnorderedList.classList.add('list');

  for(const definition of word.definition){
    const definitionListItem = document.createElement('li');
    definitionListItem.classList.add('list-item');
    definitionListItem.innerText = definition;
    definitionUnorderedList.appendChild(definitionListItem);
  }

  definitionsWrapper.appendChild(definitionUnorderedList);
  wordCard.appendChild(definitionsWrapper);
  // const wordPronunciation = document.createElement("div");
  // wordPronunciation.classList.add("word-pronunciation");
  // wordPronunciation.textContent = word.pronunc;

  // const wordAudioPronunciation = document.createElement("div");
  // wordAudioPronunciation.classList.add("word-audio-pronunciation");
  // wordAudioPronunciation.textContent = word.audio;

  const wordEtymology = document.createElement("div");
  wordEtymology.classList.add("word-etymology");
  wordEtymology.textContent = `Etymology: ${word.etymology}`;
  wordCard.appendChild(wordEtymology);

  // const wordSentence = document.createElement("div");
  // wordSentence.classList.add("word-sentence");
  // wordSentence.textContent = word.example;

  // append each word element to the word card
  // wordCard.appendChild(wordName);
  // wordCard.appendChild(wordPronunciation);
  // wordCard.appendChild(wordAudioPronunciation);
  // wordCard.appendChild(wordSentence);

  // append word card to the HTML box/element
  // const wordInfoDiv = document.getElementById("word-info");
  // wordInfoDiv.appendChild(wordCard);

  return wordCard;
}

// not sure if this needs to be here
// function renderWordInfo() {
//   createWordCard();
// }

// function saveWordToStorage(wordInfo) {
//   localStorage.setItem("wordInfo", JSON.stringify(wordInfo));
// }

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
