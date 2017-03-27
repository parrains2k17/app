
import { Texture, Sprite } from 'pixi.js';

import { TweenMax, Power0 } from 'gsap';

import { getWidth, getHeight } from '../utils/window';

const { random, PI } = Math;

const
    DEFAULT_SCALE      = 0.3,
    SCREEN_MULTI       = 1.4,
    CROSSING_DURATION  = 8,
    NORMAL_FREQUENCY   = 1,
    CRAZY_FREQUENCY    = 1;

class Soucoupe extends Sprite {
    constructor({
        position = { x: -getWidth(), y: -getHeight() },
        rotation = 0,
        pivot = { x: 0, y: 0 },
    }) {
        super();

        this.position = position;
        this.pivot = pivot;
        this.rotation = rotation;
        this.texture = Texture.fromImage('images/soucoupe.png');

        this.scale.set(DEFAULT_SCALE, DEFAULT_SCALE);

        this.crazy = false;
    }

    moveScale() {
        const scale = (random() * 0.2) + 0.1;

        TweenMax.to(
            this.scale,
            CROSSING_DURATION,
            {
                x:    scale,
                y:    scale,
                ease: Power0.easeNone,
            }
        );
    }

    moveRotate() {
        const
            rotation = ((8 * random()) - 4) * PI,
            y = ((2 * random()) - 1) * 100,
            x = ((2 * random()) - 1) * 100;

        TweenMax.to(
            this,
            CROSSING_DURATION,
            {
                rotation,
                ease: Power0.easeNone,
            }
        );

        TweenMax.to(
            this.pivot,
            CROSSING_DURATION,
            {
                x,
                y,
                ease: Power0.easeNone,
            }
        );
    }

    moveAround() {
        console.log('move1');
        const
            width = getWidth() * SCREEN_MULTI,
            height = getHeight() * SCREEN_MULTI;

        const
            x = (this.x < 0) ? width : -width,
            y = (random() - 0.5) * height;

        console.log(x, y);

        TweenMax.to(
            this.position,
            CROSSING_DURATION,
            {
                x:          x + (0.5 * width), // center
                y:          y + (0.5 * height),
                ease:       Power0.easeNone,
                onComplete: () => {
                    console.log('done');
                    setTimeout(() => {
                        console.log('move');
                        this.moveAround();

                        if (this.crazy) {
                            this.moveRotate();
                            this.moveScale();
                        }
                    }, this.crazy ? CRAZY_FREQUENCY : NORMAL_FREQUENCY);
                },
            }
        );
    }

    toggleCrazy() {
        this.crazy = this.crazy;

        if (!this.crazy) {
            this.pivot.set(0, 0);
            this.scale.set(DEFAULT_SCALE, DEFAULT_SCALE);
            this.rotation = 0;
        }
    }
}

export default Soucoupe;
