let startTime;
let running = false;
let laps = [];
let lapStartTime;
let pausedTime = 0;

function startStop() {
    if (running) {
        stop();
    } else {
        start();
    }
}

function start() {
    if (!running) {
        startTime = new Date().getTime() - pausedTime;
        lapStartTime = new Date().getTime();
        running = true;
        updateDisplay();
        document.getElementById('startStop').innerHTML = 'Stop';
        run();
    }
}

function stop() {
    if (running) {
        running = false;
        document.getElementById('startStop').innerHTML = 'Start';
        pausedTime = new Date().getTime() - startTime;
    }
}

function lapReset() {
    if (running) {
        let lapTime = new Date().getTime() - lapStartTime;
        laps.push(formatElapsedTime(lapTime));
        lapStartTime = new Date().getTime();
        updateLaps();
    } else {
        reset();
    }
}

function reset() {
    startTime = null;
    running = false;
    laps = [];
    pausedTime = 0;
    updateDisplay();
    updateLaps();
    document.getElementById('startStop').innerHTML = 'Start';
}

function run() {
    if (running) {
        setTimeout(function () {
            updateDisplay();
            run();
        }, 10);
    }
}

function updateDisplay() {
    let currentTime = new Date().getTime();
    let elapsedTime = 0;

    if (startTime) {
        elapsedTime = currentTime - startTime;
    }

    document.getElementById('display').innerHTML = formatElapsedTime(elapsedTime);
}

function formatElapsedTime(time) {
    let centiseconds = Math.floor((time % 1000) / 10);
    let seconds = Math.floor((time / 1000) % 60);
    let minutes = Math.floor((time / (1000 * 60)) % 60);

    centiseconds = pad(centiseconds, 2);
    seconds = pad(seconds, 2);
    minutes = pad(minutes, 2);

    return `${minutes}:${seconds}.${centiseconds}`;
}

function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = '0' + num;
    return num;
}

function updateLaps() {
    let lapsContainer = document.getElementById('laps');
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        let lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(lapItem);
    });
}
