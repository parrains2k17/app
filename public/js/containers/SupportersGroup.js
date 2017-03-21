
import { Container } from 'pixi.js';
import { range, random as randomInt } from 'underscore';

import { getWidth, getHeight } from '../utils/window';

import Supporter from '../components/Supporter';
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
    AREA_X            = 0.6,
    AREA_Y            = 0.5,
    NUMBER_GROUPS     = 3;

class Supporters extends Container {
    constructor(supporters) {
        super();

        const direction = (random() > 0.5) ? 1 : -1;

        this.movingGroups = range(NUMBER_GROUPS)
            .map(() => {
                const duration = (5 * random()) + 15;
                return new MovingSupporters(duration, direction);
            });
        this.movingGroups.forEach((g) => this.addChild(g));

        this.addSupporters(supporters);

        this.legend = new Container();
        this.addChild(this.legend);
    }

    addSupporters(supporters) {
        this.supporters = supporters
            .map((supporter) => new Supporter({
                color:    listColor(supporter.liste),
                rotation: 2 * random() * PI,
                pivot:    {
                    x: randomNumber(
                        48,
                        sqrt(supporters.length * (100 / PI)),
                        (sqrt(supporters.length * (100 / PI))) / 1.5
                    ),
                    y: -8,
                },
                data: supporter,
            }));

        this.supporters.forEach((c) => {
            this.movingGroups[randomInt(NUMBER_GROUPS - 1)].add(c);
        });
    }

    rotate() {
        this.movingGroups.forEach((g) => g.rotate());
    }

    stopRotation() {
        console.log('stop rotation');
        console.log(this.movingGroups);
        this.movingGroups.forEach((c) => c.stopRotate());
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

        this.stopRotation();
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

