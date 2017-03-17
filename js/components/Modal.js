
class Modal {
    constructor(type) {
        this.type = type;

        if (type === 'intro') {
            this.modal_background = document
                .querySelector('.js-modal_background');
            this.modal_container = document
                .querySelector('.js-modal_container_intro');
            this.closeButton = this.modal_container
                .querySelector('.js-close-modal');

            this.closeButton
                .addEventListener('click', this.close.bind(this));
            this.modal_background
                .addEventListener('click', this.close.bind(this));

            this.open();
        } else if (type === 'webGL') {
            this.modal_container = document
                .querySelector('.js-modal_container_webGL');
            this.open();
        }
    }

    open() {
        if (this.type === 'intro') {
            this.modal_background.classList.add('mode-open');
        }
        this.modal_container.classList.add('mode-open');
        this.modal_container.classList.add('mode-animate');
    }

    close() {
        this.modal_background.classList.remove('mode-open');
        this.modal_container.classList.remove('mode-open');
    }
}

export default Modal;
