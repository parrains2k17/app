
import { zip } from 'underscore';

import { pointsPositionInRect } from '../utils/points';
import {
    barChart,
    horizontalBarChart,
} from './barchart';

const { floor } = Math;

export const showBarChart = (data, width, height, maxValue) => {
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

export const showHorizontalBarChart = (data, width, height, maxValue) => {
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

export const showDotMatrix = (points, colors, width) => {
    const
        w = 10,
        h = 10;

    const
        r = floor(width / w), // number of points per line
        maxHeight = (points.length / r) * h;

    points.forEach((point, i) => {
        const
            x = (i % r) * w,
            y = floor(i / r) * h;

        point.position.x = (-width / 2) + x;
        point.position.y = -(maxHeight / 2) + y;
        point.alpha = 1;
        point.changeColor(colors[i]);
    });

    // TODO legend
};

