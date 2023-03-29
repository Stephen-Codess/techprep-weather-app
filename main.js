const api = {
    key:"8ce2959edaa0421a8ea234339232803",
    base:"https://api.weatherapi.com/v1/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.key == 'Enter') {
        getResults(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}forecast.json?key=${api.key}&q=${query}&days=1&aqi=no`)
        .then((weather) => {
        return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.location.name}, ${weather.location.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.current.temp_c)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.current.condition.text;

    //let hilow = document.querySelector('.hi-low');
    //hilow.innerText = `${Math.round(weather.forecast.forecastday[0].day.mintemp_c)}°c / ${Math.round(weather.forecast.forecastday[0].day.maxtemp_c)}°c`;
    
    // The free weather API that I'm using doesn't provide min and max temperatures so I made a few adjustments to my code
}


function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}