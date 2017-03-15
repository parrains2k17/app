
import { Container, Circle } from 'pixi.js';
import { TweenMax, Power0 } from 'gsap';

import { cursorClic, cursorDefault } from '../utils/cursor';
import Supporters from './SupportersGroup';
import Candidate from '../components/Candidate';

const
    HIT_AREA_RADIUS         = 100,
    MOVE_TO_CENTER_DURATION = 0.3;

class CandidateGroup extends Container {
    constructor(
        {
            position = { x: 0, y: 0 },
        },
        supporters,
        controller
    ) {
        super();

        this.position = position;

        this.candidate = new Candidate(); // TODO pass data

        this.supporters = new Supporters(supporters);
        this.supporters.rotate(); // TODO maybe not here

        this.interactive = true;
        this.hitArea = new Circle(0, 0, HIT_AREA_RADIUS);

        this.addChild(this.candidate);
        this.addChild(this.supporters);

        this.screen = screen;
        this.controller = controller;
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
        this.controller.candidateOpen(this);
    }

    activate(x, y) {
        TweenMax.to(
            this,
            MOVE_TO_CENTER_DURATION,
            {
                x,
                y,
                ease:       Power0.easeNone,
                onComplete: () => {
                    this.candidate.hide();
                },
            }
        );
    }

    hide() {
        TweenMax.to(
            this,
            MOVE_TO_CENTER_DURATION,
            {
                alpha:      0,
                ease:       Power0.easeNone,
                onComplete: () => {
                    // for perf : if not visible, not drawn
                    this.visible = false;
                },
            }
        );
    }
}

export default CandidateGroup;
