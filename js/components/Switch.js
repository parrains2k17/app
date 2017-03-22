
class Switch {
    constructor(classname, onChange) {
        this.container = document.querySelector(classname);
        this.input = this.container.querySelector('input');

        this.input.addEventListener('change', this.changeHandler.bind(this));
        this.onChange = onChange;
    }

    open() {
        this.container.classList.add('mod-open');
    }

    close() {
        this.container.classList.remove('mod-open');
        this.container.classList.remove('mod-active');
    }

    changeHandler() {
        this.onChange(this.input.checked);
        this.container.classList.toggle('mod-active');
    }
}

export default Switch;
