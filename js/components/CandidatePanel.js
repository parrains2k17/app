
class CandidatePanel {
    constructor(classname, onClick) {
        this.panel = document.querySelector(classname);
        this.closeButton = this.panel.querySelector('.js-close-candidate');

        this.closeButton.addEventListener('click', onClick);
    }

    open() {
        this.panel.classList.add('mod-open');
    }

    close() {
        this.panel.classList.remove('mod-open');
    }
}

export default CandidatePanel;
