
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

const candidates = getCandidates();

candidates
    .forEach((candidate) => {
        const candidateGroup = new CandidateGroup(
            {
                position: {
                    x: candidate.x(width, height),
                    y: candidate.y(width, height),
                },
            },
            new Candidate(), // TODO pass data
            candidate.supporters
        );

        stage.add(candidateGroup);
    });

stage.start();

