
import { Container } from 'pixi.js';
import { getWidth, getHeight } from '../utils/window';

import Supporter from '../components/Supporter';
// import randomColor from '../utils/randomColor';
import randomNumber from '../utils/randomNumber';

import { listColor } from '../style/color';

import {
    SELECTOR_GENDER,
    SELECTOR_CSP,
    SELECTOR_AGE,
    SELECTOR_POP,
    SELECTOR_URBANITE,
    SELECTOR_CHOMAGE,
    SELECTOR_LISTE,
} from '../dataviz';

import {
    buildGenderData,
    buildCSPData,
    buildAgeData,
    buildPopData,
    buildUrbaniteData,
    buildChomageData,
    buildListData,
} from '../dataviz/buildData';

import {
    showBarChart,
    showHorizontalBarChart,
    showDotMatrix,
} from '../dataviz/drawDataviz';

const { PI, random, sqrt } = Math;

const
    CENTER_DURATION   = 0.3,
    ROTATION_DURATION = 15;

// const randomAlpha = () => {
//     const res = randomNumber(0, 1, 1);
//     if (res > 0.7) {
//         return 1;
//     }
//     return res;
// };

class Supporters extends Container {
    constructor(supporters) {
        super();
        this.addSupporters(supporters);
    }

    addSupporters(supporters) {
        this.supporters = supporters
            .map((supporter) => new Supporter({
                color:    listColor(supporter.liste),
                rotation: 2 * random() * PI,
                pivot:    {
                    // Change 20 if the planet is bigger
                    x: randomNumber(
                        48,
                        sqrt(supporters.length * (100 / PI)),
                        (sqrt(supporters.length * (100 / PI))) / 1.5
                    ),
                    y: -8,
                },
                // alpha: randomAlpha(0, 1, 1),
                data: supporter,
            }));

        this.supporters.forEach((c) => this.addChild(c));
    }

    rotate() {
        const direction = (random() > 0.5) ? 1 : -1;
        this.children.forEach((c) => c.rotate({
            // random to smooth transition
            duration: ROTATION_DURATION + (random() * 6),
            direction,
        }));
    }

    stopRotation() {
        this.children.forEach((c) => c.center());
    }

    center() {
        this.children.forEach((c) => c.center({
            duration: CENTER_DURATION,
        }));
    }

    resetPosition() {
        this.scale.set(1, 1);
        this.children.forEach((c) => {
            c.resetPosition({
                duration: CENTER_DURATION,
            });
            c.resetColor();
        });
    }

    buildDatavizData(selector) {
        switch (selector) {
        case SELECTOR_GENDER:
            return buildGenderData(this.supporters);

        case SELECTOR_CSP:
            return buildCSPData(this.supporters);

        case SELECTOR_AGE:
            return buildAgeData(this.supporters);

        case SELECTOR_POP:
            return buildPopData(this.supporters);

        case SELECTOR_URBANITE:
            return buildUrbaniteData(this.supporters);

        case SELECTOR_CHOMAGE:
            return buildChomageData(this.supporters);

        case SELECTOR_LISTE:
            return buildListData(this.supporters);

        default:
            return { data: [] };
        }
    }

    showDataviz(selector, totalDataviz, data, maxValue) { // eslint-disable-line
        const
            width = getWidth() / totalDataviz / 3,
            height = getHeight() / 3;

        this.scale.set(0.33, 0.33);
        this.center();

        switch (selector) {
        case SELECTOR_GENDER:
            showBarChart(data, width, height, maxValue);
            break;

        case SELECTOR_AGE:
            showHorizontalBarChart(data, width, height, maxValue);
            break;

        case SELECTOR_CSP:
            showDotMatrix(data.points, data.colors, width, height);
            break;

        case SELECTOR_POP:
            showHorizontalBarChart(data, width, height, maxValue);
            break;

        case SELECTOR_URBANITE:
            showBarChart(data, width, height, maxValue);
            break;

        case SELECTOR_CHOMAGE:
            showBarChart(data, width, height, maxValue);
            break;

        case SELECTOR_LISTE:
            showDotMatrix(data.points, data.colors, width, height);
            break;

        default:
            break;
        }
    }
}

export default Supporters;

