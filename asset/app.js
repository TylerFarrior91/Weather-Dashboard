// Function to make API call to OpenWeatherMap
function getWeatherData(cityName) {
    // Use the 5 Day Weather Forecast API URL with your API key and city name
    const apiKey = '7a19fc7836f7d758a209d24a70da2190';
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${apiKey}`;

    // Make the API call using jQuery's AJAX method
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
            // Process the weather data and update the UI
            // You can access the weather data in the 'data' variable
            // e.g., data.list[0] will give you the first forecast data point
            console.log(data);
        },
        error: function (error) {
            // Handle API call errors here
            console.log(error)
        }
    });
}
// Function to display the current weather conditions
function displayCurrentWeather(weatherData) {
    // Update the UI to show the current weather conditions
}

// Function to display the 5-day forecast
function displayForecast(forecastData) {
    // Update the UI to show the 5-day forecast
}

// Function to save city in the search history
function saveCityInHistory(cityName) {
    // Save the city name in localStorage
    console.log(localStorage.getItem("cities"))
    if (localStorage.getItem("cities")===null) {
        localStorage.setItem("cities", cityName)
    } else {
        localStorage.setItem("cities", JSON.stringify([localStorage.getItem("cities"), cityName]));
        console.log(localStorage.getItem("cities"));
    }
}

// Function to load search history from localStorage and display it
function loadSearchHistory() {
    // Load the search history from localStorage
    // Update the UI to show the search history
}

// Event listener for the city search form submission
$('#city-search-form').on('submit', function (event) {
    event.preventDefault();
    const cityName = $('#city-input').val().trim();
    if (cityName !== '') {
        // Call the getWeatherData function to fetch weather data for the city
        getWeatherData(cityName);
        // Save the city in the search history
        saveCityInHistory(cityName);
    }
});

$('#search-history').on('click', 'li', function () {
    const cityName = $(this).text();
    
    getWeatherData(cityName);
});

$(document).ready(function () {
    loadSearchHistory();
});