/* eslint-disable no-undef */
import playlist from './playlist';

export default () => {
    const playButton = document.querySelector('.play.player-icon');
    const prevButton = document.querySelector('.play-prev.player-icon');
    const nextButton = document.querySelector('.play-next.player-icon');
    const volumeBar = document.querySelector('.header__player_volume-bar');
    const progressBar = document.querySelector('.header__player_progress-bar');
    const progress = document.querySelector('.header__player_progress');
    const volume = document.querySelector('.header__player_volume');
    const songs = document.querySelector('.header__player-playlist');
    const track = document.querySelector('.header__player-song');
    const currentTime = document.querySelector('.header__player-time');
    const duration = document.querySelector('.header__player-duration');
    const mute = document.querySelector('.header__player-mute');

    let isPlay = false;
    let playNum = 0;
    const audio = new Audio();
    audio.src = playlist[playNum].src;
    track.textContent = playlist[playNum].title;

    function playAudio() {
        if (!isPlay) {
            audio.play();
            isPlay = true;
            playButton.classList.add('pause');
            songs.childNodes[playNum].classList.add('header__player-item_active', 'pause');
            track.textContent = playlist[playNum].title;
        } else {
            audio.pause();
            isPlay = false;
            playButton.classList.remove('pause');
            songs.childNodes[playNum].classList.remove('pause');
        }
    }

    function playNext() {
        songs.childNodes[playNum].classList.remove('header__player-item_active', 'pause');
        playNum++;
        if (playNum > 5) {
            playNum = 0;
        }
        isPlay = false;
        audio.src = playlist[playNum].src;
        playAudio();
    }

    function playPrev() {
        songs.childNodes[playNum].classList.remove('header__player-item_active', 'pause');
        playNum--;
        if (playNum < 0) {
            playNum = 5;
        }
        isPlay = false;
        audio.src = playlist[playNum].src;
        playAudio();
    }

    playlist.forEach(el => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        li.classList.add('header__player-item');
        span.textContent = el.title;
        li.appendChild(span);
        songs.appendChild(li);
    });

    songs.addEventListener('click', (event) => {
        if (event.target.classList.contains('header__player-item_active')) {
            playAudio();
        } else {
            songs.childNodes[playNum].classList.remove('header__player-item_active');
            playNum = Array.prototype.indexOf.call(event.target.parentElement.children, event.target);
            isPlay = false;
            audio.src = playlist[playNum].src;
            playAudio();
        }
    });

    setInterval(() => {
        progress.style.width = audio.currentTime / audio.duration * 100 + '%';
        currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
        duration.textContent = getTimeCodeFromNum(audio.duration);
    }, 500);

    progressBar.addEventListener('click', e => {
        const timelineWidth = window.getComputedStyle(progressBar).width;
        audio.currentTime = e.offsetX / parseInt(timelineWidth) * audio.duration;
    }, false);

    function getTimeCodeFromNum(num) {
        let seconds = parseInt(num);
        let minutes = parseInt(seconds / 60);
        seconds -= minutes * 60;
        const hours = parseInt(minutes / 60);
        minutes -= hours * 60;
        if (hours === 0) return `0${minutes}:${String(seconds % 60).padStart(2, 0)}`;
        return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }

    volume.addEventListener('input', e => {
        audio.volume = e.target.value;
    }, false);

    mute.addEventListener('click', () => {
        audio.muted = !audio.muted;
        if (audio.muted) {
            mute.classList.add('mute-icon', 'mute');
            mute.classList.remove('volume-icon', 'volume');
        } else {
            mute.classList.add('volume-icon', 'volume');
            mute.classList.remove('mute-icon', 'mute');
        }
    });

    volumeBar.addEventListener('click', e => {
        const sliderWidth = window.getComputedStyle(volumeBar).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        audio.volume = newVolume;
        volume.style.width = newVolume * 100 + '%';
    });

    playButton.addEventListener('click', playAudio);
    audio.addEventListener('ended', playNext);
    nextButton.addEventListener('click', playNext);
    prevButton.addEventListener('click', playPrev);
};
