const apiKey = '738dde0f13084db9822161002250409';
const apiBase = 'https://api.weatherapi.com/v1/current.json';

// DOM Elements
const temperatureField = document.getElementById('temp-num');
const locationField = document.getElementById('city-name');
const dateAndTimeField = document.getElementById('date-time');
const conditionField = document.getElementById('condition-text');
const weatherIcon = document.getElementById('weather-icon');
const humidityField = document.getElementById('humidity');
const windField = document.getElementById('wind-speed');
const feelsLikeField = document.getElementById('feels-like');
const visibilityField = document.getElementById('visibility');
const searchField = document.getElementById('search-input');
const form = document.getElementById('weather-form');
const appContainer = document.getElementById('app-container');
const loader = document.getElementById('loader');
const weatherContent = document.getElementById('weather-content');

// Initial city
let targetCity = 'Mumbai';

/**
 * Main Fetch Function
 * @param {string} city 
 */
const fetchWeather = async (city) => {
    showLoader(true);
    try {
        const response = await fetch(`${apiBase}?key=${apiKey}&q=${city}&aqi=no`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();
        updateUI(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Could not find that location. Please try again!');
    } finally {
        showLoader(false);
    }
};

/**
 * Update UI with fetched data
 * @param {object} data 
 */
const updateUI = (data) => {
    const { name } = data.location;
    const { temp_c, condition, humidity, wind_kph, feelslike_c, vis_km } = data.current;
    const { localtime } = data.location;

    // Update basic info
    temperatureField.innerText = Math.round(temp_c);
    locationField.innerText = name;
    conditionField.innerText = condition.text;
    weatherIcon.src = `https:${condition.icon}`;
    
    // Update additional details
    humidityField.innerText = `${humidity}%`;
    windField.innerText = `${wind_kph} km/h`;
    feelsLikeField.innerText = `${Math.round(feelslike_c)}°C`;
    visibilityField.innerText = `${vis_km} km`;

    // Format Date & Time
    const dateObj = new Date(localtime);
    const options = { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' };
    const time = localtime.split(' ')[1];
    dateAndTimeField.innerText = `${dateObj.toLocaleDateString('en-US', options)} | ${time}`;

    // Dynamic background based on weather condition
    updateBackground(condition.text.toLowerCase());
};

/**
 * Handle background transitions based on weather
 * @param {string} condition 
 */
const updateBackground = (condition) => {
    let gradient;
    
    if (condition.includes('sun') || condition.includes('clear')) {
        gradient = 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)'; // Sunny/Clear
    } else if (condition.includes('cloud') || condition.includes('overcast')) {
        gradient = 'linear-gradient(135deg, #606c88 0%, #3f4c6b 100%)'; // Cloudy
    } else if (condition.includes('rain') || condition.includes('drizzle') || condition.includes('mist')) {
        gradient = 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)'; // Rainy
    } else if (condition.includes('snow') || condition.includes('ice')) {
        gradient = 'linear-gradient(135deg, #83a4d4 0%, #b6fbff 100%)'; // Snowy
    } else {
        gradient = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)'; // Default
    }

    appContainer.style.background = gradient;
};

/**
 * Toggle Loader visibility
 * @param {boolean} isLoading 
 */
const showLoader = (isLoading) => {
    if (isLoading) {
        loader.style.display = 'flex';
        weatherContent.style.opacity = '0.3';
        weatherContent.style.transform = 'scale(0.98)';
    } else {
        loader.style.display = 'none';
        weatherContent.style.opacity = '1';
        weatherContent.style.transform = 'scale(1)';
    }
};

// Event Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (searchField.value.trim() !== '') {
        fetchWeather(searchField.value.trim());
    }
});

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    fetchWeather(targetCity);
});