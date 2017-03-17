
import { Texture } from 'pixi.js';
import { TweenMax, Power0, Power1 } from 'gsap';

import { getWidth, getHeight } from '../utils/window';

import CircleSprite from './CircleSprite';

const HIDE_DURATION = 0.3;
const TO_CORNER_DURATION = 3;

class Candidate extends CircleSprite {
    constructor(config = {}) {
        super({
            // TODO scale mode and resolution
            // TODO load in cache ?
            texture: Texture.fromImage('images/planete.png'),
            ...config,
        });

        this.scale.set(0.15, 0.15);

        this.x = -48;
        this.y = -48;
        this.initialPosition = { ...this.position };
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

    getToCorner() {
        TweenMax.to(
            this,
            TO_CORNER_DURATION,
            {
                x:    -(getWidth() / 2),
                y:    (getHeight() / 3) - this.y,
                ease: Power1.easeIn,
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

    killAnimation() {
        if (this.animation) {
            this.animation.kill();
        }
    }
}


export default Candidate;
