
import { TweenMax, Power0 } from 'gsap';

import Circle from './Circle';

/*
 *return a random number [not integer] between min and max
 */
function getRndNumber(min, max) {
    return (Math.random() * (max - min)) + min;
}

class MovingCircle extends Circle {
    constructor(config = {}) {
        super(config);

        this.animation = null;
    }

    killAnimation() {
        if (this.animation) {
            this.animation.kill();
        }
    }

    rotate({ delay = 0, duration = 1 }) {
        this.killAnimation();
        this.animation = TweenMax.fromTo(
            this,
            duration,
            { rotation: this.rotation },
            {
                delay,
                rotation: this.rotation + (Math.PI * getRndNumber(1.5, 2.5)),
                repeat:   -1,
                ease:     Power0.easeNone,
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
