
import { Container } from 'pixi.js';

import Supporters from './Supporters';

class CirclesGroup extends Container {
    constructor(
        {
            position = { x: 0, y: 0 },
        },
        candidate,
        supporters
    ) {
        super();

        this.position = position;

        this.candidate = candidate;
        this.supporters = new Supporters(supporters);
        this.supporters.rotate(); // TODO maybe not here

        this.addChild(this.candidate);
        this.addChild(this.supporters);
    }
}

export default CirclesGroup;
