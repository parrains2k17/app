/* eslint-disable no-new */

import { utils } from 'pixi.js';
import AppController from './AppController';
import Modal, { INTRO_MODAL, WEBGL_MODAL } from './components/Modal';
import Credits from './components/Credits';

require('../sass/styles.scss');

console.log(`🤖 Parrains2017 v${VERSION}`);// eslint-disable-line no-undef

if (utils.isWebGLSupported()) {
    const app = new AppController();
    new Modal(INTRO_MODAL); // show intro message
    new Credits();          // listen for credit

    app.start(); // start 🚀
} else {
    new Modal(WEBGL_MODAL); // show no webGL error message
}

