const apikey = "991627f68a6775680cea9d4904fc18a2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
            
            const weatherMain = data.weather[0].main;
            if (weatherMain == "Clouds") {
                weatherIcon.src = "images/clouds.png";
                document.body.style.backgroundImage = "url('images/clouds-bg.jpg')";
            } else if (weatherMain == "Rain") {
                weatherIcon.src = "images/rain.png";
                document.body.style.backgroundImage = "url('images/rain-bg.jpg')";
            } else if (weatherMain == "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
                document.body.style.backgroundImage = "url('images/drizzle-bg.jpg')";
            } else if (weatherMain == "Mist") {
                weatherIcon.src = "images/mist.png";
                document.body.style.backgroundImage = "url('images/mist-bg.jpg')";
            } else {
                weatherIcon.src = "images/default.png";
                document.body.style.backgroundImage = "url('images/default-bg.jpg')";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        alert(error.message);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
