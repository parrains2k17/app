
import { Texture } from 'pixi.js';
import { TweenMax, Power0 } from 'gsap';

import CircleSprite from './CircleSprite';

const HIDE_DURATION = 0.3;

class Candidate extends CircleSprite {
    constructor(config = {}) {
        super({
            // TODO scale mode and resolution
            // TODO load in cache ?
            texture: Texture.fromImage('images/planete.png'),
            ...config,
        });

        this.scale.set(0.05, 0.05);

        this.x = -16;
        this.y = -16;
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
