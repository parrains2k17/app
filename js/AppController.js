
import getCandidates from './services/candidates';

import Stage from './components/Stage';
import Candidate from './components/Candidate';
import CandidateGroup from './containers/CandidateGroup';

const
    width  = window.innerWidth,
    height = window.innerHeight,
    canvas = document.querySelector('.js-canvas-container');

class AppController {
    constructor() {
        this.stage = new Stage(canvas, width, height);

        this.buildCandidates();
    }

    buildCandidates() {
        const candidatesData = getCandidates();

        this.candidates = candidatesData
            .forEach((candidate) => {
                const candidateGroup = new CandidateGroup(
                    {
                        screen: {
                            width,
                            height,
                        },
                        position: {
                            x: candidate.x(width, height),
                            y: candidate.y(width, height),
                        },
                    },
                    new Candidate(), // TODO pass data
                    candidate.supporters,
                    this
                );

                this.stage.add(candidateGroup);
            });
    }

    start() {
        this.stage.start();
    }
}

export default AppController;
