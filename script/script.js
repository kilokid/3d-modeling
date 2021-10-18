window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Timer
  function countTimer(deadline) {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return { timeRemaining, hours, minutes, seconds };
    }

    function getZero(num) {
      if (num >= 0 && num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    }

    const timer = getTimeRemaining();

    timerHours.textContent = getZero(timer.hours);
    timerMinutes.textContent = getZero(timer.minutes);
    timerSeconds.textContent = getZero(timer.seconds);

    if (timer.timeRemaining <= 0) {
      clearInterval(updateClock);
      timerHours.textContent = "00";
      timerMinutes.textContent = "00";
      timerSeconds.textContent = "00";
    }
  }

  const updateClock = setInterval(() => {
    countTimer("21 October 2021");
  }, 10);
});
