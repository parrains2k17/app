
import { Container } from 'pixi.js';

import { WHITE } from '../style/color';

const buildThing = (Thing, {
    alpha = 1,
    radius = 1,
    color = WHITE,
}, options) => {
    const thing = new Thing(options);
    thing.beginFill(color);
    thing.drawCircle(0, 0, radius);
    thing.endFill();

    return thing;
};

class Circle extends Container {
    constructor({
        position = { x: 0, y: 0 },
        rotation = 0,
        alpha = 1,
        radius = 1,
        color = WHITE,
        pivot = { x: 0, y: 0 },
    }, Thing, options) {
        super();
        this.position = position;
        this.pivot = pivot;
        this.rotation = rotation;
        this.Thing = Thing;

        // non-pixi attributes
        this.initialPosition = position;
        this.initialRotation = rotation;
        this.initialAlpha = alpha;
        this.initialRadius = radius;
        this.initialColor = color;
        this.initialPivot = pivot;
        this.options = options;

        this.reset();
    }

    reset() {
        this.removeChildren();
        this.addChild(buildThing(this.Thing, {
            alpha:  this.initialAlpha,
            radius: this.initialRadius,
            color:  this.initialColor,
        }, this.options));
    }

    changeColor(color) {
        this.removeChildren();
        this.addChild(buildThing(this.Thing, {
            alpha:  this.initialAlpha,
            radius: this.initialRadius,
            color,
        }));
    }

    resetColor() {
        this.changeColor(this.initialColor);
    }
}

export default Circle;
