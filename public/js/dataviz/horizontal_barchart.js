
import {
    scaleBand,
    scaleLinear,
    max,
} from 'd3';

const barchart = ({
    data,
    width,
    height,
}) => {
    const
        x = scaleLinear().range([0, width]),
        y = scaleBand().range([0, height]).padding(0.1);

    x.domain([0, max(data, (d) => d.value)]);
    y.domain(data.map((d) => d.label));

    return data
        .map((d) => ({
            x:      0,
            y:      y(d.label),
            width:  x(d.value),
            height: y.bandwidth(),
            ...d,
        }));
};

export default barchart;
