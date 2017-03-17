
import { TweenMax, Power0 } from 'gsap';

import Circle from './Circle';

class MovingCircle extends Circle {
    constructor(config = {}) {
        super(config);

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

    rotate({ delay = 0, duration = 1, direction = 1 }) {
        this.killAnimation();
        const animate = () => TweenMax.to(
            this,
            duration,
            {
                delay,
                rotation:   this.rotation + (direction * Math.PI * 2),
                ease:       Power0.easeNone,
                onComplete: animate,
            }
        );

        this.animation = animate();
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

    resetPivot({ duration }) {
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
    }

    resetPosition({ duration }) {
        this.killAnimation();

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
}

export default MovingCircle;
