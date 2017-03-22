
import { Texture, Sprite } from 'pixi.js';
import { TweenMax, Power0, Power1 } from 'gsap';

const
    SHOW_DURATION = 1,
    HIDE_DURATION = 0.2;

class CircleSprite extends Sprite {
    constructor({
        position = { x: 0, y: 0 },
        rotation = 0,
        alpha = 1,
        pivot = { x: 0, y: 0 },
        texture,
    }) {
        super(texture);

        this.alpha = alpha;
        this.position = position;
        this.pivot = pivot;
        this.rotation = rotation;

        // non-pixi attributes
        this.startPosition = position;
    }
}

class Candidate extends CircleSprite {
    constructor(texture, config = {}) {
        super({
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
}

export default Candidate;

