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

function requestGeolocation(event) {
  // Confirm event source is geolocation button
  if(event.target.id == 'get-geolocation'){
    // Request geolocation from user
    if (navigator.geolocation) {
      // If allowed, assign geolocation data
      navigator.geolocation.getCurrentPosition((position) => {
        geolocationWrapper.grantedLocationPermission = true;
        geolocationWrapper.location = position;
      });
    } 
    else {
      // If denied, note in wrapper
      geolocationWrapper.grantedLocationPermission = false;
    }
  }
}
