/* eslint-disable no-new */

import { utils } from 'pixi.js';
import AppController from './AppController';
import Modal from './components/Modal';
import Credits from './components/Credits';


require('../sass/styles.scss');

console.log(`🤖 Parrains2017 v${VERSION}`);// eslint-disable-line no-undef


if (utils.isWebGLSupported()) {
    const app = new AppController();
    new Modal('intro');
    new Credits();

    app.start();
} else {
    new Modal('webGL');
}

