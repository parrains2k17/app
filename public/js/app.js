
import Stage from './components/Stage';
import Circle from './components/Circle';

import { PURPLE } from './style/color';

import { pointsPositionInRect } from './utils/points';

require('../sass/styles.scss');

console.log(`🤖 Parrains2017 v${VERSION}`);// eslint-disable-line no-undef

const
    width  = window.innerWidth,
    height = window.innerHeight,
    canvas = document.querySelector('.js-canvas-container');

const stage = new Stage(canvas, width, height);

const
    n = 1000,
    W = 100,
    H = 300;

pointsPositionInRect(n, W, H)
    .map(
        ({ x, y }) => new Circle({
            color:    PURPLE,
            radius:   1,
            position: {
                x: x + 10,
                y: y + 10,
            },
        })
    )
    .forEach((p) => {
        console.log(p.position);
        stage.add(p);
    });

stage.start();
