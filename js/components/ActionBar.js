
class ActionBar {
    constructor(classname, onClick) {
        this.onClick = onClick;

        this.bar = document.querySelector(classname);
        console.log(classname, this.bar);
        this.actions = this.bar.querySelectorAll('.js-action');

        this.offset = document
            .querySelector('.action-bar-element').offsetHeight;

        this.upButton = document
            .querySelector('.action-bar-arrow-up');
        this.downButton = document
            .querySelector('.action-bar-arrow-down');
        this.actionBar = document
            .querySelector('.action-bar-container.mod-planets');

        console.log(this.upButton);
        console.log(this.downButton);
        console.log(this.actionBar);
        console.log(this.offset);

        this.upButton.addEventListener('click', this.up.bind(this));
        this.downButton.addEventListener('click', this.down.bind(this));

        this.actions.forEach((c) => {
            c.addEventListener('click', () => this.clickHandler(c));
        });

        this.selected = null;
    }

    open() {
        this.bar.classList.add('mod-open');
    }

    close() {
        this.bar.classList.remove('mod-open');
    }

    up() {
        this.actionBar.scrollTop -= this.offset;
    }

    down() {
        this.actionBar.scrollTop += this.offset;
    }

    reset() {
        if (this.selected) {
            this.selected.classList.remove('mod-active');
        }
    }

    clickHandler(element) {
        this.reset();

        this.selected = element;
        element.classList.add('mod-active');

        this.onClick(element.dataset.critere);
    }
}

export default ActionBar;
