
import { Container } from 'pixi.js';
import { getWidth, getHeight } from '../utils/window';

import Supporter from '../components/Supporter';
// import randomColor from '../utils/randomColor';
import randomNumber from '../utils/randomNumber';

import MovingSupporters from './MovingSupporters';

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
    CSP_LABELS,
    LISTE_LABELS,
    LISTE_LABELS_FULL,
} from '../dataviz/buildData';

import {
    showBarChart,
    showHorizontalBarChart,
    showDotMatrix,
} from '../dataviz/drawDataviz';

const { PI, random, sqrt } = Math;

const
    SCALE_ACTIVE      = 0.5,
    CENTER_DURATION   = 0.3,
    ROTATION_DURATION = 15,
    AREA_X            = 0.6,
    AREA_Y            = 0.5;

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

        this.group1 = new MovingSupporters((ROTATION_DURATION + 2), 1);
        this.group2 = new MovingSupporters((ROTATION_DURATION - 4), 1);

        this.addChild(this.group1);
        this.addChild(this.group2);

        this.addSupporters(supporters);

        this.legend = new Container();
        this.addChild(this.legend);
    }

    addSupporters(supporters) {
        // Ne se calcule qu'au démarrage
        this.supporters = supporters
            .map((supporter) => new Supporter({
                color:    listColor(supporter.liste),
                // REMOVE THIS RANDOM ?
                rotation: 2 * random() * PI,
                pivot:    {
                    // REMOVE THIS RANDOM ?
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
        // this.supporters.forEach((c) => this.addChild(c));

        this.supporters.forEach((c) => {
            if (random() > 0.5) {
                this.group1.add(c);
            } else {
                this.group2.add(c);
            }
        });
    }

    rotate() {
        console.log('test');
        this.group1.rotate();
        this.group2.rotate();

        // const direction = (random() > 0.5) ? 1 : -1;
        // this.children.forEach((c) => c.rotate({
        //     // random to smooth transition
        //     duration: ROTATION_DURATION + 6,
        //     direction,
        // }));
    }

    stopRotation() {
        this.supporters.forEach((c) => c.center());
    }

    center() {
        this.supporters.forEach((c) => c.center({
            duration: CENTER_DURATION,
        }));
    }

    resetPosition() {
        this.scale.set(1, 1);

        this.supporters.forEach((c) => {
            c.resetPosition({
                duration: CENTER_DURATION,
            });
            c.resetColor();
        });

        this.legend.removeChildren();
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
            width = (getWidth() / totalDataviz) * AREA_X,
            height = getHeight() * AREA_Y;

        this.scale.set(SCALE_ACTIVE, SCALE_ACTIVE);
        this.center();

        switch (selector) {
        case SELECTOR_GENDER:
            showBarChart(
                data,
                { width, height },
                maxValue,
                this.legend
            );
            break;

        case SELECTOR_AGE:
            showHorizontalBarChart(
                data,
                { width, height },
                maxValue,
                this.legend
            );
            break;

        case SELECTOR_CSP:
            showDotMatrix(
                data.points,
                data.colors,
                { width, height },
                CSP_LABELS,
                this.legend
            );
            break;

        case SELECTOR_POP:
            showHorizontalBarChart(
                data,
                { width, height },
                maxValue,
                this.legend
            );
            break;

        case SELECTOR_URBANITE:
            showBarChart(
                data,
                { width, height },
                maxValue,
                this.legend
            );
            break;

        case SELECTOR_CHOMAGE:
            showBarChart(
                data,
                { width, height, rotateLegend: true },
                maxValue,
                this.legend
            );
            break;

        case SELECTOR_LISTE:
            showDotMatrix(
                data.points,
                data.colors,
                { width, height },
                LISTE_LABELS,
                this.legend,
                LISTE_LABELS_FULL
            );
            break;

        default:
            break;
        }
    }
}

export default Supporters;

