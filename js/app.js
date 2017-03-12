
import getCandidates from './services/candidates';
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

const
    candidates = getCandidates(),
    n = candidates.length;

candidates
    .forEach((candidate, i) => {
        const candidateGroup = new CandidateGroup(
            {
                position: {
                    x: (width / (n + 1)) * (i + (1 / 2)),
                    y: height / 2,
                },
            },
            new Candidate(), // TODO pass data
            candidate.supporters
        );

        stage.add(candidateGroup);
    });

stage.start();

