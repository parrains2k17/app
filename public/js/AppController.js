
import getCandidates from './services/candidates';

import Stage from './components/Stage';
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
            .map((candidate) => new CandidateGroup(
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
                candidate.supporters,
                this
                // TODO pass candidate data toto
            ));

        this.candidates.forEach((candidate) => this.stage.add(candidate));
    }

    start() {
        this.stage.start();
    }

    candidateOpen(selected) {
        this.candidates.forEach((candidate) => {
            if (candidate !== selected) {
                candidate.hide(-width / 2);
            } else {
                candidate.activate(
                    width / 2,
                    height / 2
                );
            }
        });

        this.stage.center();
    }

    candidateClose() {
        this.candidates.forEach((candidate) => candidate.reset());
    }
}

export default AppController;
