"use strict";

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

countTimer("6 November 2021");
toggleMenu();
togglePopUp();
smoothScrool();
tabs();
slider();
teamPhotoSwitch();
calculator(100);
sendForm();
validFormInputs();