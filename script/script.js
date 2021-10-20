window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Timer
  function addZero(num) {
    return String(num).length === 1 ? '0' + num : num;
  }

  function countTimer(deadline) {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");
    let timerInterval = null;

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return { timeRemaining, hours, minutes, seconds };
    }

    const updateTimer = () => {

      const timer = getTimeRemaining();

      if (timer.timeRemaining <= 0) {
        if (!timerInterval) clearInterval(timerInterval);
        timerHours.textContent = "00";
        timerMinutes.textContent = "00";
        timerSeconds.textContent = "00";
      } else {
        timerHours.textContent = addZero(timer.hours);
        timerMinutes.textContent = addZero(timer.minutes);
        timerSeconds.textContent = addZero(timer.seconds);
      }
    };
    
    updateTimer();

    timerInterval = setInterval(updateTimer, 1000);

  }

  countTimer("21 October 2021");
});
