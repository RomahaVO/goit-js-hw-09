import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const input = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysTimer = document.querySelector('[data-days]');
const hoursTimer = document.querySelector('[data-hours]');
const minutesTimer = document.querySelector('[data-minutes]');
const secondsTimer = document.querySelector('[data-seconds]');

let timerID = null;
let userDate = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    selectedDates[0] < options.defaultDate
    // ?   (startBtn.disabled = false)
    // :   (Notify.info ('Please choose a date in the future'),
    //     (startBtn.disabled = true))


    ? (Notify ('Please choose a date in the future'),
        (startBtn.disabled = true))
    :   (startBtn.disabled = false);
    userDate = selectedDates[0];
    },
};

const flatpickrTimer  = flatpickr('#datetime-picker', options);

window.addEventListener('click', startTimer);

function startTimer(e) {
    if (e.target.nodeName !== 'BUTTON') 
    return timerID = setInterval(countDownTimer, 1000);
        startBtn.disabled = true;
        input.disabled = true;
};

function getTimeComponents(time) {
    return convertMs(time);
};

function updateCountDownUI({ seconds, minutes, hours, days }) {
    secondsTimer.textContent = seconds;
    minutesTimer.textContent = minutes;
    hoursTimer.textContent = hours;
    daysTimer.textContent = days;
}

function countDownTimer() {
    userDate = Date.parse(input.value);
    const diff = userDate - Date.now();
    let { days, hours, minutes, seconds } = getTimeComponents(diff);
    if (userDate <= Date.now()) {
    Notify.info('Please, choose date in future');
    clearInterval(timerID);
    input.disabled = false;
    }
    if (diff <= 1000) {
    clearInterval(timerID);
    seconds = getTimeComponents(0).seconds;
    minutes = getTimeComponents(0).minutes;
    hours = getTimeComponents(0).hours;
    days = getTimeComponents(0).days;
    input.disabled = false;
    }
    updateCountDownUI({ seconds, minutes, hours, days });
};

//============= function convertMs
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
};
