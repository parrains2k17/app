
import { Graphics } from 'pixi.js';
import { TweenMax, Power0 } from 'gsap';

// circle that rotate around a point
class Circle extends Graphics {
    constructor(x = 0, y = 0, radius = 1, alpha = 1, delay = 0) {
        super();
        this.beginFill(0x9966FF);
        this.drawCircle(0, 0, radius);
        this.endFill();

        this.alpha = alpha;

        this.x = x;
        this.y = y;

        this.pivot.set(20, 20);

        TweenMax.fromTo(
            this,
            3,
            {
                rotation: 0,
            },
            {
                delay,
                rotation: Math.PI * 2,
                repeat:   -1,
                ease:     Power0.easeNone,
            }
        );
    }
}

export default Circle;
