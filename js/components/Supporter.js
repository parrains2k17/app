
import { Graphics } from 'pixi.js';
import MovingCircle from './MovingCircle';

class Supporter extends MovingCircle {
    constructor({
        data = [],
        ...config
    }) {
        super({ radius: 2, ...config }, Graphics);

        this.data = data;
    }
}

export default Supporter;
