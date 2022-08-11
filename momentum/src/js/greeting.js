export default (lang = 'en-EN') => {
    const GREETINGS_EN = [
        'night',
        'morning',
        'afternoon',
        'evening'
    ];

    const GREETINGS_RU = [
        'Доброй ночи',
        'Доброе утро',
        'Добрый день',
        'Добрый вечер'
    ];

    const greeting = document.querySelector('.main__greeting');
    const name = document.querySelector('.main__name');
    const hours = new Date().getHours();
    const count = Math.floor(hours / 6);

    let timeOfDay;

    if (lang === 'ru-RU') {
        timeOfDay = GREETINGS_RU[count];
        greeting.textContent = `${timeOfDay},`;
        name.placeholder = '[Введите имя]';
    } else {
        timeOfDay = GREETINGS_EN[count];
        greeting.textContent = `Good ${timeOfDay},`;
        name.placeholder = '[Enter name]';
    }

    return timeOfDay;
};
