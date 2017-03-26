
import { Texture, Sprite } from 'pixi.js';

import { TweenMax, Power1 } from 'gsap';

const { random } = Math;

class Soucoupe extends Sprite {
    constructor({
        position = { x: 0, y: 0 },
        rotation = 0,
        alpha = 1,
        pivot = { x: 0, y: 0 },
    }) {
        super();

        this.alpha = alpha;
        this.position = position;
        this.pivot = pivot;
        this.rotation = rotation;
        this.texture = Texture.fromImage('images/soucoupe.png');

        // non-pixi attributes
        this.startPosition = position;
    }

    moveAround() {
        const { x, y } = this.position;

        const
            pos1 = { x: x + (1000 * random()), y: y + (1000 * random()) },
            pos2 = { x: x - (1000 * random()), y: y + (1000 * random()) };

        const [p1, p2] = (random() > 0.5) ? [pos1, pos2] : [pos2, pos1];

        this.movement = TweenMax.to(
            this,
            500,
            {
                repeat: -1,
                ease:   Power1.easeNone,
                bezier: {
                    type:      'thru',
                    curviness: 10,
                    values:    [
                        { x, y },
                        p1,
                        { x, y: y + (200 * random()) },
                        p2,
                        { x, y },
                    ],
                },
            }
        );
    }
}

export default Soucoupe;
