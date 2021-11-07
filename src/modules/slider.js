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

export default slider;