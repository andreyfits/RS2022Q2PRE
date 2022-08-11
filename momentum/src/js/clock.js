import greeting from './greeting';

export default () => {
    const time = document.querySelector('.main__time');

    (function showTime() {
        const date = new Date();
        const hours = date.getHours();
        const min = date.getMinutes();
        let sec = date.getSeconds();

        time.textContent = `${correctUnit(hours)}:${correctUnit(min)}:${correctUnit(sec)}`;

        if (time.textContent === '00:00:00') {
            showDate();
            greeting();
        }

        if (time.textContent === '06:00:00' || time.textContent === '12:00:00' || time.textContent === '18:00:00') {
            greeting();
        }

        setTimeout(() => {
            showTime();
        }, 1000);
    })();

    function correctUnit(unit) {
        return unit < 10 ? `0${unit}` : unit;
    }

    function showDate(lang = 'en-EN') {
        greeting(lang);

        const dateText = document.querySelector('.main__date');
        const options = {
            year: '2-digit',
            month: 'long',
            weekday: 'long'
        };

        const date = new Date().toLocaleString(lang, options);
        const splitDate = date.split(' ');

        let correctDate;

        if (lang === 'ru-RU') {
            correctDate = `${splitDate[0][0].toUpperCase() + splitDate[0].slice(1)} ${splitDate[1]} ${splitDate[2]}`;
        } else {
            correctDate = `${splitDate[2]}, ${splitDate[0]} ${splitDate[1]}`;
        }

        dateText.textContent = correctDate;
    }

    return showDate();
};
