
import { Text, Graphics, Container } from 'pixi.js';

import { zip } from 'underscore';

import { WHITE } from '../style/color';

import { pointsPositionInRect } from '../utils/points';
import {
    barChart,
    horizontalBarChart,
} from './barchart';

import { RADIUS } from '../components/Supporter';

const { floor, PI, max } = Math;

const LABEL_STYLE = {
    fontFamily: 'Roboto Mono',
    fontSize:   12,
    fill:       WHITE,
    align:      'center',
};

const labelCentered = (text, x, y, rotate = false) => {
    const l = new Text(
        text,
        LABEL_STYLE
    );
    const bounds = l.getLocalBounds();

    l.position.x = x - (bounds.width / 2);
    l.position.y = y + 10;

    l.pivot.x = 0;
    l.pivot.y = 0;

    if (rotate) {
        l.rotation = -PI / 4;
        l.position.y += (bounds.width * 0.5) + 20; // cos(PI/4)
    }

    return l;
};

const labelRight = (text, x, y) => {
    const l = new Text(
        text,
        LABEL_STYLE
    );
    const bounds = l.getLocalBounds();

    l.position.x = x - bounds.width - 10;
    l.position.y = y - (bounds.height / 2);

    l.pivot.x = 0;
    l.pivot.y = 0;
    return l;
};

export const showBarChart = (
    data,
    { width, height, rotateLegend = false },
    maxValue,
    legendContainer
) => {
    const bars = barChart({
        data,
        width,
        height,
        max: maxValue,
    });

    legendContainer.removeChildren();

    bars.forEach((bar) => {
        const positions = pointsPositionInRect(
            bar.value,
            bar.width,
            bar.height
        );

        legendContainer.addChild(labelCentered(
            bar.label,
            (-width / 2) + bar.x + (bar.width / 2), // center
            (height / 2) + bar.y + 10,
            rotateLegend
        ));

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
};

export const showHorizontalBarChart = (
    data,
    { width, height },
    maxValue,
    legendContainer
) => {
    const bars = horizontalBarChart({
        data,
        width,
        height,
        max: maxValue,
    });

    legendContainer.removeChildren();

    bars.forEach((bar) => {
        const positions = pointsPositionInRect(
            bar.value,
            bar.width,
            bar.height
        );

        legendContainer.addChild(labelRight(
            bar.label,
            (-width / 2) + bar.x,
            (-height / 2) + (bar.y - (bar.height / 2))
        ));

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
};

export const showDotMatrix = (
    points,
    colors,
    { width },
    labels,
    legendContainer,
    labelsFull = null
) => {
    const
        w = 10,
        h = 10;

    const
        r = floor(width / w), // number of points per line
        maxHeight = (points.length / r) * h;

    legendContainer.removeChildren();

    const
        legendWrapperLeft = new Container(),
        legendWrapperRight = new Container();

    const l = Object.keys(labels).length;

    const drawLabel = (container) => (key, i) => {
        const label = new Text(
            labelsFull ? labelsFull[key] : key,
            LABEL_STYLE
        );
        const bounds = label.getLocalBounds();

        label.position.x = 15;
        label.position.y = 16 + ((bounds.height + 2) * i);

        const circle = new Graphics();
        circle.beginFill(labels[key]);
        circle.drawCircle(0, 0, RADIUS);
        circle.endFill();

        circle.position.x = 0;
        circle.position.y = 22 + ((bounds.height + 2) * i);

        container.addChild(label);
        container.addChild(circle);
    };

    Object.keys(labels).slice(0, floor(l / 2)).forEach(
        drawLabel(legendWrapperLeft)
    );

    Object.keys(labels).slice(floor(l / 2) + 1).forEach(
        drawLabel(legendWrapperRight)
    );

    const legendHeight = max(
        legendWrapperLeft.getLocalBounds().height,
        legendWrapperRight.getLocalBounds().height
    );

    points.forEach((point, i) => {
        const
            x = (i % r) * w,
            y = floor(i / r) * h;

        point.position.x = (-width / 2) + x;
        point.position.y = -(maxHeight / 2) + (-legendHeight / 2) + y;
        point.alpha = 1;
        point.changeColor(colors[i]);
    });

    legendWrapperLeft.position.x = (-width / 2);
    legendWrapperLeft.position.y = (maxHeight / 2) - (legendHeight / 2);

    legendWrapperRight.position.x = 0;
    legendWrapperRight.position.y = (maxHeight / 2) - (legendHeight / 2);

    legendContainer.addChild(legendWrapperLeft);
    legendContainer.addChild(legendWrapperRight);
};

