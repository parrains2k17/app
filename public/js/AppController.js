
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

        this.candidates = {};
        this.buildCandidates(candidates);

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
            (candidate) => this.addCandidate(candidate)
        );
    }

    buildCandidates(results) {
        Object
            .keys(results)
            .forEach((key) => {
                const candidate = results[key];
                const group = new CandidateGroup(
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

                this.candidates[key] = group;
                this.stage.add(group);
            });
    }

    start() {
        this.stage.start();
    }

    activateSelectedCandidates() {
        const n = this.selectedCandidates.length;

        this.selectedCandidates.forEach((candidate, i) => {
            candidate.activate(
                ((1 + (i * 2)) * width) / (2 * n),
                height / 2,
                n === 1 ? 2 : 1.6
            );
        });
    }

    candidateOpen(selectedCandidate) {
        this.selectedCandidates.push(selectedCandidate);

        Object.values(this.candidates).forEach((candidate) => {
            if (candidate !== selectedCandidate) {
                candidate.hide(-width / 2);
            }
        });

        this.activateSelectedCandidates();

        this.stage.center();

        this.candidatePanel.updateInfo(selectedCandidate.infos);

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

        Object.values(this.candidates)
            .forEach((candidate) => candidate.reset());

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

    addCandidate(id) {
        if (this.selectedCandidates.length === 2) {
            const old = this.selectedCandidates.pop();
            old.hide(-width / 2);
        }

        const candidate = this.candidates[id];

        // if we click on the already selected candidate
        if (candidate === this.selectedCandidates[0]) {
            return;
        }

        this.selectedCandidates.push(candidate);

        this.activateSelectedCandidates();

        // this.candidatePanel.updateInfo(selectedCandidate.infos); // TODO
        // this.candidatePanel.open(); // TODO
        // this.criteresBarMaires.open(); // TODO update selecteDataviz
        // this.planetsChoiceBar.start(); // TODO selected state
    }
}

export default AppController;
