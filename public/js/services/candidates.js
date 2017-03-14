
import { range, random, times, uniqueId } from 'underscore';
import randomColor from '../utils/randomColor';

const NB_CANDIDATES = 3;
const MAX_SUPPORTERS = 300;

// TODO fetch API

const fakeCandidate = () => ({
    id:         uniqueId(),
    name:       'Toto Titi',
    color:      randomColor(),
    supporters: range(500),
});

const fakeCandidate2 = () => ({
    id:         uniqueId(),
    name:       'Toto Titi',
    color:      randomColor(),
    supporters: range(2000),
});

const all = () => [fakeCandidate, fakeCandidate2];

export default all;
