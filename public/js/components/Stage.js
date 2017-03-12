
import { Application, Container } from 'pixi.js';
import { select, zoom, event } from 'd3';

const SCALE_MIN_VALUE = 0.5;
const SCALE_MAX_VALUE = 3;
const DRAG_SPEED = 0.003;

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

        this.width = width;
        this.height = height;
        this.canvas = canvas;
        this.canvas.appendChild(this.view);

        this.createContainer();

        this.ticker.add(this.update.bind(this));
    }

    createContainer() {
        this.container = new Container();

        const zoomHandler = zoom()
            .scaleExtent([SCALE_MIN_VALUE, SCALE_MAX_VALUE])
            .on('zoom', () => {
                const
                    scale = event.transform.k,
                    x = event.transform.x,
                    y = event.transform.y;

                this.container.scale.set(scale, scale);

                this.container.position.set(
                    ((1 - scale) + (DRAG_SPEED * x)) * (this.width / 2),
                    ((1 - scale) + (DRAG_SPEED * y)) * (this.height / 2)
                );
            });

        select(this.canvas).call(zoomHandler);

        this.stage.addChild(this.container);
    }

    update() {
        this.container.children.forEach((child) => {
            if (child.update) {
                child.update();
            }
        });
    }

    add(object) {
        this.container.addChild(object);
    }

}

export default Stage;
