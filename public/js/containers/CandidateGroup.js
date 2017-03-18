
import { Container, Circle } from 'pixi.js';
import { TweenMax, Power0 } from 'gsap';

import Supporters from './SupportersGroup';
import Candidate from '../components/Candidate';

const { random } = Math;

const
    HIT_AREA_RADIUS         = 100,
    HIDE_DURATION           = 0.1,
    MOVE_TO_CENTER_DURATION = 3,
    MOVEMENT_DURATION       = 60;

class CandidateGroup extends Container {
    constructor(
        {
            position = { x: 0, y: 0 },
        },
        infos,
        supporters,
        texture,
        controller
    ) {
        super();

        this.position = position;
        this.initialPosition = { ...position }; // copy
        this.infos = infos;

        console.log(this, this.initialPosition);

        this.candidate = new Candidate(texture); // TODO pass data

        this.supporters = new Supporters(supporters);
        this.supporters.rotate(); // TODO maybe not here

        this.interactive = true;
        this.hitArea = new Circle(0, 0, HIT_AREA_RADIUS);

        this.addChild(this.candidate);
        this.addChild(this.supporters);

        this.controller = controller;

        this.moveAround();
    }

    mousedown() {
        this.controller.candidateOpen(this);
    }

    activate(x, y) {
        this.killMovement();

        TweenMax.to(
            this,
            MOVE_TO_CENTER_DURATION,
            {
                x,
                y,
                ease: Power0.easeNone,
                // onComplete: () => {
                //     this.candidate.goTo(x, y, 1);
                // }
            }
        );

        TweenMax.to(
            this.scale,
            MOVE_TO_CENTER_DURATION,
            {
                x:    3,
                y:    3,
                ease: Power0.easeNone,
            }
        );
    }

    hide() {
        this.killMovement();

        TweenMax.to(
            this,
            HIDE_DURATION,
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

    reset() {
        // TODO : reset candidate position first
        console.log(this, this.initialPosition);


        TweenMax.to(
            this,
            MOVE_TO_CENTER_DURATION,
            {
                alpha:      1,
                x:          this.initialPosition.x,
                y:          this.initialPosition.y,
                ease:       Power0.easeNone,
                onComplete: () => {
                    this.moveAround();
                    // TODO change for a fade in (?)
                    this.visible = true;
                },
            }
        );

        TweenMax.to(
            this.scale,
            MOVE_TO_CENTER_DURATION,
            {
                x:    1,
                y:    1,
                ease: Power0.easeNone,
            }
        );

        this.supporters.resetPosition();
        this.supporters.rotate();
        this.candidate.resetPosition({ MOVE_TO_CENTER_DURATION });
    }

    moveAround() { // TODO better waiting state
        const { x, y } = this.position;

        const
            pos1 = { x: x + (100 * random()), y: y + (100 * random()) },
            pos2 = { x: x - (100 * random()), y: y + (100 * random()) };

        const [p1, p2] = (random() > 0.5) ? [pos1, pos2] : [pos2, pos1];

        this.movement = TweenMax.to(
            this,
            MOVEMENT_DURATION,
            {
                repeat: -1,
                ease:   Power0.easeNone,
                bezier: {
                    type:      'thru',
                    curviness: 10,
                    values:    [
                        { x, y },
                        p1,
                        { x, y: y + (200 * random()) },
                        p2,
                        { x, y },
                    ],
                },
            }
        );
    }

    killMovement() {
        this.movement.kill();
    }
}

export default CandidateGroup;
