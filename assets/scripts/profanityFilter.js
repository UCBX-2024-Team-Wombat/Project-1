const profanityDataURL =
  "https://api.github.com/repos/surge-ai/profanity/contents/profanity_en.csv";

getProfanityList();

// Source for learning about async functions: https://stackoverflow.com/questions/41775517/waiting-for-the-fetch-to-complete-and-then-execute-the-next-instruction
async function getProfanityList(){
  const profanityList = await fetchProfanityList();
  console.log(profanityList);
}

async function fetchProfanityList(){  
  return fetch(profanityDataURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const badWords = [];

      // Source for atob() and decoding base64: https://www.w3schools.com/jsref/met_win_atob.asp
      const rawCSV = atob(data.content).split("\n");
      
      // Start with i = 1 to avoid including header line
      for (let i = 1; i < rawCSV.length; i++) {
        const row = rawCSV[i];
        if (row != undefined) {
          const rowData = row.split(",");
          badWords.push(rowData[0]);
        }
      }
  
      return badWords;
    });
}

