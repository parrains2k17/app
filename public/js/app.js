
import { range } from 'underscore';

import Stage from './components/Stage';
import Candidate from './components/Candidate';
import CandidateGroup from './containers/Candidate';

require('../sass/styles.scss');

console.log(`🤖 Parrains2017 v${VERSION}`);// eslint-disable-line no-undef

const
    width  = window.innerWidth,
    height = window.innerHeight,
    canvas = document.querySelector('.js-canvas-container');

const stage = new Stage(canvas, width, height);

const candidate = new Candidate();
const supporters = range(100);

const candidateGroup = new CandidateGroup(
    {
        position: { x: width / 2, y: height / 2 },
    },
    candidate,
    supporters
);


const candidate2 = new Candidate();
const supporters2 = range(25);
const candidateGroup2 = new CandidateGroup(
    {
        position: { x: width / 3, y: height / 2 },
    },
    candidate2,
    supporters2
);


stage.add(candidateGroup);
stage.add(candidateGroup2);

stage.start();

