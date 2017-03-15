
class CandidatePanel {
    constructor(classname) {
        this.panel = document.querySelector(classname);
        this.closeButton = this.panel.querySelector('.js-close-candidate');
    }

    open() {
        this.panel.classList.add('mod-open');
    }

    close() {
        this.panel.classList.remove('mod-open');
    }
}

export default CandidatePanel;
