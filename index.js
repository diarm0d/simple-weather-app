const locationEl = document.getElementById('location');
const weatherIcon = document.getElementById('weather-display');
const tempatureEl = document.getElementById('tempature');
const forecastEl = document.getElementById('forecast');
const degreeEl = document.getElementById('weather-degree');


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
    // data.main.temp - tempature
    // data.name - location
    // data.weather[0] - weather icon and forecast
}


// Update app
function populateApp(data) {
    console.log(data)
    // Populate tempature and calculate degrees celius
    tempature = data.main.temp;
    tempatureEl.textContent = Math.floor(tempature);
    console.log(tempature);
    // Populate location
    locationPop = data.name;
    console.log(locationPop);
    locationEl.textContent = locationPop;

    // Populate Weather 
    console.log(data.weather[0]);
    forecastEl.textContent = data.weather[0].main;
    // weather icon
    weatherIcon.classList.add('owf-' + data.weather[0].id);
}

// toggle celius / farenheit

userLocation();