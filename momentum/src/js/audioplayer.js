/* eslint-disable no-undef */
import playlist from './playlist';

export default () => {
    const audio = document.querySelector('.header__audioplayer');
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
    const song = document.querySelectorAll('.header__player-item');
    const mute = document.querySelector('.header__player-mute');
    let playNum = 0;

    function playAudio() {
        const state = audio.dataset.state;
        let findElement = Array.from(songs.children).find((element) => element.classList.contains('header__player-item_active'));

        if (state === 'pause') {
            audio.dataset.state = 'play';
            audio.play();
            playButton.classList.add('pause');
            findElement.classList.add('pause');
        } else {
            audio.dataset.state = 'pause';
            audio.pause();
            playButton.classList.remove('pause');
            findElement.classList.remove('pause');
        }
    }

    function nextSongAfterEnding() {
        if (audio.currentTime === audio.duration) {
            getTrack('next');
            getCurrentTime();
        }
    }

    function getTrack(btn) {
        let path;

        if (btn === 'prev') {
            path = playlist[playNum === 0 ? playNum = playlist.length - 1 : --playNum].src;
        } else {
            path = playlist[playNum === playlist.length - 1 ? playNum = 0 : ++playNum].src;
        }

        audio.src = path;
        audio.dataset.count = playNum;
        audio.play();
        audio.dataset.state = 'play';
        getDuration();
        getTrackName();
        setActiveTrack(playNum);
    }

    function getCurrentTime() {
        const seconds = Math.floor(audio.currentTime);
        const minutes = Math.floor(seconds / 60);
        const trueSeconds = seconds - minutes * 60;

        currentTime.textContent = `0${minutes}:${trueSeconds < 10 ? '0' + trueSeconds : trueSeconds}`;
    }

    function getTrackName(c) {
        track.textContent = playlist[c || playNum].title;
    }

    function getDuration(c = playNum) {
        duration.textContent = playlist[c].duration;
    }

    (function generateTrackNames() {
        song.forEach((song, i) => {
            song.dataset.count = i;
            song.firstElementChild.textContent = playlist[i].title;
        });
    })();

    function chooseTheTrack() {
        let songCounter;
        songs.addEventListener('click', (event) => {
            audio.dataset.state = 'play';
            if (event.target.tagName === 'LI') {
                songCounter = event.target.dataset.count;
                audio.dataset.count = songCounter;
                const src = playlist[songCounter].src;
                duration.textContent = playlist[songCounter].duration;

                if (event.target.classList.contains('header__player-item_active')) {
                    if (event.target.classList.contains('pause')) {
                        event.target.classList.remove('pause');
                        [event.target, playButton].forEach((element) => {
                            element.classList.remove('pause');
                        });
                        audio.pause();
                    } else {
                        event.target.classList.add('pause');
                        [event.target, playButton].forEach((element) => {
                            element.classList.add('pause');
                        });
                        audio.play();
                    }
                } else {
                    audio.src = src;
                    audio.play();
                    getTrackName(songCounter);
                    setActiveTrack(songCounter);
                    getDuration(songCounter);
                }
            }
        });
    }

    function setActiveTrack(counter) {
        song.forEach((song, i) => {
            if (i === +counter) {
                song.classList.add('header__player-item_active', 'pause');
                playButton.classList.add('pause');
            } else {
                song.classList.remove('header__player-item_active', 'pause');
            }
        });
    }

    chooseTheTrack();

    playButton.addEventListener('click', playAudio);

    prevButton.addEventListener('click', () => {
        getTrack('prev');
    });

    nextButton.addEventListener('click', () => {
        getTrack('next');
    });

    audio.addEventListener('timeupdate', () => {
        getCurrentTime();
        nextSongAfterEnding();
    });

    setInterval(() => {
        progress.style.width = audio.currentTime / audio.duration * 100 + '%';
        currentTime.textContent = getTimeCodeFromNum(audio.currentTime);
        duration.textContent = getTimeCodeFromNum(audio.duration);
    }, 500);

    progressBar.addEventListener('click', event => {
        const timelineWidth = window.getComputedStyle(progressBar).width;
        audio.currentTime = event.offsetX / parseInt(timelineWidth) * audio.duration;
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
            mute.style.opacity = 0.45;
        } else {
            mute.classList.add('volume-icon', 'volume');
            mute.classList.remove('mute-icon', 'mute');
            mute.style.opacity = 1;
        }
    });

    volumeBar.addEventListener('click', e => {
        const sliderWidth = window.getComputedStyle(volumeBar).width;
        const newVolume = e.offsetX / parseInt(sliderWidth);
        audio.volume = newVolume;
        volume.style.width = newVolume * 100 + '%';
    });
};
