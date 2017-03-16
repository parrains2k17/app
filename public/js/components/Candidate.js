
import { TweenMax, Power0 } from 'gsap';

import MovingCircle from './MovingCircle';

import { PURPLE } from '../style/color';

const HIDE_DURATION = 0.3;

class Candidate extends MovingCircle {
    constructor(config = {}) {
        super({ radius: 10, color: PURPLE, ...config });
    }

    overState(active = false) {
        if (active) {
            this.scale.set(1.2, 1.2);
        } else {
            this.scale.set(1, 1);
        }
    }

    hide(x) {
        TweenMax.to(
            this,
            HIDE_DURATION,
            {
                x,
                ease: Power0.easeNone,
            }
        );
    }
}

export default Candidate;
