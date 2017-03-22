
import { Texture } from 'pixi.js';
import { TweenMax, Power0, Power1 } from 'gsap';

import CircleSprite from './CircleSprite';

const
    SHOW_DURATION = 1,
    HIDE_DURATION = 0.2;

class Candidate extends CircleSprite {
    constructor(texture, config = {}) {
        super({
            // TODO scale mode and resolution
            // TODO load in cache ?
            texture: Texture.fromImage(texture),
            ...config,
        });

        this.scale.set(0.15, 0.15);

        this.x = -32;
        this.y = -32;
        this.initialPosition = { ...this.position };
    }

    hide() {
        TweenMax.to(
            this,
            HIDE_DURATION,
            {
                alpha: 0,
                ease:  Power1.easeIn,
            }
        );
    }

    show() {
        TweenMax.to(
            this,
            SHOW_DURATION,
            {
                alpha: 1,
                ease:  Power1.easeIn,
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
