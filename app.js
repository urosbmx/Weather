// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0


const notificationElement = document.querySelector('.notification');
const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const wind = document.querySelector('.wind-speed');
const feels = document.querySelector('.feels-like');
const pressure = document.querySelector('.pressure');
const visibility = document.querySelector('.visibility');
const key2 = ' 15a07862eeb65fd1aad281cdddff3183';
const dayOfWeek = document.querySelector('.daysInWeek');




const weather = {};

//App data
weather.temperature = {
        unit: "celsius"
    }
    //APP data for 10 days
weather10 = {

}

const KELVIN = 273;
const key = "bf9693c8b668dd8a625a6bd5dee53fea";

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
    getTenDays(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api).then(function(response) {
            let data = response.json();
            //   console.log(data);
            return data;
        }).then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;

            weather.wind = data.wind.speed;
            weather.feelslike = Math.floor(data.main.feels_like - KELVIN);
            weather.pressure = data.main.pressure;
            weather.visibility = data.visibility;

        })
        .then(function() {
            displayWeather();
        });
}

// Prognoza iz sata u sat

function getTenDays (latitude, longitude){
    let api =` https://api.weather.com/v3/wx/forecast/daily/5day?geocode=${latitude},${longitude}&format=json&units=e&language=en-US&apiKey=87c459a0c00b4c6f8459a0c00bfc6fb2`;

    fetch(api).then(function(response2){
        let data2 = response2.json();
          console.log(data2);
        return data2;
    }).then(function(data2){
        weather10.day=data2.dayOfWeek;
        weather10.tempMax=data2.temperatureMax;
        weather10.tempMin=data2.temperatureMin;
        weather10.narrative=data2.narrative;
        
    })
}



function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    wind.innerHTML = `${weather.wind} m/s`;
    feels.innerHTML = `${weather.feelslike}°<span>C</span>`
    pressure.innerHTML = `${weather.pressure} mb`;
    visibility.innerHTML = `${weather.visibility} <span>m</span>`;
    
    for(var i=1; i < (weather10.day).length ;i++){
            $(".ten-days-weather").append(` <div class="days"> 
            <p class="daysInWeek">${weather10.day[i]}</p><div class="temperature-for-ten-days">
            <div class="temperature">
            <div class="ten-days-max">Max temperature ${Math.floor((weather10.tempMax[i] - 32) * (5/9))} °<span>C</span>
            <div class="ten-days-max">Min temperature ${Math.floor((weather10.tempMin[i] - 32) * (5/9))} °<span>C</span>
            </div>
            </div>
            </div>
            </div>`);
    }
    
    
    
}


function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
};

//Funkcija za promenu celsius u fahrenheit
tempElement.addEventListener("click", function() {
    if (weather.temperature.value === undefined) return;
    if (weather.temperature.unit === "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        let fahrenheitFeelsLike = celsiusToFahrenheit(weather.feelslike);
        fahrenheit = Math.floor(fahrenheit);
        fahrenheitFeelsLike = Math.floor(fahrenheitFeelsLike);
        tempElement.innerHTML = `${fahrenheit} &#176;<span>F</span>`
        feels.innerHTML = `${fahrenheitFeelsLike}°<span>F</span>`
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.tempearature.value -300} &#176;<span>C</span>`;
        feels.innerHTML = `${weather.feelslike}°<span>C</span>`
        weather.temperature.unit = "celsius";
    }
});

$(document).on('click','.hide',function(){
        $('.days-weather').slideToggle();
});
