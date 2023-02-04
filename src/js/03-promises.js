import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
};


refs.form.addEventListener('submit', onCreatePromiseStart);

function onCreatePromiseStart(e) {
  e.preventDefault();
  const step = Number(refs.form.elements.step.value);
  console.log(step);
  let delay = Number(refs.form.elements.delay.value);
  const amount = refs.form.elements.amount.value;
  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  } 
}

function createPromise(position, delay) {
  const p = new Promise((resolve, reject) =>
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay)
  );
  return p;
}







//--------------------------------------
// import {Notify} from 'notiflix';
// // import "notiflix/dist/notiflix-3.2.6.min.css";

// const form = document.querySelector('.form');

// form.addEventListener('submit', onSubmit);

// function createPromise(position, delay) {
//   return new Promise((resolve, reject)=>{
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(()=>{
//     if (shouldResolve) {
//       resolve({ position, delay });
//     } else {
//       reject({ position, delay });
//     }
//   }, delay);
//   });
// }

// function onSubmit(e) {
//   e.preventDefault();
//   const {delay, step, amount} = e.target.elements;
//   let delayInput = +delay.value;
//   let stepInput = +step.value;
//   let amountInput = +amount.value;

//   for (let position = 1; position <= amountInput; position += 1) {
//     createPromise(position, delayInput)
//       .then(({ position, delay }) => {
//         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       })
//     delayInput += stepInput;
//   }
//   e.target.reset();
// }