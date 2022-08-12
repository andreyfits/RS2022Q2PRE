/* eslint-disable no-undef */
import getWeather from './weather';

export default () => {
    window.addEventListener('beforeunload', () => {
        setNameToLocalStorage();
        setCity();
    });

    function setNameToLocalStorage() {
        const name = document.querySelector('.main__name');

        document.addEventListener('DOMContentLoaded', () => {
            name.value = localStorage.getItem('name');
        });

        name.addEventListener('keyup', () => {
            localStorage.setItem('name', name.value);
        });
    }

    function setCity() {
        const city = document.querySelector('.city');

        city.addEventListener('blur', () => {
            const data = getWeather(city.value);

            data.then((item) => {
                localStorage.setItem('errorText', document.querySelector('.header__weather-error').textContent);
                localStorage.setItem('cod', item.cod);
                localStorage.setItem('temp', Math.floor(item.main.temp));
                localStorage.setItem('desc', item.weather[0].description);
                localStorage.setItem('wind', Math.floor(item.wind.speed));
                localStorage.setItem('hum', item.main.humidity);
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            city.value = localStorage.getItem('city');
            getWeather(city.value);
        });

        city.addEventListener('focus', () => {
            localStorage.setItem('city', city.value);

            city.addEventListener('keyup', () => {
                localStorage.setItem('city', city.value);
            });
        });
    }

    setNameToLocalStorage();
    setCity();
};
