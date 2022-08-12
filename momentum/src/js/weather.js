/* eslint-disable no-undef */
export default async (value, lang = 'en-EN') => {
    if (!value) {
        value = 'Минск';
    }

    const weatherIcon = document.querySelector('.header__weather-icon');
    const weatherError = document.querySelector('.header__weather-error');
    const weatherDescription = document.querySelector('.description');
    const temperature = document.querySelector('.temperature');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${value}&lang=${lang.slice(0, 2)}&appid=09615790df146b34f6a9134823ef6b5b&units=metric`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`City ${value} couldn't found.`);
        }

        const data = await response.json();

        toggleVisibilityOfWeatherInfo();

        weatherIcon.className = `header__weather-icon owf owf-${data.weather[0].id}`;
        temperature.textContent = `${Math.floor(data.main.temp)}°C, `;
        weatherDescription.textContent = data.weather[0].description;

        if (lang === 'en-EN') {
            wind.textContent = `Wind: ${Math.floor(data.wind.speed)} m/s`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
        } else {
            wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
            humidity.textContent = `Влажность: ${data.main.humidity}%`;
        }

        return data;
    } catch (e) {
        toggleVisibilityOfWeatherInfo('error', e.message);
    }

    function toggleVisibilityOfWeatherInfo(state = 'success', errorText) {
        [weatherIcon, temperature, weatherDescription, wind, humidity].forEach((element) => {
            if (state === 'success') {
                element.classList.remove('disabled');
                weatherError.textContent = '';
            } else {
                element.classList.add('disabled');
                weatherError.textContent = errorText;
            }
        });
    }
};
