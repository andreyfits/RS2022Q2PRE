/* eslint-disable no-undef */
import './styles';

import greeting from './greeting';

import clock from './clock';

import setValuesToLocalStorage from './localStorage';

import slider from './slider';

import quotes from './quotes';

import audioplayer from './audioplayer';

import translate from './translate';

import settings from './settings';

import preloader from './preloader';

import visualizer from './visualizer';

greeting();
clock();
setValuesToLocalStorage();
slider();
quotes();
audioplayer();
translate();
settings();
preloader();

document.addEventListener('click', () => {
    visualizer();
}, { once: true });

console.log('Самооценка: 157/160 \n- Часы и календарь +15\n- Приветствие +10\n- Смена фонового изображения +20\n- Виджет погоды +15\n- Виджет - цитата дня +10\n- Аудиоплеер +15\n- Продвинутый аудиоплеер +20\n- Перевод приложения на 2 языка +15\n- Получение фонового изображения от API +10\n- Настройки приложения +17/20 (если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото - НЕ выполнил)\n- Дополнительный функционал - визуализатор на canvas при воспроизведении треков +10');

alert(`Спасибо за ожидание. Успел всё доделать и исправить.
       Если будут вопросы пишите. Мой дискорд andreyfits#0176`);
