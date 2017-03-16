
class Modal {
    constructor() {
        this.modal_background = document.querySelector('.js-modal_background');
        this.modal_container =  document.querySelector('.js-modal_container');

        this.closeButton = this.modal_container.querySelector('.js-close-modal');
        this.closeButton.addEventListener('click', this.close.bind(this));

        this.modal_background.addEventListener('click', this.close.bind(this));

    }

    open() {
        this.modal_background.classList.add('mode-open');
        this.modal_container.classList.add('mode-open');
    }

    close() {
        this.modal_background.classList.remove('mode-open');
        this.modal_container.classList.remove('mode-open');
    }
}

export default Modal;
