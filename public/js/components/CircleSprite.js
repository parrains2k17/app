
import { Sprite } from 'pixi.js';

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

export default CircleSprite;
