
import { without, find } from 'underscore';

import candidates from './services/candidates';

import Stage from './components/Stage';
import CandidatePanel from './components/CandidatePanel';
import ActionBar from './components/ActionBar';
import CandidatesBar from './components/CandidatesBar';

import CandidateGroup from './containers/CandidateGroup';

const
    width  = window.innerWidth,
    height = window.innerHeight,
    canvas = document.querySelector('.js-canvas-container');

class AppController {
    constructor() {
        this.stage = new Stage(canvas, width, height);

        this.candidates = this.buildCandidates(candidates);
        this.candidates.forEach(
            (candidate) => this.stage.add(candidate)
        );

        this.candidatePanel = new CandidatePanel(
           '.js-candidate-panel',
            () => this.candidateClose(0)
        );

        this.selectedCandidates = [];

        this.criteresBarMaires = new ActionBar(
            '.js-actions-maires',
            (critere) => this.selectDataviz(critere)
        );

        this.planetsChoiceBar = new CandidatesBar(
            '.js-actions-choix',
            '.js-add-candidate-open',
            '.js-add-candidate-close',
            (toto) => console.log(toto)
        );
    }

    buildCandidates(results) {
        return Object
            .keys(results)
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
                        image:       candidate.texture,
                    },
                    candidate.parrainages,
                    candidate.texture,
                    this
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

        this.candidatePanel.updateInfo(selected.infos);

        this.candidatePanel.open();
        this.criteresBarMaires.open();
        this.planetsChoiceBar.start();
    }

    /**
     * @param  {Number} index       0 or 1
     */
    candidateClose(index) {
        this.selectedCandidates = without(
            this.selectedCandidates,
            find(this.selectedCandidates, (_, i) => i === index)
        );

        this.candidates.forEach((candidate) => candidate.reset());

        this.candidatePanel.close();
        this.criteresBarMaires.close();
        this.planetsChoiceBar.stop();
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
