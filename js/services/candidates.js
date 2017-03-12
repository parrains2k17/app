
import { range, random, times, uniqueId } from 'underscore';
import randomColor from '../utils/randomColor';

const NB_CANDIDATES = 3;
const MAX_SUPPORTERS = 3000;

// TODO fetch API

const fakeCandidate = () => ({
    id:         uniqueId(),
    name:       'Toto Titi',
    color:      randomColor(),
    supporters: range(random(60, MAX_SUPPORTERS)),
});

const all = () => times(NB_CANDIDATES, fakeCandidate);

export default all;
