let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds); // Make sure first second is displayed
    dispayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // Check if we should stop
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        displayTimeLeft(secondsLeft);
    }, 1000)
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${zeroPadSeconds(remainderSeconds)}`;

    timerDisplay.textContent = display;
    document.title = display;
}

function dispayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour}:${zeroPadMinutes(minutes)}`;
}

function zeroPadSeconds(seconds) {
    const padding = seconds < 10 ? '0' : '';
    return `${padding}${seconds}`;
}

function zeroPadMinutes(minutes) {
    const padding = minutes < 10 ? '0' : '';
    return `${padding}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const minutes = this.minutes.value;
    timer(minutes * 60);
    this.reset();
})