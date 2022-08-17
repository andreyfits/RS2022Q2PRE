/* eslint-disable no-undef */
export default () => {
    const audio = document.querySelector('.header__audioplayer');
    const context = new AudioContext();
    const analyser = context.createAnalyser();
    const source = context.createMediaElementSource(audio);

    const canvas = document.getElementById('visualizer');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    source.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 2048;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    const barWidth = (WIDTH / bufferLength) * 3;
    let barHeight;
    let x = 0;

    function renderFrame() {
        requestAnimationFrame(renderFrame);

        x = 0;
        analyser.getByteFrequencyData(dataArray);
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            const r = barHeight + (25 * (i / bufferLength));
            const g = 240 * (i / bufferLength);
            const b = 55;

            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

            x += barWidth + 1;
        }
    }

    renderFrame();
};
