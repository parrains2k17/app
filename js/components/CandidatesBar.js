
import ActionBar from './ActionBar';

class CandidatesBar extends ActionBar {
    constructor(classname, onClick) {
        super(classname, onClick);

        this.offset = document
            .querySelector('.action-bar-element').offsetHeight;

        this.upButton = document
            .querySelector('.action-bar-arrow-up');
        this.downButton = document
            .querySelector('.action-bar-arrow-down');

        this.actionBar = document
            .querySelector('.action-bar-container.mod-planets');

        this.upButton.addEventListener('click', this.up.bind(this));
        this.downButton.addEventListener('click', this.down.bind(this));
    }

    up() {
        this.actionBar.scrollTop -= this.offset;
    }

    down() {
        this.actionBar.scrollTop += this.offset;
    }
}

export default CandidatesBar;
