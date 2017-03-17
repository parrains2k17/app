
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

        this.selectedCandidates = [];
    }

    buildCandidates() {
        return getCandidates()
            .then((results) => {
                this.candidates = Object.keys(results)
                    .map((key) => {
                        const candidate = results[key];
                        return new CandidateGroup(
                            {
                                screen: {
                                    width,
                                    height,
                                },
                                position: {
                                    x: candidate.x,
                                    y: candidate.y,
                                },
                            },
                            candidate.parrainages,
                            this
                            // TODO pass candidate data toto
                        );
                    });

                this.candidates.forEach(
                    (candidate) => this.stage.add(candidate)
                );
            });
    }

    start() {
        this.stage.start();
    }

    candidateOpen(selected) {
        this.selectedCandidates.push(selected);

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

        this.selectDataviz('toto'); // TODO
    }

    /**
     * @param  {Number} index       0 or 1
     */
    candidateClose(index) {
        this.selectedCandidates = this.selectedCandidates[1 - index];

        this.candidates.forEach((candidate) => candidate.reset());

        this.stage.active();
    }

    selectDataviz(selector) {
        this.selectedCandidates.forEach(
            (candidate) => candidate.dataviz(
                selector,
                this.selectedCandidates.length
            )
        );
    }
}

export default AppController;
