/* eslint-disable no-undef */

import translate from './translate';

import getWeather from './weather';

import getQuotes from './quotes';

import clock from './clock';

export default () => {
    const slider = 'settings__slider';
    const active = '_state_active';
    const tracks = document.querySelectorAll('.settings__slider-track');
    const thumbs = document.querySelectorAll('.settings__slider-thumb');

    const audio = document.querySelector('.header__player');
    const weather = document.querySelector('.header__weather');
    const time = document.querySelector('.main__time');
    const date = document.querySelector('.main__date');
    const greetingElement = document.querySelector('.main__greeting-container');
    const quoteContainer = document.querySelector('.footer__quote-container');
    const visualizer = document.getElementById('visualizer');
    const elements = [audio, weather, time, date, greetingElement, quoteContainer, visualizer];

    const radioLanguage = document.querySelectorAll('.lang');
    const sources = document.querySelectorAll('.source');

    const btnSettings = document.querySelector('.settings');

    btnSettings.addEventListener('click', () => {
        toggleVisibility();
    });

    function toggleVisibility() {
        const container = document.querySelector('.settings__container');
        container.classList.toggle('hidden');
    }

    Array.from(sources).forEach((src) => {
        src.addEventListener('click', () => {
            getActivePhotosource();
        });
    });

    Array.from(tracks).forEach((track, i) => {
        track.addEventListener('click', (event) => {
            if (event.target.classList.contains('settings__slider-thumb')) {
                setActiveThumb(event.target.parentElement, false, elements[i]);
            } else {
                setActiveThumb(event, true, elements[i]);
            }
        });
    });

    function setActiveThumb(event, isSlider, element) {
        let track;
        let thumb;

        if (isSlider) {
            track = event.target;
            thumb = thumbs[event.target.dataset.count];
        } else {
            track = event;
            thumb = thumbs[event.dataset.count];
        }

        const mThumb = thumb.getBoundingClientRect();
        track.classList.toggle(`${slider}-track${active}`);

        if (+getComputedStyle(thumb).left.replace('px', '') > 1) {
            thumb.style.left = '-1px';
            track.dataset.enabled = false;
        } else {
            thumb.style.left = track.getBoundingClientRect().width - mThumb.width - track.clientLeft * 2 + 1 + 'px';
            track.dataset.enabled = true;
        }
        setActiveState(element);
        localStorage.setItem(`${track.dataset.count}`, track.dataset.enabled);
    }

    function setActiveState(elem) {
        elem.classList.toggle('hidden');
    }

    function getStateAfterReload() {
        let enabledTracks = [];

        for (let i = 0; i < 7; i++) {
            let currentTrack = localStorage.getItem(i);
            if (currentTrack === 'true') {
                enabledTracks.push(tracks[i]);
            }
        }

        enabledTracks.forEach((track) => {
            setActiveThumb(track, false, elements[track.dataset.count]);
        });
    }

    function getActiveLang() {
        let lang;
        Array.from(radioLanguage).forEach((r) => {
            if (r.value === localStorage.currentLang) {
                r.checked = 'checked';
                lang = r.value;
                const setLangAfterReload = translate();
                setLangAfterReload(lang);
            }
        });
        return lang;
    }

    function getActivePhotosource() {
        Array.from(sources).forEach((src) => {
            if (localStorage.getItem('src') === src.value) {
                src.checked = 'checked';
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const activeLang = getActiveLang();
        const setDateLang = clock();
        getWeather('', activeLang);
        getQuotes(activeLang);
        setDateLang(activeLang);
        getStateAfterReload();
        getActiveLang();
        getActivePhotosource();
    });
};
