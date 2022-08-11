/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import greeting from './greeting';

export default () => {
    const timeOfDay = greeting();

    function getRandomNum() {
        let num = Math.floor(1 + Math.random() * 20);

        return num < 10 ? `0${num}` : num;
    }

    function setBg(isClicked, opt) {
        const img = new Image();
        const imgUrl = 'https://raw.githubusercontent.com/andreyfits/stage1-tasks/assets/images/';

        if (isClicked) {
            const url = document.body.style.backgroundImage;
            let imgNum = url.match(/[0-9]{2}/g);

            img.src = `${imgUrl}${timeOfDay}/${correctNumber(imgNum, opt)}.jpg`;
        } else {
            img.src = `${imgUrl}${timeOfDay}/${getRandomNum()}.jpg`;
        }

        img.addEventListener('load', () => {
            document.body.style.backgroundImage = `url(${img.src})`;
        });
    }

    setBg();

    (function getSlideNext() {
        const slideNext = document.querySelector('.slide-next');

        slideNext.addEventListener('click', () => {
            setBg(true, 'inc');
        });
    })();

    (function getSlidePrev() {
        const slidePrev = document.querySelector('.slide-prev');

        slidePrev.addEventListener('click', () => {
            setBg(true);
        });
    })();

    function correctNumber(i, opt = 'dec') {
        if (opt === 'inc') {
            return i > 19 ? '01' : i < 9 ? `0${++i}` : ++i;
        }

        return i < 2 ? '20' : i <= 10 ? `0${--i}` : --i;
    }
};
