const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const bodyForBgc = document.body;
console.log(stopBtn);

let timerId = null;
// startBtn.disabled = false;
// stoptBtn.disabled = true;

function changeBgcBody () {
    startBtn.disabled = true;
    // stopBtn.disabled = false;
    timerId = setInterval(() => {
    bodyForBgc.style.backgroundColor = getRandomHexColor();

},1000)};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startBtn.addEventListener('click', changeBgcBody);

function stopChangeBgcBode() {
    clearInterval(timerId);
    // stoptBtn.disabled = true;
    startBtn.disabled = false;

};

stopBtn.addEventListener('click', stopChangeBgcBode);
