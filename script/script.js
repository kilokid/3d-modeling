window.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Timer
  function addZero(num) {
    return String(num).length === 1 ? "0" + num : num;
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

  countTimer("6 November 2021");

  // menu
  const toggleMenu = () => {
    const menu = document.querySelector("menu");

    const openMenu = () => {
      menu.classList.add("active-menu");
    };

    const closeMenu = () => {
      menu.classList.remove("active-menu");
    };

    document.addEventListener("click", (event) => {
      const target = event.target;
      const openMenuBtn = target.closest('.menu');
      const closeMenuBtn = target.closest('.close-btn');
      const menuAnchorLinks = target.classList.contains('js-menu-link');

      if (openMenuBtn) {
        openMenu();
      } else if (closeMenuBtn || menuAnchorLinks) {
        event.preventDefault();
        closeMenu();
      } else {
        const areaOutsideMenu = !target.closest("menu");

        if (areaOutsideMenu) {
          closeMenu();
        }
      }
    });
  };

  toggleMenu();

  // popup window
  const togglePopUp = () => {
    const popup = document.querySelector(".popup"),
      popupBtn = document.querySelectorAll(".popup-btn"),
      popupContent = document.querySelector(".popup-content"),
      popupData = {
        count: -445,
        speed: 25,
        startPos: -445,
        endPos: 50,
      };

    const showPopup = () => {
      popupData.startPos > popupData.endPos
        ? (popupData.count -= popupData.speed)
        : (popupData.count += popupData.speed);
      popupContent.style.transform = `translateY(${popupData.count}px)`;

      if (popupData.startPos > popupData.endPos) {
        return;
      } else {
        if (popupData.count < popupData.endPos) {
          requestAnimationFrame(showPopup);
        }
      }
    };

    const closePopup = () => {
      popupData.startPos > popupData.endPos
        ? (popupData.count -= popupData.speed)
        : (popupData.count += popupData.speed);
      popupContent.style.transform = `translateY(${popupData.count}px)`;

      if (popupData.startPos > popupData.endPos) {
        return;
      } else {
        if (popupData.count < popupData.endPos) {
          requestAnimationFrame(closePopup);
        } else {
          popupData.startPos = -445;
          popupData.endPos = 50;
          popup.style.display = "none";
        }
      }
    };

    popupBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        popup.style.display = "block";
        if (screen.width > 768) {
          popupData.count = popupData.startPos;
          popupContent.style.left = "36%";
          requestAnimationFrame(showPopup);
        }
      });
    });

    popup.addEventListener("click", (event) => {
      const target = event.target;
      popupData.startPos = 50;
      popupData.endPos = 700;
      if (target.classList.contains("popup-close")) {
        screen.width > 768
          ? requestAnimationFrame(closePopup)
          : (popup.style.display = "none");
      } else {
        const targetClick = target.closest(".popup-content");

        if (!targetClick) {
          screen.width > 768
            ? requestAnimationFrame(closePopup)
            : (popup.style.display = "none");
        }
      }
    });
  };

  togglePopUp();

  // smooth scrool
  const smoothScrool = () => {
    const smothScrollElems = document.querySelectorAll(
      'a[href^="#"]:not(a[href="#"])'
    );

    smothScrollElems.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        const id = link.getAttribute("href").slice(1);

        document.getElementById(id).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  };

  smoothScrool();

  // tabs
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header");
    const tab = tabHeader.querySelectorAll(".service-header-tab");
    const tabContent = document.querySelectorAll(".service-tab");

    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };

    tabHeader.addEventListener("click", (event) => {
      const target = event.target.closest(".service-header-tab");
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

  // slider
  const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
      interval;

    const renderDots = () => {
      const dotsWrapper = document.querySelector('.portfolio-dots');
      slide.forEach((elem) => {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        if (elem.matches('.portfolio-item-active')) {
          dot.classList.add('dot-active');
        }
        dotsWrapper.append(dot);
      });
    };

    renderDots();

    const dots = document.querySelectorAll('.dot');

    const prevSlide = (elemsCollection, index, strClass) => {
      elemsCollection[index].classList.remove(strClass);
    };

    const nextSlide = (elemsCollection, index, strClass) => {
      elemsCollection[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dots, currentSlide, 'dot-active');
    };

    const startSlider = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };

    const stopSlider = () => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();

      const target = event.target;

      if (!target.matches('.portfolio-btn, .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dots, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dots.forEach((dot, index) => {
          if (dot === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dots, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {
      if (event.target.matches('.portfolio-btn') ||
      event.target.matches('.dot')) {
        stopSlider();
      }
    });

    slider.addEventListener('mouseout', (event) => {
      if (event.target.matches('.portfolio-btn') ||
      event.target.matches('.dot')) {
        startSlider(1500);
      }
    });

    startSlider(1500);
  };

  slider();

 // alternate team photo
 const teamPhotoSwitch = () => {
   const commandWrapper = document.getElementById("command");

   const changingPhotos = (event) => {
     const target = event.target;

     if (target.classList.contains("command__photo")) {
       const lastSrc = target.src;

       target.src = target.dataset.img;
       target.dataset.img = lastSrc;
     }
   };

   commandWrapper.addEventListener("mouseover", changingPhotos);
   commandWrapper.addEventListener("mouseout", changingPhotos);
 };

 teamPhotoSwitch();

  // calculator functional
  const calculator = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block');
    const calcType = document.querySelector('.calc-type');
    const calcSquare = document.querySelector('.calc-square');
    const calcDay = document.querySelector('.calc-day');
    const calcCount = document.querySelector('.calc-count');
    const totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0;
      let countValue = 1;
      let dayValue = 1;
      let step = 25;
      let start = totalValue.textContent;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;

      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }

      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }

      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      
      let timerInterval;

      const numAnimate = () => {
        
        if (start < total) {
          timerInterval = requestAnimationFrame(numAnimate);  
        } else if (start > total) {
          step = -25;
          timerInterval = requestAnimationFrame(numAnimate);
        }
        totalValue.textContent = +totalValue.textContent + step;

        if ((total - totalValue.textContent) * step < 1) {
          cancelAnimationFrame(numAnimate);
          start = totalValue.textContent;
          totalValue.textContent = Math.round(total);
        }
      };

      timerInterval = requestAnimationFrame(numAnimate);
		};

    calcBlock.addEventListener('change', (event) => {
      const target = event.target;

      if (target.matches('select') || target.matches('input')) {
        countSum();
      }
    });

    // calculator validation
    const calculatorValidation = () => {
      document.querySelector('.calc-block').addEventListener('input', (event) => {
        const target = event.target;

        if (target.type === 'text') {
          target.value = target.value.replace(/[^0-9.]/, '');
        }
      });
    };

    calculatorValidation();
  };

  calculator(100);

  // send-ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо, мы скоро с вами свяжемся!';

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem; color: white';
    
    document.addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target;

      target.append(statusMessage);
      statusMessage.textContent = loadMessage;

      const formData = new FormData(target);
      const body = {};
      
      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body)
        .then(() => {
          target.querySelectorAll('input').forEach(input => input.value = '');
          statusMessage.textContent = successMessage;
        })
        .catch(error => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        });
    });

    const postData = (body) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');

        request.addEventListener('readystatechange', () => {
          if (request.readyState != 4) {
            return;
          }
  
          if (request.status === 200) {
            resolve(request);
          } else {
            reject(new Error(request));
          }
        });
  
        request.send(JSON.stringify(body));
      });
    };
  };

  sendForm();

  // mask for phone valid
  const maskPhone = (input, masked = '+7 (___) ___-__-__') => {

      function mask(event) {
      const keyCode = event.keyCode;
      const template = masked,
        def = template.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, "");

      let i = 0,
        newValue = template.replace(/[_\d]/g, (a) => {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
        });
      i = newValue.indexOf("_");
      if (i != -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template.substr(0, this.value.length).replace(/_+/g,
        (a) => {
          return "\\d{1," + a.length + "}";
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
        this.value = newValue;
      }
      if (event.type == "blur" && this.value.length < 5) {
        this.value = "";
      }
  
    }

    input.addEventListener("input", mask);
    input.addEventListener("focus", mask);
    input.addEventListener("blur", mask);
    
  };

  // validation form phone & name inputs
  const validFormInputs = () => {
    const forms = document.querySelectorAll('[name="user_form"]');
    forms.forEach((form) => {
      const formPhoneInput = form.querySelector('.form-phone');
      maskPhone(formPhoneInput);
    });
    
    document.addEventListener('input', (event) => {
      const target = event.target;

      if (target.closest('.form-name') || target.placeholder === 'Ваше имя') {
        target.value = target.value.replace(/[^а-яё ]+$/gi, '');
      }
    });

  };

  validFormInputs();
});