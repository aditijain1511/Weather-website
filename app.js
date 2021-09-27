const weatherApi = {
    key:"35b723251052dfa8d981eb09294bb64b",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather",
}
const searchInputBox = document.getElementById('input-box');
//Event Listener Function on KeyPress
searchInputBox.addEventListener('keypress',(event)=>{
    if(event.keyCode==13)
    {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display="block";
    }
});

//Get Weather Report

function getWeatherReport(city){
    //fetching details from api 
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`) //units metric is udes to convert temperature in celsius
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}
//Show Weather Report

function showWeatherReport(weather){
    console.log(weather);
    let city = document.getElementById('city');
    city.innerText = `${weather.name},${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;
    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;
    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent=='Clear'){
        document.body.style.backgroundImage = "url('Images/clear.jpg')";
    }else if(weatherType.textContent=='Clouds'){
        document.body.style.backgroundImage = "url('Images/cloudy.jpg')";
    }else if(weatherType.textContent=='Haze'){
        document.body.style.backgroundImage = "url('Images/cloudy.jpg')";
    }else if(weatherType.textContent=='Sunny'){
        document.body.style.backgroundImage = "url('Images/sunny.jpg')";
    }else if(weatherType.textContent=='Snow'){
        document.body.style.backgroundImage = "url('Images/snow.jpg')";
    }else if(weatherType.textContent=='Rain'){
        document.body.style.backgroundImage = "url('Images/rain.jpg')";
    }else if(weatherType.textContent=='Thunderstrom'){
        document.body.style.backgroundImage = "url('Images/thunder.jpg')";
    }
}
//Date Manage

function dateManage(dateArg){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear(); // get year
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    return `${date} ${month} (${day}), ${year}`;

}
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

