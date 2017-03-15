
import { Container, Circle } from 'pixi.js';
import { TweenMax, Power0 } from 'gsap';

import { cursorClic, cursorDefault } from '../utils/cursor';
import Supporters from './SupportersGroup';

const
    HIT_AREA_RADIUS         = 100,
    MOVE_TO_CENTER_DURATION = 0.3;

class CandidateGroup extends Container {
    constructor(
        {
            position = { x: 0, y: 0 },
            screen,
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

        this.screen = screen;
    }

    mouseover() {
        this.candidate.overState(true);
        cursorClic();
    }

    mouseout() {
        this.candidate.overState(false);
        cursorDefault();
    }

    mousedown() {
        const { width, height } = this.screen;
        TweenMax.to(
            this,
            MOVE_TO_CENTER_DURATION,
            {
                x:    width / 2,
                y:    height / 2,
                ease: Power0.easeNone,
            }
        );
    }
}

export default CandidateGroup;
