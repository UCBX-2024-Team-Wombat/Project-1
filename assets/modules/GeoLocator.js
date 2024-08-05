// Sources
// - Learn Web Components In 25 Minutes: https://www.youtube.com/watch?v=2I7uX8m0Ta0
// - Using Custom Elements: https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
// - How to Use the Geolocation API in JavaScript – with Code Examples: https://www.freecodecamp.org/news/how-to-use-the-javascript-geolocation-api/

class GeoLocator extends HTMLElement {

  constructor(){
    super();
    this.build();
    console.log(this.wrapper);
    console.log(this.getLocationButton);
  }

  build(){
    const wrapper = document.createElement('div');
    this.wrapper = wrapper;
    this.appendChild(wrapper);

    // Create button
    const getLocationButton = document.createElement('button');
    getLocationButton.id = 'get-geolocation';
    getLocationButton.innerText = 'Get Geolocation';
    this.getLocationButton = getLocationButton;
    wrapper.appendChild(getLocationButton);

    getLocationButton.addEventListener("click", this.getGeolocation);
  }

  getGeolocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition( (position) => {
        const geolocation = position;
        const displayElement = document.createElement('div');

        const longitudeElement = document.createElement('p');
        longitudeElement.innerText = `Longitude: ${geolocation.coords.longitude}`;
        displayElement.appendChild(longitudeElement);

        const latitudeElement = document.createElement('p');
        latitudeElement.innerText = `Latitude: ${geolocation.coords.latitude}`;
        displayElement.appendChild(latitudeElement);

        this.insertAdjacentElement("afterend", displayElement);
      })
    }
    else {
      console.log('nope');
    }
  }
}

customElements.define("geo-locator", GeoLocator);