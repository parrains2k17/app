
import { Graphics, Sprite } from 'pixi.js';

import renderer from '../services/renderer';
import { WHITE } from '../style/color';

const cache = (() => {
    const store = {};

    return {
        add: (name, texture) => {
            store[name] = texture;
        },
        find: (name) => store[name],
    };
})();

const buildTexture = ({
    radius = 1,
    color = WHITE,
}) => {
    const circle = new Graphics();
    circle.beginFill(color);
    circle.drawCircle(0, 0, radius);
    circle.endFill();

    return renderer.get().generateTexture(
        circle,
        renderer.getScaleMode(),
        renderer.getDevicePixelRatio()
    );
};

const getTexture = ({
    radius = 1,
    color = WHITE,
}) => {
    const
        name = `circle-${radius}-${color}`,
        cached = cache.find(name);

    if (!cached) {
        const texture = buildTexture({
            radius,
            color,
        });
        cache.add(name, texture);
        return texture;
    }

    return cached;
};

class Circle extends Sprite {
    constructor({
        position = { x: 0, y: 0 },
        rotation = 0,
        alpha = 1,
        radius = 1,
        color = WHITE,
        pivot = { x: 0, y: 0 },
    }) {
        super();
        this.position = position;
        this.pivot = pivot;
        this.rotation = rotation;

        // non-pixi attributes
        this.initialPosition = position;
        this.initialRotation = rotation;
        this.initialAlpha = alpha;
        this.initialRadius = radius;
        this.initialColor = color;
        this.initialPivot = pivot;

        this.reset();
    }

    reset() {
        this.removeChildren();
        this.texture = getTexture({
            alpha:  this.initialAlpha,
            radius: this.initialRadius,
            color:  this.initialColor,
        });
    }

    changeColor(color) {
        this.removeChildren();
        this.texture = getTexture({
            alpha:  this.initialAlpha,
            radius: this.initialRadius,
            color,
        });
    }

    resetColor() {
        this.changeColor(this.initialColor);
    }
}

export default Circle;
