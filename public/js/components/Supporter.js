
import MovingCircle from './MovingCircle';

class Supporter extends MovingCircle {
    constructor({
        data = [],
        ...config
    }) {
        super({ radius: 2, ...config });

        this.data = data;
    }
}

export default Supporter;
