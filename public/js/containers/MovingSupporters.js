
import { Container } from 'pixi.js';

import { TweenMax, Power0 } from 'gsap';

const RESET_DURATION = 0.4;

class MovingSupporters extends Container {
    constructor(duration, direction) {
        super();
        this.animation = null;
        this.duration = duration;
        this.direction = direction;
    }

    add(supporter) {
        this.addChild(supporter);
    }

    killAnimation() {
        if (this.animation) {
            this.animation.kill();
        }
    }

    rotate() {
        this.killAnimation();
        const animate = () => TweenMax.to(
            this,
            this.duration,
            {
                rotation:   this.rotation + (this.direction * Math.PI * 2),
                ease:       Power0.easeNone,
                onComplete: animate,
            }
        );

        this.animation = animate();
    }

    stopRotate() {
        this.killAnimation();
        TweenMax.to(
            this,
            RESET_DURATION,
            {
                rotation: 0,
                ease:     Power0.easeNone,
            }
        );
    }
}

export default MovingSupporters;
