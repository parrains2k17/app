
import MovingCircle from './MovingCircle';

import { PURPLE } from '../style/color';

class Candidate extends MovingCircle {
    constructor(config = {}) {
        super({ radius: 10, color: PURPLE, ...config });
    }

    overState(active = false) {
        if (active) {
            this.scale.set(1.2, 1.2);
        } else {
            this.scale.set(1, 1);
        }
    }
}

export default Candidate;
