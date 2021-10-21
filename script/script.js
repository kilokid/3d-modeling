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

  countTimer("22 October 2021");

  // menu
  const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };

    document.addEventListener('click', (event) => {
      	let target = event.target;

        if (target.classList.contains('.close-btn') || target.tagName === 'A') {
          console.log('qq');
        } else if (target.closest('menu')) {
          return;
        }

        handlerMenu();
    });
  };

  toggleMenu();

  // popup window
  const togglePopUp = () => {
    const popup = document.querySelector('.popup');
    const popupBtns = document.querySelectorAll('.popup-btn');
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

    popupBtns.forEach((elem) => {
      elem.addEventListener('click', () => {
        popup.style.display = 'block';
        popUpAnimation();
      });
    });

    const popUpClose = () => {
      popup.style.display = 'none';
      popUpContent.style.top = '0px';
      count = 0;
    };

    popup.addEventListener('click', (event) => {
      let target = event.target;

      if (target.classList.contains('popup-close')) {
        popUpClose();
      } else {
        target = target.closest('.popup-content');

        if (!target) {
          popUpClose();
        }
      }
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

  // tabs
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header');
    const tab = tabHeader.querySelectorAll('.service-header-tab');
    const tabContent = document.querySelectorAll('.service-tab');

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        }
      }
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab');
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }

    });
  };

  tabs();
});
