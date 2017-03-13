
import { groupBy } from 'underscore';
import { Container } from 'pixi.js';

import Supporter from '../components/Supporter';
import randomColor from '../utils/randomColor';

const { PI, floor, random, log } = Math;

const MAX_ROW_SIZE = 20;

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
        const duration = 15;
        this.children.forEach((c) => c.rotate({
            duration: duration + (random() * 2), // random to smooth transition
        }));
    }
}

export default Supporters;
