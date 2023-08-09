const apiKey = '7a19fc7836f7d758a209d24a70da2190';
const cityInput = document.querySelector(".city-input")
const submit = document.querySelector(".submit")
var city = document.querySelector(".city")
var icon = document.querySelector(".icon")
var temp = document.querySelector(".temp")
var hum = document.querySelector(".hum")
var wind = document.querySelector(".wind")
var forecastCard = document.querySelectorAll(".forecastCard")
var searchHistory = document.querySelector(".search-history")

submit.addEventListener("click", function () {
    var history = JSON.parse(localStorage.getItem("history")) || []
    var cityName = cityInput.value
    getWeatherData(cityName)
    getForecastData(cityName)
    history.push(cityName)
    localStorage.setItem("history", JSON.stringify(history))
    renderHistory()
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
            icon.setAttribute("alt", data.weather[0].description)
            temp.innerHTML = "Temp: " + data.main.temp + "&#176F"
            hum.innerHTML = "Humidity: " + data.main.humidity + "%"
            wind.innerHTML = "Wind: " + data.wind.speed + "mph"
        })
}

function getForecastData(cityName) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data)
            for (let i = 0; i < forecastCard.length; i++) {
                forecastCard[i].innerHTML = ""
                var index = i * 8 + 4
                var date = new Date(data.list[index].dt * 1000)
                var day = date.getDate()
                var month = date.getMonth() + 1
                var year = date.getFullYear()
                const h1 = document.createElement('h1')
                const img = document.createElement("img")
                const p1 = document.createElement('p')
                const p2 = document.createElement('p')
                const p3 = document.createElement('p')
                h1.innerHTML = month + "/" + day + "/" + year
                img.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[index].weather[0].icon + "@2x.png")
                img.setAttribute("alt", data.list[index].weather[0].description)
                p1.innerHTML = "Temp: " + data.list[index].main.temp + "&#176F"
                p2.innerHTML = "Humidity: " + data.list[index].main.humidity + "%"
                p3.innerHTML = "Wind: " + data.list[index].wind.speed + "mph"
                forecastCard[i].append(h1)
                forecastCard[i].append(img)
                forecastCard[i].append(p1)
                forecastCard[i].append(p2)
                forecastCard[i].append(p3)
            }
        })
}

function renderHistory() {
    searchHistory.innerHTML = ""
    var historyData = JSON.parse(localStorage.getItem("history")) || []
    for (let i = 0; i < historyData.length; i++) {
        var btn = document.createElement("button")
        btn.innerHTML = historyData[i]
        searchHistory.append(btn)
        btn.addEventListener("click", function (event) {
            var cityValue = event.target.innerHTML
            getWeatherData(cityValue)
            getForecastData(cityValue)
        })
    }
}

renderHistory()
