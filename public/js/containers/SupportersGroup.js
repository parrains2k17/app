
import { Container } from 'pixi.js';
import { groupBy, zip, flatten } from 'underscore';

import { getWidth, getHeight } from '../utils/window';
import { pointsPositionInRect } from '../utils/points';

import Supporter from '../components/Supporter';
// import randomColor from '../utils/randomColor';
import randomNumber from '../utils/randomNumber';

import {
    listColor,
    GREY,
    COLOR1,
    COLOR2,
    COLOR3,
    COLOR4,
    COLOR5,
    COLOR6,
} from '../style/color';

import {
    SELECTOR_GENDER,
    SELECTOR_CSP,
    SELECTOR_AGE,
    SELECTOR_POP,
    SELECTOR_URBANITE,
} from '../dataviz';

import {
    barChart,
    horizontalBarChart,
} from '../dataviz/barchart';

const { PI, random, sqrt, floor, max } = Math;

const
    CENTER_DURATION   = 0.3,
    ROTATION_DURATION = 15;

const AGES_LABELS = {
    29:   'Moins de 29 ans',
    44:   '30 à 44 ans',
    59:   '45 à 59 ans',
    74:   '60 à 74 ans',
    999:  '75 ans et plus',
    null: 'Âge inconnu',
};

const CSP_NAME_COLOR = {
    'Professions agricoles':                     COLOR1,
    'Professions industrielles et commerciales': COLOR2,
    'Salariés du privé':                         COLOR3,
    'Professions libérales':                     COLOR4,
    'Professions de l\'enseignement':            COLOR5,
    'Personnels des entreprises publiques':      COLOR6,
    Divers:                                      COLOR1,
    Retraités:                                   COLOR2,
    Inconnue:                                    GREY,
};

const POPULATION_NAME_COLOR = {
    Inconnue:                   GREY,
    '0 à 199 habitants':        COLOR1,
    '200 à 399 habitants':      COLOR2,
    '400 à 999 habitants':      COLOR3,
    '1 000 à 2 000 habitants':  COLOR4,
    '2 000 à 10 000 habitants': COLOR5,
    'Plus de 10 000 habitants': COLOR6,
};

const URBANITE_NAME_COLOR = {
    Inconnue:          GREY,
    'Commune urbaine': COLOR5,
    'Commune rurale':  COLOR6,
};

const buildPopData = (groups) => Object.keys(POPULATION_NAME_COLOR)
    .map((cat) => ({
        points: groups[cat],
        value:  groups[cat] ? groups[cat].length : 0,
        label:  cat,
        color:  POPULATION_NAME_COLOR[cat],
    }));

const buildUrbaniteData = (groups) => Object.keys(URBANITE_NAME_COLOR)
    .map((cat) => ({
        points: groups[cat],
        value:  groups[cat] ? groups[cat].length : 0,
        label:  cat,
        color:  URBANITE_NAME_COLOR[cat],
    }));

// const randomAlpha = () => {
//     const res = randomNumber(0, 1, 1);
//     if (res > 0.7) {
//         return 1;
//     }
//     return res;
// };

const showBarChart = (data, width, height, maxValue) => {
    const bars = barChart({
        data,
        width,
        height,
        max: maxValue,
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
                point.changeColor(bar.color);
            });
    });

    // TODO legend
};

const showHorizontalBarChart = (data, width, height, maxValue) => {
    const bars = horizontalBarChart({
        data,
        width,
        height,
        max: maxValue,
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
                    -(height / 2)
                    + (-position.y + bar.y)
                );
                point.alpha = 1;
                point.changeColor(bar.color);
            });
    });

    // TODO legend
};

const showDotMatrix = (points, colors, width, height) => {
    const
        w = 10,
        h = 10;

    points.forEach((point, i) => {
        const
            r = floor(width / w),
            x = (i % r) * w,
            y = floor(i / r) * h;

        point.position.x = (-width / 2) + x;
        point.position.y = -(height / 2) + y;
        point.alpha = 1;
        point.changeColor(colors[i]);
    });

    // TODO legend
};

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
        const noData = null;

        let groups;

        switch (selector) {
        case SELECTOR_GENDER:
            groups = groupBy(
                this.supporters,
                (supporter) => supporter.data.sexe
            );

            return {
                data: [
                    {
                        points: groups[0],
                        value:  groups[0].length,
                        label:  'Hommes',
                        color:  COLOR1,
                    },
                    {
                        points: groups[1],
                        value:  groups[1].length,
                        label:  'Femmes',
                        color:  COLOR2,
                    },
                ],
                max: max(groups[0].length, groups[1].length),
            };

        case SELECTOR_CSP:
            groups = flatten(Object.values(groupBy(
                this.supporters,
                (supporter) => supporter.data.csp_name
            )));

            // const labels = Object.keys(groups),
            return {
                data: {
                    points: groups,
                    colors: groups.map((s) => (
                        CSP_NAME_COLOR[s.data.csp_name]
                    )),
                },
            };

        case SELECTOR_AGE:
            groups = groupBy(
                this.supporters,
                (supporter) => supporter.data.age_category
            );

            return {
                data: [
                    {
                        points: groups[29],
                        value:  groups[29] ? groups[29].length : 0,
                        label:  AGES_LABELS[29],
                        color:  COLOR1,
                    },
                    {
                        points: groups[44],
                        value:  groups[44] ? groups[44].length : 0,
                        label:  AGES_LABELS[44],
                        color:  COLOR2,
                    },
                    {
                        points: groups[59],
                        value:  groups[59] ? groups[59].length : 0,
                        label:  AGES_LABELS[59],
                        color:  COLOR3,
                    },
                    {
                        points: groups[74],
                        value:  groups[74] ? groups[74].length : 0,
                        label:  AGES_LABELS[74],
                        color:  COLOR4,
                    },
                    {
                        points: groups[999],
                        value:  groups[999] ? groups[999].length : 0,
                        label:  AGES_LABELS[999],
                        color:  COLOR5,
                    },
                    {
                        points: groups[noData],
                        value:  groups[noData] ? groups[noData].length : 0,
                        label:  AGES_LABELS[noData],
                        color:  COLOR6,
                    },
                ],
                max: Object.keys(groups).reduce(
                    (maxValue, current) => (
                        groups[current].length > maxValue
                        ? groups[current].length
                        : maxValue
                    ),
                    0
                ),
            };

        case SELECTOR_POP:
            groups = groupBy(
                this.supporters,
                (supporter) => supporter.data.population
            );

            return {
                data: buildPopData(groups),
                max:  Object.keys(groups).reduce(
                    (maxValue, current) => (
                        groups[current].length > maxValue
                        ? groups[current].length
                        : maxValue
                    ),
                    0
                ),
            };

        case SELECTOR_URBANITE:
            groups = groupBy(
                this.supporters,
                (supporter) => supporter.data.urbainite
            );

            console.log(groups);

            return {
                data: buildUrbaniteData(groups),
                max:  Object.keys(groups).reduce(
                    (maxValue, current) => (
                        groups[current].length > maxValue
                        ? groups[current].length
                        : maxValue
                    ),
                    0
                ),
            };

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

        default:
            break;
        }
    }
}

export default Supporters;

