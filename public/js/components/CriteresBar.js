
class CriteresBar {
    constructor(classname, onClick) {
        this.onClick = onClick;

        this.bar = document.querySelector(classname);
        this.criteres = this.bar.querySelectorAll('.js-critere');

        this.criteres.forEach((c) => {
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

export default CriteresBar;
