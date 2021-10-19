window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Timer
  const countTimer = (deadline) => {
    const timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds");

    const getTimeRemaining = () => {
      const dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);
      return { timeRemaining, hours, minutes, seconds };
    };

    const getZero = (num) => {
      if (num >= 0 && num < 10) {
        return "0" + num;
      } else {
        return num;
      }
    };

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
  };

  const updateClock = setInterval(() => {
    countTimer("21 October 2021");
  }, 10);

  // menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');
    const closebtn = document.querySelector('.close-btn');
    const menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', handlerMenu);

    closebtn.addEventListener('click', handlerMenu);

    menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));
  };

  toggleMenu();

  // popup window
  const togglePopUp = () => {
    const popup = document.querySelector('.popup');
    const popupBtns = document.querySelectorAll('.popup-btn');
    const popUpClose = document.querySelector('.popup-close');
    const popUpContent = document.querySelector('.popup-content');

    let count = 0;
    const popUpAnimation = () => {
      if (screen.width < 768) {
        popUpContent.style.top = '62px';
        return;
      } else {
        const timer = setInterval(() => {
          count++;
          if (count < 100) {
            popUpContent.style.top = count + 'px';
          } else {
            clearInterval(timer);
          }
        }, 1);
      }
    };
    console.log(screen.width);

    popupBtns.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        popUpAnimation();
      });
    });

    popUpClose.addEventListener('click', () => {
      popup.style.display = 'none';
      popUpContent.style.top = '0px';
      count = 0;
    });
  };

  togglePopUp();
});
