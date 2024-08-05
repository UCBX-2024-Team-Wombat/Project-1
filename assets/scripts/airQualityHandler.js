// Variables
const openWeatherApiHyperlink = new URL(
  "http://api.openweathermap.org/data/2.5/"
);
const openWeatherApiKey = localStorage.getItem("open-weather-api-key");
const getAirQualityButton = document.getElementById("get-air-quality");
const airQualityDataDisplay = document.getElementById("air-quality-data");

// Execution

document.addEventListener("click", getAirPollutionData);

// Callbacks

// Functions

function getAirPollutionData(event) {
  if (event.target.id == "get-air-quality") {
    getCurrentAirPollutionData();
  }
}

function getCurrentAirPollutionData() {
  const searchParameters = new URLSearchParams({
    lat: "37.9420672",
    lon: "-122.3327744",
    appid: openWeatherApiKey,
  }).toString();

  fetch(`${openWeatherApiHyperlink}/air_pollution?${searchParameters}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      writeAQIData(response.list);
    });
}

function writeAQIData(data) {
  const apiList = document.createElement("ul");

  const row = data[0];
  const rowElement = document.createElement("li");

  const datetime = Date(row.dt);
  const aqi = row.main.aqi;

  rowElement.innerText = `Time: ${datetime}, AQI: ${aqi}`;

  apiList.appendChild(rowElement);

  airQualityDataDisplay.appendChild(apiList);
}

// Sources

// Retrieve data from a ReadableStream object? 
// https://stackoverflow.com/questions/40385133/retrieve-data-from-a-readablestream-object