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

  // smooth scrool
  const smoothScrool = () => {
    const smothScrollElems = document.querySelectorAll('a[href^="#"]:not(a[href="#"])');

    smothScrollElems.forEach(link => {
      link.addEventListener('click', (event) => {
          event.preventDefault();
          const id = link.getAttribute('href').slice(1);
          
          document.getElementById(id).scrollIntoView({
              behavior: 'smooth',
          });
      });
    });
  };

  smoothScrool();
});
