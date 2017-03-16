
import { Container } from 'pixi.js';

import Supporter from '../components/Supporter';
import randomColor from '../utils/randomColor';
import randomNumber from '../utils/randomNumber';

import barchart from '../dataviz/barchart';

const { PI, random, sqrt } = Math;

const
    CENTER_DURATION   = 0.3,
    ROTATION_DURATION = 15;

const randomAlpha = () => {
    const res = randomNumber(0, 1, 1);
    if (res > 0.7) {
        return 1;
    }
    return res;
};

class Supporters extends Container {
    constructor(supporters) {
        super();
        this.supporters = supporters;
        this.addSupporters(supporters);
    }

    addSupporters(supporters) {
        supporters
            .map((supporter) => new Supporter({
                color:    randomColor(),
                rotation: 2 * random() * PI,
                pivot:    {
                    // Change 20 if the planet is bigger
                    x: randomNumber(
                        48,
                        sqrt(supporters.length * (100 / PI)),
                        sqrt(supporters.length * (100 / PI))
                    ),
                    y: -8,
                },
                alpha: randomAlpha(0, 1, 1),
                data:  supporter,
            }))
            .forEach((c) => this.addChild(c));
    }

    rotate() {
        this.children.forEach((c) => c.rotate({
            // random to smooth transition
            duration: ROTATION_DURATION + (random() * 6),
        }));
    }

    center() {
        this.children.forEach((c) => c.center({
            duration: CENTER_DURATION,
        }));
    }

    resetPosition() {
        this.children.forEach((c) => c.resetPivot({
            duration: CENTER_DURATION,
        }));
    }

    dataviz(selector) {
        // TODO
    }
}

export default Supporters;
