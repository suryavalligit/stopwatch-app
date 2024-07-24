let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval = null;
let running = false;

const display = document.getElementById('display');
const finalTime = document.getElementById('finalTime');
const startPauseButton = document.getElementById('startPause');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

startPauseButton.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateDisplay, 10);
        startPauseButton.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        startPauseButton.textContent = 'Start';
        running = false;
    }
});

stopButton.addEventListener('click', () => {
    if (running) {
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        finalTime.textContent = 'Final Time: ' + formatTime(difference);
        startPauseButton.textContent = 'Start';
        resetTimer();
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    resetTimer();
    finalTime.textContent = 'Final Time: 00:00:00.00';
    startPauseButton.textContent = 'Start';
    running = false;
});

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function formatTime(time) {
    let milliseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);
    let hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return (
        (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds) + '.' +
        (milliseconds < 10 ? '0' + milliseconds : milliseconds)
    );
}

function resetTimer() {
    display.textContent = '00:00:00.00';
    difference = 0;
}
