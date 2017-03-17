
import { Container } from 'pixi.js';
import { groupBy, zip, flatten } from 'underscore';

import { getWidth, getHeight } from '../utils/window';
import { pointsPositionInRect } from '../utils/points';

import Supporter from '../components/Supporter';
import randomColor from '../utils/randomColor';
import randomNumber from '../utils/randomNumber';

// import barchart from '../dataviz/barchart';
import barchart from '../dataviz/horizontal_barchart';

const { PI, random, sqrt, floor } = Math;

const
    CENTER_DURATION   = 0.3,
    ROTATION_DURATION = 15;

const randomAlpha = () => {
    const res = randomNumber(0, 1, 1);
    if (res > 0.7) {
        return 1;
    }
    return res;
};

class Supporters extends Container {
    constructor(supporters) {
        super();
        this.addSupporters(supporters);
    }

    addSupporters(supporters) {
        this.supporters = supporters
            .map((supporter) => new Supporter({
                color:    randomColor(),
                rotation: 2 * random() * PI,
                pivot:    {
                    // Change 20 if the planet is bigger
                    x: randomNumber(
                        48,
                        sqrt(supporters.length * (100 / PI)),
                        sqrt(supporters.length * (100 / PI))
                    ),
                    y: -8,
                },
                alpha: randomAlpha(0, 1, 1),
                data:  supporter,
            }));

        this.supporters.forEach((c) => this.addChild(c));
    }

    rotate() {
        this.children.forEach((c) => c.rotate({
            // random to smooth transition
            duration: ROTATION_DURATION + (random() * 6),
        }));
    }

    center() {
        this.children.forEach((c) => c.center({
            duration: CENTER_DURATION,
        }));
    }

    resetPosition() {
        this.children.forEach((c) => c.resetPivot({
            duration: CENTER_DURATION,
        }));
    }

    dataviz(selector, totalDataviz) {
        const
            width = getWidth() / totalDataviz / 3,
            height = getHeight() / 3,
            w = 10,
            h = 10;

        const groups = groupBy(
            this.supporters,
            (supporter) => supporter.data.csp
        );

        const
            labels = Object.keys(groups),
            points = flatten(Object.values(groups));

        points.forEach((point, i) => {
            const
                r = floor(width / w),
                x = (i % r) * w,
                y = floor(i / r) * h;

            point.position.x = (-width / 2) + x;
            point.position.y = -(height / 2) + y;
            point.alpha = 1;
        });
    }

    barChart(selector, totalDataviz) {
        const
            width = getWidth() / totalDataviz / 3,
            height = getHeight() / 3;

        const groups = groupBy(
            this.supporters,
            (supporter) => supporter.data.sexe
        );

        const data = [
            {
                points: groups[0],
                value:  groups[0].length,
                label:  'Hommes',
                colors: 0x00F,
            },
            {
                points: groups[1],
                value:  groups[1].length,
                label:  'Femmes',
                colors: 0xF00,
            },
        ];

        const bars = barchart({
            data,
            width,
            height,
        });

        bars.forEach((bar) => {
            const positions = pointsPositionInRect(
                bar.value,
                bar.width,
                bar.height
            );

            zip(bar.points, positions)
                .forEach(([point, position]) => {
                    point.position.x = (
                        (-width / 2)
                        + position.x
                        + bar.x
                    );
                    point.position.y = (
                        (height / 2)
                        + (-position.y + bar.y)
                    );
                    point.alpha = 1;
                });
        });
    }
}

export default Supporters;

