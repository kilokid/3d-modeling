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

  countTimer("25 October 2021");

  // menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu');
    const menu = document.querySelector('menu');

    const menuHandler = () => {
      menu.classList.toggle('active-menu');
    };

    btnMenu.addEventListener('click', menuHandler);

    menu.addEventListener('click', (event) => {
      const target = event.target;
      event.preventDefault();
      
      if (target.closest('close-btn') || target.classList.contains('js-menu-link')) {
        menuHandler();
      }
    });
  };

  toggleMenu();

  // popup window

  const togglePopUp = () => {
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'),
			popupContent = document.querySelector('.popup-content'),
			popupData = {
				count: -445,
				speed: 25,
				startPos: -445,
				endPos: 50
			};

		const showPopup = () => {

      popupData.startPos > popupData.endPos ?
				popupData.count -= popupData.speed :
				popupData.count += popupData.speed;
      popupContent.style.transform = `translateY(${popupData.count}px)`;

			if (popupData.startPos > popupData.endPos ?
				popupData.count > popupData.endPos :
				popupData.count < popupData.endPos) {
				requestAnimationFrame(showPopup);
			}
		};

    const closePopup = () => {

      popupData.startPos = 50;
      popupData.endPos = 700;

      popupData.startPos > popupData.endPos ?
				popupData.count -= popupData.speed :
				popupData.count += popupData.speed;
      popupContent.style.transform = `translateY(${popupData.count}px)`;


      if (popupData.startPos < popupData.endPos ?
				popupData.count < popupData.endPos :
				popupData.count > popupData.endPos) {
          requestAnimationFrame(closePopup);
      } else {
        popupData.startPos = -445;
        popupData.endPos = 50; 
        popup.style.display = 'none';
      }
    };

		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
				if (screen.width > 768) {
					popupData.count = popupData.startPos;
          popupContent.style.left = '36%';
					requestAnimationFrame(showPopup);
				}
			});
		});

		popup.addEventListener('click', event => {
			let target = event.target;

			if (target.classList.contains('popup-close')) {
        screen.width > 768 ? requestAnimationFrame(closePopup) : popup.style.display = 'none';
			} else {
				target = target.closest('.popup-content');

				if (!target) {
					screen.width > 768 ? requestAnimationFrame(closePopup) : popup.style.display = 'none';
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
