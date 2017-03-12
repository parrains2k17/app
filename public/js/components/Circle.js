
import { Graphics } from 'pixi.js';

import { WHITE } from '../style/color';

class Circle extends Graphics {
    constructor({
        position = { x: 0, y: 0 },
        offset = { x: 0, y: 0 },
        rotation = 0,
        alpha = 1,
        radius = 1,
        color = WHITE,
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
