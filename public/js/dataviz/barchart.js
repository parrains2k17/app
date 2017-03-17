
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
        x = scaleBand().range([0, width]).padding(0.2),
        y = scaleLinear().range([0, height]);

    x.domain(data.map((d) => d.label));
    y.domain([0, max(data, (d) => d.value)]);

    return data
        .map((d) => ({
            x:      x(d.label),
            y:      0,
            width:  x.bandwidth(),
            height: y(d.value),
            ...d,
        }));
};

export default barchart;
