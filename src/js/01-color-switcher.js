const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', changeBgcBody);

function changeBgcBody () {
    startBtn.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();

},1000)};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.addEventListener('click', stopChangeBgcBode);

function stopChangeBgcBode() {
    clearInterval(timerId);
    stopBtn.disabled = true;
    startBtn.disabled = false;

};


