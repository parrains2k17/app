
import { range } from 'underscore';

import Stage from './components/Stage';
import Circle from './components/Circle';

require('../sass/styles.scss');

console.log(`🤖 Parrains2017 v${VERSION}`);// eslint-disable-line no-undef

const
    width  = window.innerWidth,
    height = window.innerHeight,
    canvas = document.querySelector('.js-canvas-container');

const stage = new Stage(canvas, width, height);

// a bloc of 10 circle
const bloc = (x, y) => range(10)
    .map((i) => new Circle(
        x,
        y + 20,
        2,
        i / 10,
        i / 3
    ));

range(500)
    .map((i) => bloc(Math.floor(i / 10) * 30, (i % 20) * 60))
    .reduce((list, circles) => list.concat(circles), [])
    .map((c) => stage.add(c));

stage.start();

