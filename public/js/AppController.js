
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
                                position: {
                                    x: candidate.x,
                                    y: candidate.y,
                                },
                            },
                            {
                                name:        candidate.name,
                                parti:       candidate.parti,
                                color:       candidate.color,
                                age:         candidate.age,
                                total:       1237, // TODO
                                totalMaires: 467,
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

        this.candidatePanel.updateInfo({
            name:        selected.infos.name,
            total:       selected.infos.total,
            totalMaires: selected.infos.totalMaires,
            parti:       selected.infos.parti,
            color:       selected.infos.color,
            age:         selected.infos.age,
        });

        this.candidatePanel.open();
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
        // retrieve data for each candidates (one or two)
        const data = this.selectedCandidates.map(
            (candidate) => candidate.buildDatavizData(selector)
        );

        // compute max if needed
        const max = data.reduce((reduced, current) => (
            current.max ? Math.max(current.max, reduced) : reduced
        ), 0);

        // show dataviz
        this.selectedCandidates.forEach(
            (candidate, i) => candidate.showDataviz(
                selector,
                this.selectedCandidates.length,
                data[i].data,
                max
            )
        );
    }
}

export default AppController;
