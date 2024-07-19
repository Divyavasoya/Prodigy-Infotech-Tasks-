let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    difference = 0;
    running = false;
    display.textContent = '00:00:00.00';
    startStopBtn.textContent = 'Start';
    laps = [];
    lapsList.innerHTML = '';
}

function recordLap() {
    if (running) {
        laps.push(difference);
        const lapElement = document.createElement('li');
        lapElement.textContent = formatTime(difference);
        lapsList.appendChild(lapElement);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    milliseconds = milliseconds < 10 ? '0' + milliseconds : milliseconds;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
