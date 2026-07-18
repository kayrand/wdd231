const currentTemp = document.querySelector('#current-temp');
const currentDesc = document.querySelector('#current-desc');
const forecastContainer = document.querySelector('#forecast');

const apiKey = '187960917c3eef31e68c785d45bf20cf';
const lat = '33.52';
const lon = '-86.80';

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(weatherURL);
    if (response.ok) {
      const data = await response.json();
      displayCurrentWeather(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastURL);
    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function displayCurrentWeather(data) {
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;

  currentTemp.textContent = `${temp}°F`;
  currentDesc.textContent = description;
}

function displayForecast(data) {
  const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00'));
  const threeDays = dailyForecasts.slice(0, 3);

  forecastContainer.innerHTML = '';

  threeDays.forEach(day => {
    const date = new Date(day.dt_txt);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const temp = Math.round(day.main.temp);

    const forecastDay = document.createElement('div');
    forecastDay.classList.add('forecast-day');
    forecastDay.innerHTML = `
      <span class="forecast-name">${dayName}</span>
      <span class="forecast-temp">${temp}°F</span>
    `;
    forecastContainer.appendChild(forecastDay);
  });
}

getWeather();
getForecast();