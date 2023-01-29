//all necessary elements
const app = document.querySelector('.weather-app');
const temperature = document.querySelector('.temp');
const dataOutput = document.querySelector('.date')
const timeOutput = document.querySelector('.time')
const conditionOutput = document.querySelector('.condition')
const nameOutput = document.querySelector('.name')
const iconOutput = document.querySelector('.icon')
const cloudOutput = document.querySelector('.cloud')
const humidityOutput = document.querySelector('.humidity')
const windOutput = document.querySelector('.wind')
const form = document.getElementById('locationInput')
const search = document.querySelector('.search')
const btn = document.querySelector('.submit')
const cities = document.querySelectorAll('.city')
const apiKey = "d35f53db55074b49954145556232901"


//Default city when page loads
let cityInput = 'Amsterdam';

//for each city in the list, add an EventListener
cities.forEach(city => {
    city.addEventListener('click', () => {
        cityInput = city.innerHTML;
        fetchWeatherData();
    })
});

//submit event to the form
form.addEventListener('submit', (e) => {
    //if the input field is empty, throw alert
    if (search.value.length === 0) {
        alert("Please enter a city");
    } else {
        cityInput = search.value;
        call_save_to_db();
        fetchWeatherData();
        search.value = "";
        app.style.opacity = "0";
    }
    e.preventDefault();
});


function call_save_to_db(){
    $.ajax({
        url: 'save_location_db.php?location_name='+cityInput,
        type: "GET",
        error: function(data){
            alert("error!");
        }
    });
}


//fetch data when page loads
function fetchWeatherData() {
    fetch("https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + cityInput + "&aqi=no")
        .then(response => response.json())
        .then(data => {
            console.log(data);

            temperature.innerHTML = data.current.temp_c + '°C';
            conditionOutput.innerHTML = data.current.condition.text;

            //get date and time + day of week
            const date = data.location.localtime;
            const day = date.slice(8, 10);
            const month = date.slice(5, 7);
            const year = date.slice(0, 4);

            //get time
            const time = data.location.localtime.slice(11, 16);
            //slice time to before the colon to get the hour and get minutes after the colon
            splitTime = time.split(':');
            const hour = splitTime[0];

            //if hour is between 0 and 12, it's morning else it's afternoon
            if (hour >= 0 && hour < 12) {
                timeOutput.innerHTML = time + ' AM';
            } else {
                timeOutput.innerHTML = time + ' PM';
            }

            //get day of week
            const dayOfWeek = new Date(date).getDay();
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = days[dayOfWeek];


            //output date and time
            dataOutput.innerHTML = dayName + ' ' + day + '/' + month + '/' + year;
            nameOutput.innerHTML = data.location.name;


            //get icon
            const icon = data.current.condition.icon;
            console.log(icon);

            //change the current icon to the icon of the current weather
            iconOutput.src = icon;

            cloudOutput.innerHTML = data.current.cloud + '%';
            humidityOutput.innerHTML = data.current.humidity + '%';
            windOutput.innerHTML = data.current.wind_kph + 'km/h';

            const code = data.current.condition.code;

            // https://www.weatherapi.com/docs/conditions.json

            //change background image based on the weather
            if (data.current.is_day === 1) {
                timeDay = "day";
            } else {
                timeDay = "night";
            }

            if (code === 1000) {
                app.style.backgroundImage = "url('./images/" + timeDay + "/clear.jpg')";
                btn.style.backgroundColor = "#335169";
                if (timeDay === "night") {
                    btn.style.color = "#181e27";
                }
                //cloudy
            } else if (code === 1003 || code === 1006 || code === 1009 || code === 1030 || code === 1069 || code === 1069 || code === 1087 || code === 1135 || code === 1273 || code === 1276 || code === 1279 || code === 1282) {
                app.style.backgroundImage = "url('./images/" + timeDay + "/cloudy.jpg')";
                btn.style.backgroundColor = "#4c5054";
                if (timeDay === "night") {
                    btn.style.color = "#181e27";
                }
                //rainy
            } else if (code === 1063 || code === 1180 || code === 1183 || code === 1186 || code === 1189 || code === 1192 || code === 1195 || code === 1198 || code === 1201 || code === 1204 || code === 1207 || code === 1240 || code === 1243 || code === 1246 || code === 1249 || code === 1252 || code === 1255 || code === 1258 || code === 1261 || code === 1264 || code === 1273 || code === 1276 || code === 1279 || code === 1282) {
                app.style.backgroundImage = "url('./images/" + timeDay + "/rainy.jpg')";
                btn.style.backgroundColor = "#647d75";
                if (timeDay === "night") {
                    btn.style.color = "#325c80";
                }
                //snowy
            } else {
                app.style.backgroundImage = "url('./images/" + timeDay + "/snowy.jpg')";
                btn.style.backgroundColor = "#e5ba92";
                if (timeDay === "night") {
                    btn.style.color = "#181e27";
                }
            }
            app.style.opacity = "1";
        })
        //if the city is not found, throw alert and reset the inputfield to default
        .catch(() => {
            alert("City not found");
            cityInput = 'Amsterdam';
            fetchWeatherData();
        })
}

//ask for location when page loads
window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            fetch("http://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + lat + "," + long + "&aqi=no")
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    cityInput = data.location.name;
                    fetchWeatherData();
                })
        })
    } else {
        alert("Geolocation is not supported by this browser.");
    }
})

//fetch data when page loads

app.style.opacity = "1";