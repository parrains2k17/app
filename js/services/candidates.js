
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

const fakeCandidate1 = {
    id:         uniqueId(),
    name:       'Toto Titi',
    color:      randomColor(),
    supporters: range(800),
    x:          (width) => 0,
    y:          (width, height) => 0,
};

const fakeCandidate2 = {
    id:         uniqueId(),
    name:       'Toto Titi',
    color:      randomColor(),
    supporters: range(2000),
    x:          (width) => 2 * (width / 7),
    y:          (width, height) => 5 * (height / 6),
};

const fakeCandidate3 = {
    id:         uniqueId(),
    name:       'Toto Titi',
    color:      randomColor(),
    supporters: range(40),
    x:          (width) => 2 * (width / 3),
    y:          (width, height) => height / 4,
};

const fakeCandidate4 = {
    id:         uniqueId(),
    name:       'Toto Titi',
    color:      randomColor(),
    supporters: range(200),
    x:          (width) => (width / 4),
    y:          (width, height) => height / 2,
};

const fakeCandidate5 = {
    id:         uniqueId(),
    name:       'Toto Titi',
    color:      randomColor(),
    supporters: range(400),
    x:          (width) => 2 * (width / 6),
    y:          (width, height) => height / 7,
};

const all = () => [
    fakeCandidate,
    fakeCandidate1,
    fakeCandidate2,
    fakeCandidate3,
    fakeCandidate4,
    fakeCandidate5,
];

export default all;
