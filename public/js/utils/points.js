
import { range } from 'underscore';

const HEIGHT_WIDTH_RATIO = 4;

/**
 * randomize
 *
 * Return t randomize around an interval
 *
 * @param  {Number}  t          value to randomize
 * @param  {Number}  interval   max interval around t
 * @param  {Number}  min        don't go to far below min
 * @param  {Number}  max        don't go to far after max
 *
 * @return {Object}
 * @return {Number}  value      t randomized
 * @return {Number}  random     the random value used [0, 1[
 */
export const randomize = (t, interval, min, max) => {
    const
        minInterval = interval / 3, // don't randomize too much on the borders
        r = Math.random();

    const value = Math.max(
        min - minInterval,
        Math.min(
            t + (r * interval),
            max + minInterval,
        )
    );

    return { value, random: r };
};


/**
 * pointsPositionInRect
 *
 * Give n points, compute position for them to be uniformicaly distributed in
 * the rectangle diven
 *
 * @param  {Number}  n      Nomber of points
 * @param  {Number}  width  Width of the rect
 * @param  {Number}  height Heigth of the rect
 *
 * @return {Array}          Array of n positions { x, randomX, y, randomY }
 *                          randomX, randomY are value [0, 1] used to randomize
 */
export const pointsPositionInRect = (n, width, height) => {
    const points = range(n);

    const
        r = height / width, // ratio
        A = height * width, // rect area

        // let's use a rect for each point
        a = A / n, // area of the tiny rect
        w = Math.sqrt( // width
            HEIGHT_WIDTH_RATIO * (a / r)
        ),
        h = (w * r) / HEIGHT_WIDTH_RATIO; // height

    return points.map((_, i) => {
        let
            x = (i * w) % width,
            y = Math.floor((i * w) / width) * h;

        // broders left and top
        x = (x < w) ? 0 : x; // TODO remove ?
        y = (y < h) ? 0 : y;

        const
            randomX = randomize(x, w, 0, width),
            randomY = randomize(y, h, 0, height);

        return {
            x:       randomX.value,
            randomX: randomX.random,
            y:       randomY.value,
            randomY: randomY.random,
        };
    });
};

