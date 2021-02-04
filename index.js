const leftContainer = document.getElementById('left-container');
const rightContainer = document.getElementById('right-container');
const locationEl = document.getElementById('location');
const weatherIcon = document.getElementById('weather-display');
const tempatureEl = document.getElementById('tempature');
const forecastEl = document.getElementById('forecast');
const degreeEl = document.getElementById('weather-degree');

const positionAPIkey = config.positionAPIkey;
const weatherAPIkey = config.weatherAPIkey;

let isCelsius = true;
let tempatureAPI = 0;

// hide loading
function hideLoadingSpinner() {
    if (!loader.hidden) {
        leftContainer.style.display = 'inline-block';
        rightContainer.style.display = 'inline-block';
        loader.hidden = true;
    }
}


// get user location on load
function userLocation() {
    if (navigator.geolocation) {
        //geolocation available
        navigator.geolocation.getCurrentPosition(successfulLookup, console.log);
    }
}


const successfulLookup = position => {
    const { latitude, longitude } = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${positionAPIkey}`)
      .then(response => response.json())
      .then(data => weatherCall(data.results[0].components.suburb));
};


// Weather API query
function weatherCall(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIkey}&units=Metric`)
    .then(response => response.json())
    .then(data => populateApp(data));
}


// Update app
function populateApp(data) {
    hideLoadingSpinner();
    // Populate tempature and calculate degrees celsius
    tempatureAPI = data.main.temp;
    tempatureEl.textContent = Math.floor(tempatureAPI);
    // Populate location
    locationPop = data.name;
    locationEl.textContent = locationPop;
    // Populate Weather 
    forecastEl.textContent = data.weather[0].main;
    // weather icon
    weatherIcon.classList.add('owf-' + data.weather[0].id);
}

// toggle celius / fahrenheit
function toggleCelsiusFahrenheit() {
    if (isCelsius) {
        // Update degrees, convert to fahrenheit
        convertedFahrenheit = (tempatureAPI * (9/5)) + 32;
        //Change elements
        tempatureEl.textContent = Math.floor(convertedFahrenheit);
        degreeEl.textContent = degreeEl.textContent.replace(' °C', ' °F');
        console.log(degreeEl.title);
        degreeEl.title = degreeEl.title.replace('Click for Fahernheit', 'Click for Celsius');
        isCelsius = false;  
    } else {
        // Revert back from fahrenheit to celius
        tempatureEl.textContent = Math.floor(tempatureAPI);
        degreeEl.textContent = degreeEl.textContent.replace(' °F', ' °C');
        degreeEl.title = degreeEl.title.replace( 'Click for Celsius', 'Click for Fahernheit');
        isCelsius = true;  
    }
}


userLocation();

// Event listeners
degreeEl.addEventListener('click', toggleCelsiusFahrenheit);