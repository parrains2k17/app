
import { groupBy } from 'underscore';
import { Container } from 'pixi.js';

import Supporter from '../components/Supporter';
import randomColor from '../utils/randomColor';

const { PI, floor, random } = Math;

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
        const
            rows = getChunks(supporters, MAX_ROW_SIZE),
            l    = rows[0].length;

        Object.keys(rows).forEach((row) => {
            rows[row]
                .map((_, i) => new Supporter({
                    color:    randomColor(),
                    rotation: (
                        (i / l)               // index in row
                        + (100 / (l * row))   // tiny offseet for each row
                    ) * PI * 2,
                    offset: {
                        x: 30 + (10 * row),   // offset according to row
                        y: 0,
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
