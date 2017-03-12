
import MovingCircle from './MovingCircle';

import { PURPLE } from '../style/color';

class Candidate extends MovingCircle {
    constructor(config = {}) {
        super({ radius: 10, color: PURPLE, ...config });
    }
}

export default Candidate;
