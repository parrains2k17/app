
import { without, find } from 'underscore';

import candidates from './services/candidates';

import Stage from './components/Stage';
import CandidatePanel from './components/CandidatePanel';
import ActionBar from './components/ActionBar';
import CandidatesBar from './components/CandidatesBar';
import Switch from './components/Switch';

import CandidateGroup from './containers/CandidateGroup';

import { SELECTOR_TITLES } from './dataviz/index';

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

        this.criteresBarAll = new ActionBar(
            '.js-actions-all',
            (critere) => this.selectDataviz(critere)
        );

        this.planetsChoiceBar = new CandidatesBar(
            '.js-actions-choix',
            '.js-add-candidate-open',
            '.js-add-candidate-close',
            (candidate) => this.addCandidate(candidate)
        );

        this.titleData = document.querySelector('.js-title-dataviz');

        this.typeSwitch = new Switch(
            '.js-switch',
            (state) => this.changeType(state)
        );

        this.currentSelector = null;
    }

    buildCandidates(results) {
        Object
            .keys(results)
            .forEach((key) => {
                const candidate = results[key];
                console.log(candidate);
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
                        image:       candidate.texture,
                        total:       candidate.total_parrainages,
                        totalMaires: candidate.totalMaires,
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

    openTitle(title) {
        this.titleData.innerText = SELECTOR_TITLES[title];
        this.titleData.classList.add('mod-open');
    }

    closeTitle() {
        this.titleData.classList.remove('mod-open');
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
        this.criteresBarAll.open();
        this.planetsChoiceBar.start();
        this.typeSwitch.open();
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
            this.criteresBarAll.close();
            this.planetsChoiceBar.stop();
            this.typeSwitch.close();
            this.stage.active();

            this.currentSelector = null;
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
        this.closeTitle();
    }

    selectDataviz(selector) {
        this.openTitle(selector);
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

        this.currentSelector = selector;
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

        if (this.currentSelector) {
            this.selectDataviz(this.currentSelector);
        }
    }

    changeType(maires) {
        this.selectedCandidates.forEach((candidate) => {
            candidate.resetCircle();
        });
        this.closeTitle();
        this.currentSelector = null;

        if (maires) {
            this.criteresBarMaires.open();
            this.criteresBarAll.close();

            this.selectedCandidates.forEach((candidate) => {
                candidate.showMaires(true);
            });
        } else {
            this.criteresBarMaires.close();
            this.criteresBarAll.open();

            this.selectedCandidates.forEach((candidate) => {
                candidate.showMaires(false);
            });
        }
    }
}

export default AppController;
