
const inptbx = document.querySelector('.inptbx');
const srchbtn = document.getElementById('srchbtn');
const Weather_img = document.querySelector('.Weather-img');
const temperature = document.querySelector('.temper');
const descrption = document.querySelector('.descrption');
const humidty = document.getElementById('humidty');
const wind_speed = document.getElementById('wind-speed');

const api_key = "0ea9d73f13d09e24f17e03bd36fc5ea7";

async function checkweather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const weather_data = await response.json();

        temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;
        descrption.innerHTML = `${weather_data.weather[0].description}`;
        humidty.innerHTML = `${weather_data.main.humidity}%`;
        wind_speed.innerHTML = `${weather_data.wind.speed} km/h`;

        switch (weather_data.weather[0].main) {
            case 'Clouds':
                Weather_img.src = "cld.jpeg";
                break;
            case 'Clear':
                Weather_img.src = "sn.jpg";
                break;
            case 'Rain':
                Weather_img.src = "ran.jpg";
                break;
            case 'Mist':
                Weather_img.src = "mist.jpeg";
                break;
            case 'Snow':
                Weather_img.src = "snow.jpeg";
                break;
            default:
                Weather_img.src = "default.avif";
                break;
        }
    } catch (error) {
        console.error("Error fetching weather data: ", error);
        alert("Failed to fetch weather data. Please try again.");
        Weather_img.src = "default.avif"; // Set default image if city is not found
    }
}

srchbtn.addEventListener('click', () => {
    checkweather(inptbx.value);
});

// Apply cldimg when the page loads with India's current weather
document.addEventListener('DOMContentLoaded', async () => {
    await checkweather('India');
});
