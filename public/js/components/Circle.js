
import { Graphics } from 'pixi.js';

import { BLUE, BLUE1, BLUE2, BLUE3, BLUE4 } from '../style/color';


/*
 *get a random number between min and max
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/*
 *return a random color
 *TODO améliorer pour que ce soit pas du bricolage
 */
function getColor() {
    const value = getRndInteger(1, 5);
    if (value === 1) {
        return BLUE4;
    } else if (value === 2) {
        return BLUE;
    } else if (value === 3) {
        return BLUE1;
    } else if (value === 4) {
        return BLUE2;
    } else if (value === 5) {
        return BLUE3;
    }
    return BLUE2;
}

class Circle extends Graphics {
    constructor({
        position = { x: 0, y: 0 },
        offset = { x: 0, y: 0 },
        rotation = 0,
        alpha = 1,
        radius = 1,
        color = getColor(),
        pivot = { x: 0, y: 0 },
    }) {
        super();
        this.beginFill(color);
        this.drawCircle(offset.x, offset.y, radius);
        this.endFill();

        this.alpha = alpha;
        this.position = position;
        this.pivot = pivot;
        this.rotation = rotation;

        // non-pixi attributes
        this.startPosition = position;
        this.offset = offset;
    }
}

export default Circle;
