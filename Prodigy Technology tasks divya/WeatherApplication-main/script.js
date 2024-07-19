document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
    const apiKey = 'dbfb9cfc1e2ab5b10a6dd45d4b4821bc'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                const weatherResult = document.getElementById('weatherResult');
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;

                let weatherEmoji = '';
                if (weatherDescription.includes('cloud')) {
                    weatherEmoji = '☁️';
                } else if (weatherDescription.includes('rain')) {
                    weatherEmoji = '🌧️';
                } else if (weatherDescription.includes('clear')) {
                    weatherEmoji = '☀️';
                } else {
                    weatherEmoji = '🌤️';
                }

                weatherResult.innerHTML = `
                    <p>City: ${data.name}</p>
                    <p>Temperature: ${temperature} °C ${weatherEmoji}</p>
                    <p>Weather: ${weatherDescription}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                `;

                document.body.className = ''; // Reset the class on body

                if (temperature <= 0) {
                    document.body.classList.add('cold');
                } else if (temperature > 0 && temperature <= 15) {
                    document.body.classList.add('cool');
                } else if (temperature > 15 && temperature <= 25) {
                    document.body.classList.add('warm');
                } else {
                    document.body.classList.add('hot');
                }
            } else {
                alert('City not found!');
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('An error occurred while fetching the weather data.');
        });
});
