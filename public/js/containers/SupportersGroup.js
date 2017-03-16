
import { groupBy } from 'underscore';
import { Container } from 'pixi.js';

import Supporter from '../components/Supporter';
import randomColor from '../utils/randomColor';

const { PI, floor, random, log } = Math;

const
    CENTER_DURATION   = 0.3,
    ROTATION_DURATION = 15,
    MAX_ROW_SIZE      = 20;

const getChunks = (arr, maxChunkSize) =>
    groupBy(arr, (_, i) => floor(i / maxChunkSize));

class Supporters extends Container {
    constructor(supporters) {
        super();
        this.supporters = supporters;
        this.addSupporters(supporters);
    }

    addSupporters(supporters) {
        const rows = getChunks(supporters, MAX_ROW_SIZE);

        Object.keys(rows).forEach((row) => {
            const l = rows[row].length;
            rows[row]
                .map((_, i) => new Supporter({
                    color:    randomColor(),
                    rotation: (
                        (i / l)            // index in row
                        * (0.5 + random()) // randomize to fill more natural
                        * PI * 2
                    ),
                    pivot: {
                        x: 20 + (20 * log(row)), // offset according to row
                        y: -8,
                    },
                }))
                .forEach((c) => this.addChild(c));
        });
    }

    rotate() {
        this.children.forEach((c) => c.rotate({
            // random to smooth transition
            duration: ROTATION_DURATION + (random() * 2),
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
}

export default Supporters;
