
import { range, uniqueId } from 'underscore';
import randomColor from '../utils/randomColor';

// TODO fetch API

const fakeCandidate = {
    id:         uniqueId(),
    name:       'Toto Titi',
    color:      randomColor(),
    supporters: range(500),
    x:          (width) => width / 3,
    y:          (width, height) => height / 2,
};

const fakeCandidate2 = {
    id:         uniqueId(),
    name:       'Toto Titi',
    color:      randomColor(),
    supporters: range(2000),
    x:          (width) => 2 * (width / 3),
    y:          (width, height) => height / 2,
};

const fakeCandidate3 = {
    id:         uniqueId(),
    name:       'Toto Titi',
    color:      randomColor(),
    supporters: range(150),
    x:          (width) => 3 * (width / 3),
    y:          (width, height) => height / 2,
};


const all = () => [fakeCandidate, fakeCandidate2, fakeCandidate3];

export default all;
