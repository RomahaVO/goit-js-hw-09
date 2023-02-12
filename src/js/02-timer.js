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

let selectedDate = '';
let timerID = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDates[0] <= options.defaultDate
        ? (Notify.failure('Please choose a date in the future'),
        (startBtn.disabled = true))
        : (startBtn.disabled = false);
    },
};

const flatpickrTimer  = flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', startTimer);
input.addEventListener('input', onInputChange);


function onInputChange(e) {
    selectedDate = new Date(e.currentTarget.value);
    console.log(selectedDate);
}

function startTimer() {
    const timerID = setInterval(()=>{
        
        const diff = selectedDate - Date.now();
        if(diff < 0){
            clearInterval(timerID);
            return;
        };
        convertMs(diff);
        startBtn.disabled = true;
        input.disabled = true;
    }, 1000); 

};

function convertMs(diff){
    const days = addDoubleZero(Math.floor(diff / (1000 * 60 * 60 * 24)));
    const hours = addDoubleZero(Math.floor((diff / (1000 * 60 * 60)) % 24));
    const minutes = addDoubleZero(Math.floor((diff / (1000 * 60)) % 60));
    const seconds = addDoubleZero(Math.floor((diff / 1000) % 60));

    daysTimer.textContent = days;
    hoursTimer.textContent = hours;
    minutesTimer.textContent = minutes;
    secondsTimer.textContent = seconds;

};

function addDoubleZero(value) {
    return String(value).padStart(2, '0');
};



