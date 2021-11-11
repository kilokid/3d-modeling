"use strict";

import '@babel/polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import 'nodelist-foreach-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import smoothScrool from './modules/smoothScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import teamPhotoSwitch from './modules/switchTeamPhotos';
import calculator from './modules/calc';
import sendForm from './modules/sendForm';
import validFormInputs from './modules/validFormInputs';

import sliderCarousel from '../plugins/sliderCarousel/sliderCarousel';

countTimer("12 November 2021");
toggleMenu();
togglePopUp();
smoothScrool();
tabs();
slider();
teamPhotoSwitch();
calculator(100);
sendForm();
validFormInputs();

const carousel = new sliderCarousel({
    main: '.companies-wrapper',
    wrap: '.companies-hor',
    // prev: '#test-left',
    // next: '#test-right',
    slidesToShow: 4,
    infinity: true,

    responsive: [{
        breakpoint: 1024,
        slideToShow: 3
    },
    {
        breakpoint: 768,
        slideToShow: 2
    },
    {
        breakpoint: 576,
        slideToShow: 1
    }]
});
carousel.init();