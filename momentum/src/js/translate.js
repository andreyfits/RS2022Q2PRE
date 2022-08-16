/* eslint-disable no-undef */
import clock from './clock';

import quotes from './quotes';

import weather from './weather';

export default () => {
    const radio = document.querySelectorAll('.lang');
    const showDate = clock();

    Array.from(radio).forEach((element) => {
        element.addEventListener('click', () => {
            const lang = element.value;
            showDate(lang);
            quotes(lang);
            weather(localStorage.getItem('city'), lang);
            setLang(lang);
        });
    });

    function setLang(lang) {
        const settings = document.querySelector('.settings__heading');
        const fields = document.querySelectorAll('.settings__text');
        const enSettings = ['Language', ' Audioplayer', 'Weather', 'Time', 'Date', 'Greeting', 'Quotes', 'Photosource'];
        const ruSettings = ['Язык', ' Аудиоплеер', 'Погода', 'Время', 'Дата', 'Приветствие', 'Цитаты', 'Фоторесурс'];
        let titles;

        if (lang === 'en-EN') {
            titles = enSettings;
            settings.textContent = 'Settings / Visibility';
        } else {
            titles = ruSettings;
            settings.textContent = 'Настройки / Видимость';
        }

        localStorage.setItem('currentLang', lang);

        Array.from(fields).forEach((field, i) => {
            field.textContent = titles[i];
            field.classList.toggle('show');
            setTimeout(() => {
                field.classList.toggle('show');
            }, 700);
        });
    }

    return setLang;
};
