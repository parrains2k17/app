
import MovingCircle from './MovingCircle';

class Supporter extends MovingCircle {
    constructor(config = {}) {
        super({ radius: 2, ...config });
    }
}

export default Supporter;
