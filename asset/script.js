const apiKey = '7a19fc7836f7d758a209d24a70da2190';
const cityInput = document.querySelector(".city-input")
const submit = document.querySelector(".submit")
var city = document.querySelector(".city")
var icon = document.querySelector(".icon")
var temp = document.querySelector(".temp")
var hum = document.querySelector(".hum")
var wind = document.querySelector(".wind")

submit.addEventListener("click", function () {
    var cityName = cityInput.value
    getWeatherData(cityName)
})

function getWeatherData(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
            var date = new Date()
            var day = date.getDate()
            var month = date.getMonth() + 1
            var year = date.getFullYear()
            city.innerHTML = data.name + " - " + month + "/" + day + "/" + year
            icon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png")
            icon.setAttribute("alt",  data.weather[0].description)
            temp.innerHTML = "Temp: " + data.main.temp + "&#176F"
            hum.innerHTML = "Humidity: " + data.main.humidity + "%"
            wind.innerHTML = "Wind: " + data.wind.speed + "mph"
        })
}

