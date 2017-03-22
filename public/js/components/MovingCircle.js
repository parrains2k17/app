
import { TweenMax, Power0 } from 'gsap';

import Circle from './Circle';

const MOVE_DURATION = 0.3;

class MovingCircle extends Circle {
    constructor(config = {}, Thing, options) {
        super(config, Thing, options);

        this.animation = null;

        // copy intial values
        this.initialRotation = { ...this.rotation };
        this.initialPivot = { ...this.pivot };
        this.initialPosition = { ...this.position };
    }

    killAnimation() {
        if (this.animation) {
            this.animation.kill();
        }
    }

    center({ duration }) {
        this.killAnimation();

        TweenMax.to(
            this.pivot,
            duration,
            {
                x:    0,
                y:    0,
                ease: Power0.easeNone,
            }
        );
    }

    resetPosition({ duration }) {
        this.killAnimation();

        TweenMax.to(
            this.pivot,
            duration,
            {
                x:    this.initialPivot._x,
                y:    this.initialPivot._y,
                ease: Power0.easeNone,
            }
        );

        TweenMax.to(
            this.position,
            duration,
            {
                x:    this.initialPosition._x,
                y:    this.initialPosition._y,
                ease: Power0.easeNone,
            }
        );
    }

    wait({ delay = 0, duration = 1 }) { // TODO better waiting state
        const { x, y } = this.startPosition;
        this.killAnimation();
        this.animation = TweenMax.to(
            this,
            duration,
            {
                delay,
                repeat: -1,
                ease:   Power0.easeNone,
                bezier: {
                    type:      'thru',
                    curviness: 5,
                    values:    [
                        { x, y },
                        { x: x + 100, y: y + 100 },
                        { x: x + 0, y: y + 200 },
                        { x: x - 100, y: y + 100 },
                        { x, y },
                    ],
                },
            }
        );
    }

    moveX(x) {
        TweenMax.to(
            this.position,
            MOVE_DURATION,
            {
                x,
                ease: Power0.easeNone,
            }
        );
    }

    moveY(y) {
        TweenMax.to(
            this.position,
            MOVE_DURATION,
            {
                y,
                ease: Power0.easeNone,
            }
        );
    }

    fade() {
        if (this.alpha === 0) {
            return;
        }

        TweenMax.to(
            this,
            MOVE_DURATION,
            {
                alpha: 0,
                ease:  Power0.easeNone,
            }
        );
    }

    show() {
        if (this.alpha === 1) {
            return;
        }

        TweenMax.to(
            this,
            MOVE_DURATION,
            {
                alpha: 1,
                ease:  Power0.easeNone,
            }
        );
    }
}

export default MovingCircle;
