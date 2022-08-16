/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
import greeting from './greeting';

import photosource from './photosource';

export default () => {
    const timeOfDay = greeting('en-EN');
    const radio = document.querySelectorAll('.source');

    function getRandomNum() {
        let num = Math.floor(1 + Math.random() * 20);

        return num < 10 ? `0${num}` : num;
    }

    Array.from(radio).forEach((r) => [
        r.addEventListener('click', () => {
            setBackground();
            setActivePhotosource();
        })
    ]);

    function setBackground(isClicked, opt) {
        const src = setActivePhotosource();

        if (src.value === 'github') {
            setImageFromGithub(isClicked, opt);
        } else if (src.value === 'flickr') {
            photosource('flickr');
        } else {
            photosource('unsplash');
        }
    }

    setBackground();

    (function getSlideNext() {
        const slideNext = document.querySelector('.slide-next');

        slideNext.addEventListener('click', () => {
            setBackground(true, 'inc');
        });
    })();

    (function getSlidePrev() {
        const slidePrev = document.querySelector('.slide-prev');

        slidePrev.addEventListener('click', () => {
            setBackground(true);
        });
    })();

    function setActivePhotosource() {
        const activeSrc = Array.from(radio).find((r) => r.checked);
        localStorage.setItem('src', activeSrc.value);
        return activeSrc;
    }

    function correctNumber(i, opt = 'dec') {
        if (opt === 'inc') {
            return i > 19 ? '01' : i < 9 ? `0${++i}` : ++i;
        }

        return i < 2 ? '20' : i <= 10 ? `0${--i}` : --i;
    }

    function setImageFromGithub(isClicked, opt) {
        const img = new Image();
        const imgUrl = 'https://raw.githubusercontent.com/andreyfits/stage1-tasks/assets/images/';

        if (isClicked) {
            const url = document.body.style.backgroundImage;
            let imageNum = url.match(/[0-9]{2}/g);

            img.src = `${imgUrl}${timeOfDay}/${correctNumber(imageNum[1], opt)}.jpg`;
        } else {
            img.src = `${imgUrl}${timeOfDay}/${getRandomNum()}.jpg`;
        }

        img.onload = () => {
            document.body.style.background = `url(${img.src}) 0/cover`;
        };
    }
};
