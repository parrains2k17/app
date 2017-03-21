
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
            {
                container: '.js-candidate-panel',
                panel1:    '.js-candidate-1',
                panel2:    '.js-candidate-2',
            },
            (index) => this.candidateClose(index)
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

        this.candidatePanel.reset();

        this.selectedCandidates.forEach((candidate, i) => {
            candidate.activate(
                ((1 + (i * 2)) * width) / (2 * n),
                height / 2,
                n === 1 ? 2 : 1.6
            );

            this.candidatePanel.updateInfo(i, candidate.infos);
            this.candidatePanel.openPanel(i);
        });
    }

    candidateOpen(selectedCandidate) {
        // if already selected, don't do anything
        if (this.selectedCandidates.indexOf(selectedCandidate) > -1) {
            return;
        }

        this.selectedCandidates.push(selectedCandidate);

        Object.values(this.candidates).forEach((candidate) => {
            if (candidate !== selectedCandidate) {
                candidate.hide(-width / 2);
            }
        });

        this.activateSelectedCandidates();

        this.stage.center();


        this.candidatePanel.open();
        this.criteresBarMaires.open();
        this.planetsChoiceBar.start();
    }

    /**
     * @param  {Number} index       0 or 1
     */
    candidateClose(index) {
        const close = this.selectedCandidates.length < 2;
        // remove unique selected candidate
        if (close) {
            Object.values(this.candidates)
                .forEach((candidate) => candidate.reset());
            this.candidatePanel.close();
            this.criteresBarMaires.close();
            this.planetsChoiceBar.stop();
            this.stage.active();
        } else {
            // just remove one of the two
            this.selectedCandidates[index].hide(-width / 2);
        }

        this.selectedCandidates = without(
            this.selectedCandidates,
            find(this.selectedCandidates, (_, i) => i === index)
        );

        if (!close) {
            this.activateSelectedCandidates();
        }
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

        this.candidatePanel.open(); // TODO
        // this.criteresBarMaires.open(); // TODO update selecteDataviz
        // this.planetsChoiceBar.start(); // TODO selected state
    }
}

export default AppController;
