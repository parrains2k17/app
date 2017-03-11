
import * as PIXI from 'pixi.js';

require('../sass/styles.scss');

console.log(`🤖 Parrains2017 v${VERSION}`);// eslint-disable-line no-undef

const renderer = PIXI.autoDetectRenderer(256, 256);
const canvas = document.querySelector('.js-canvas-container');

console.log(canvas);

canvas.appendChild(renderer.view);

const stage = new PIXI.Container();

renderer.render(stage);
