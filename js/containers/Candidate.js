
import { Container, Circle } from 'pixi.js';

import { cursorClic, cursorDefault } from '../utils/cursor';
import Supporters from './Supporters';

const HIT_AREA_RADIUS = 100;

class CirclesGroup extends Container {
    constructor(
        {
            position = { x: 0, y: 0 },
        },
        candidate,
        supporters
    ) {
        super();

        this.position = position;

        this.candidate = candidate;
        this.supporters = new Supporters(supporters);
        this.supporters.rotate(); // TODO maybe not here

        this.interactive = true;
        this.hitArea = new Circle(0, 0, HIT_AREA_RADIUS);

        this.addChild(this.candidate);
        this.addChild(this.supporters);
    }

    mouseover() {
        this.candidate.overState(true);
        cursorClic();
    }

    mouseout() {
        this.candidate.overState(false);
        cursorDefault();
    }

    // mousedown() {
    //     console.log('clic');
    // }
}

export default CirclesGroup;
