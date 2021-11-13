export default class sliderCarousel {
    constructor({main, wrap, next, prev, infinity = false, position = 0, slidesToShow = 3, responsive = []}) {
        if (!main || !wrap) {
            console.warn('slider-carousel: Необходимо два свойства, "main" и "wrap"');
        }
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slides = document.querySelector(wrap).children;
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            infinity,
            widthSlide: Math.floor(100 / this.slidesToShow),
            maxPosition: this.slides.length - this.slidesToShow
        };
        this.responsive = responsive;
    }

    init() {
        this.addGloClass();
        this.addStyle();
        
        if (this.prev && this.next) {
            this.controlSlider();
        } else {
            this.addArrow();
            this.controlSlider();
        }

        if (this.responsive) {
            this.responseInit();
        }
    }

    addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');
        for (const item of this.slides) {
            item.classList.add('glo-slider__item');
        }
    }

    addStyle() {
        let style = document.getElementById('sliderCarousel-style');

        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarousel-style';
        }

        style.textContent = `
            .glo-slider {
                overflow: hidden !important;
            }
            .glo-slider__wrap {
                display: flex !important;
                align-items: center !important;
                transition: transform 0.5s !important;
                will-change: transform !important;
            }
            .glo-slider__item {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                flex: 0 0 ${this.options.widthSlide}% !important;
                margin: auto 0 !important;
                opacity: 1;
                transition: all ease 1s;
            }
            .glo-slider__item .opacity--0 {
                opacity: 0;
            }
            .glo-slider__prev,
            .glo-slider__next {
                margin: 0 10px;
                border: 20px solid transparent;
                background: transparent;
            }
            .glo-slider__next {
                border-left-color: #19b5fe;
            }
            .glo-slider__prev {
                border-right-color: #19b5fe;
            }
            .glo-slider__prev:hover,
            .glo-slider__next:hover,
            .glo-slider__prev:focus,
            .glo-slider__next:focus {
                background: transparent;
                outline: transparent;
            }
        `;

        document.head.append(style);
    }

    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.options.maxPosition;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`; 
        } 
    }

    nextSlider() {
        if (this.options.infinity || this.options.position < this.options.maxPosition) {
            ++this.options.position;
            if (this.options.position > this.options.maxPosition) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
        }
    }

    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.classList.add('glo-slider__prev');
        this.next.classList.add('glo-slider__next');

        this.main.append(this.prev);
        this.main.append(this.next);
    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map((item) => item.breakpoint);
        const maxResponse = Math.max(...allResponse);

        const checkResponse = () => {
            const widtWindow = document.documentElement.clientWidth;
            if (widtWindow < maxResponse) {
                for (let i = 0; i < allResponse.length; i++) {
                    if (widtWindow < allResponse[i]) {
                        this.slidesToShow = this.responsive[i].slideToShow;
                        this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                        this.addStyle();
                    }
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                this.options.widthSlide = Math.floor(100 / this.slidesToShow);
                this.addStyle();
            }
        };
        
        checkResponse();

        window.addEventListener('resize', checkResponse);
    }
}
