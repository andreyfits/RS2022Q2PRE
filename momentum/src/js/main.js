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
