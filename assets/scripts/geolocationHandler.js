// Variables //
const geolocationButton = document.getElementById('get-geolocation');

const geolocationWrapper = {
  grantedLocationPermission: null,
  location: null
};

// Execution //

// Add listener via event delegation
document.addEventListener('click', requestGeolocation);


// Callbacks //

// Functions //

function writeLatitudeLongitude(){

  if(geolocationWrapper.location != null){
    const location = geolocationWrapper.location.coords;
  
    const locationElement = document.createElement('div');
  
    const latitudeElement = document.createElement('h3');
    latitudeElement.innerText = `Latitude: ${location.latitude}`;
    locationElement.appendChild(latitudeElement);
    
    const longitudeElement = document.createElement('h3');
    longitudeElement.innerText = `Longitude: ${location.longitude}`;
    locationElement.appendChild(longitudeElement);
  
    geolocationButton.insertAdjacentElement('afterend', locationElement);
  }
}

function requestGeolocation(event) {
  // Confirm event source is geolocation button
  if(event.target.id == 'get-geolocation'){
    // Request geolocation from user
    if (navigator.geolocation) {
      // If allowed, assign geolocation data
      navigator.geolocation.getCurrentPosition((position) => {
        geolocationWrapper.grantedLocationPermission = true;
        geolocationWrapper.location = position;
        writeLatitudeLongitude();
      });
    } 
    else {
      // If denied, note in wrapper
      geolocationWrapper.grantedLocationPermission = false;
    }
  }
}
