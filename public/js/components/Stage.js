
import { Application } from 'pixi.js';

const devicePixelRatio = window.devicePixelRatio;

class Stage extends Application {
    constructor(canvas, width, height) {
        console.log('Create Application :', width, height);
        super(
            width,
            height,
            {
                antialias:  true,
                resolution: devicePixelRatio,
            },
        );
        canvas.appendChild(this.view);

        this.ticker.add(this.update.bind(this));
    }

    update() {
        this.stage.children.forEach((child) => {
            if (child.update) {
                child.update();
            }
        });
    }

    add(object) {
        this.stage.addChild(object);
    }
}

export default Stage;
